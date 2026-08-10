import { useEffect, useMemo, useRef, useState } from 'react';


const DPR_CAP = 2; // Cap device-pixel-ratio so we don't decode absurdly large bitmaps on 3x phones.
const MAX_DECODE_WIDTH = 2200; // Hard ceiling on decoded frame width to bound memory for huge sources.

// Build frame URLs from a folder + naming convention (or accept an explicit list).
function buildFrameUrls({ frames, frameFolder, frameCount, prefix, startIndex, pad, ext }) {
  if (Array.isArray(frames) && frames.length) return frames;
  const urls = [];
  for (let i = 0; i < frameCount; i++) {
    const n = startIndex + i;
    const num = pad > 0 ? String(n).padStart(pad, '0') : String(n);
    urls.push(`${frameFolder}/${prefix}${num}.${ext}`);
  }
  return urls;
}

// Playback order. Ping-pong (boomerang) walks 0..n-1 then n-2..1 so the first
// and last frames are never repeated back-to-back -> perfectly seamless loop.
function buildPlayOrder(count, pingPong) {
  const forward = Array.from({ length: count }, (_, i) => i);
  if (!pingPong || count < 3) return forward;
  const back = [];
  for (let i = count - 2; i >= 1; i--) back.push(i);
  return forward.concat(back);
}

export default function AnimatedSequence({
  // --- configuration props ---
  frameFolder,
  frameCount,
  frames, // optional explicit URL list (overrides folder/count)
  prefix = 'frame-',
  startIndex = 1,
  pad = 0,
  ext = 'jpg',
  fps = 5,
  loop = true,
  pingPong = false,
  autoplay = true,
  width = '100%',
  height = 'auto',
  objectFit = 'contain',
  className = '',
  ariaLabel = '',
  // Fractional crop (0-1) trimmed from each edge of the *source* frame before
  // decode/resize. Lets a sequence with large baked-in margins (e.g. artwork
  // centered in a mostly-blank canvas) be tightened up without touching assets.
  cropTop = 0,
  cropBottom = 0,
  cropLeft = 0,
  cropRight = 0,
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  const urls = useMemo(
    () => buildFrameUrls({ frames, frameFolder, frameCount, prefix, startIndex, pad, ext }),
    [frames, frameFolder, frameCount, prefix, startIndex, pad, ext]
  );

  const order = useMemo(() => buildPlayOrder(urls.length, pingPong), [urls.length, pingPong]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas || urls.length === 0) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });

    // --- mutable state kept in the effect scope (survives across rAF ticks) ---
    let sources = []; // decoded drawables: ImageBitmap | HTMLCanvasElement
    let natW = 0;
    let natH = 0;
    let decodedWidth = 0;
    let decodeGen = 0; // guards against overlapping/stale decodes on resize
    let resizeTimer = 0;

    let raf = 0;
    let lastTs = 0;
    let acc = 0;
    let orderPos = 0;
    let playing = false;
    let inView = false;
    let cancelled = false;

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = reducedQuery.matches;

    const frameDuration = 1000 / Math.max(1, fps);

    const closeSources = (arr) => {
      if (!arr) return;
      arr.forEach((s) => {
        if (s && typeof s.close === 'function') s.close(); // free ImageBitmaps
      });
    };

    // Match the canvas backing store to its CSS box x DPR (crisp on high-DPI, no layout shift).
    const syncCanvasSize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const cw = Math.max(1, Math.round(rect.width * dpr));
      const ch = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }
    };

    // Draw one frame with object-fit math so nothing ever stretches.
    const draw = () => {
      const src = sources[order[orderPos]];
      if (!src) return;
      const CW = canvas.width;
      const CH = canvas.height;
      const bw = src.width;
      const bh = src.height;
      let dw;
      let dh;
      if (objectFit === 'cover') {
        const s = Math.max(CW / bw, CH / bh);
        dw = bw * s;
        dh = bh * s;
      } else if (objectFit === 'fill') {
        dw = CW;
        dh = CH;
      } else {
        const s = Math.min(CW / bw, CH / bh); // contain
        dw = bw * s;
        dh = bh * s;
      }
      const dx = (CW - dw) / 2;
      const dy = (CH - dh) / 2;
      ctx.clearRect(0, 0, CW, CH);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(src, 0, 0, bw, bh, dx, dy, dw, dh);
    };

    // Fallback decode path: load via <img>, then downscale (with crop) into a
    // small offscreen canvas and release the huge source. Used when
    // createImageBitmap(resize) is unavailable. Keeps memory low even without
    // native resize support.
    const imageToCanvas = (url, sx, sy, sw, sh, tW, tH) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = tW;
          c.height = tH;
          const cx = c.getContext('2d');
          cx.imageSmoothingEnabled = true;
          cx.imageSmoothingQuality = 'high';
          cx.drawImage(img, sx, sy, sw, sh, 0, 0, tW, tH);
          img.onload = null;
          img.src = '';
          resolve(c);
        };
        img.onerror = reject;
        img.src = url;
      });

    // Decode every frame downscaled to `target` device px wide (preserving aspect).
    const decodeAll = async (target) => {
      const gen = ++decodeGen;

      // Read natural dimensions cheaply from the first frame (no full pixel decode kept).
      if (!natW) {
        await new Promise((resolve, reject) => {
          const im = new Image();
          im.onload = () => {
            natW = im.naturalWidth;
            natH = im.naturalHeight;
            resolve();
          };
          im.onerror = reject;
          im.src = urls[0];
        });
        if (cancelled || gen !== decodeGen) return;
      }

      // Crop rect in natural source pixels (defaults to the full frame).
      const sx = Math.round(natW * cropLeft);
      const sy = Math.round(natH * cropTop);
      const sw = Math.max(1, Math.round(natW * (1 - cropLeft - cropRight)));
      const sh = Math.max(1, Math.round(natH * (1 - cropTop - cropBottom)));

      const tW = Math.max(1, Math.min(target, sw, MAX_DECODE_WIDTH));
      const tH = Math.round((tW * sh) / sw);
      const canResize = typeof createImageBitmap === 'function';

      const next = new Array(urls.length);
      for (let i = 0; i < urls.length; i++) {
        if (cancelled || gen !== decodeGen) {
          closeSources(next);
          return;
        }
        try {
          if (canResize) {
            const resp = await fetch(urls[i]);
            const blob = await resp.blob();
            // createImageBitmap can crop + downscale *during* decode -> avoids the
            // giant full-size intermediate, and resizeQuality:'high' gives clean frames.
            next[i] = await createImageBitmap(blob, sx, sy, sw, sh, {
              resizeWidth: tW,
              resizeHeight: tH,
              resizeQuality: 'high',
            });
          } else {
            next[i] = await imageToCanvas(urls[i], sx, sy, sw, sh, tW, tH);
          }
        } catch (e) {
          // Any failure (e.g. resize options unsupported) -> robust fallback.
          try {
            next[i] = await imageToCanvas(urls[i], sx, sy, sw, sh, tW, tH);
          } catch (e2) {
            // leave slot empty; draw() simply skips missing frames
          }
        }
      }

      if (cancelled || gen !== decodeGen) {
        closeSources(next);
        return;
      }

      closeSources(sources);
      sources = next;
      decodedWidth = tW;
      syncCanvasSize();
      draw();
      setReady(true);
      updatePlayState();
    };

    // --- rAF loop (time-based so speed is correct regardless of refresh rate) ---
    const tick = (ts) => {
      if (!playing) return;
      if (!lastTs) lastTs = ts;
      acc += ts - lastTs;
      lastTs = ts;

      let stepped = false;
      while (acc >= frameDuration) {
        acc -= frameDuration;
        orderPos += 1;
        stepped = true;
        if (orderPos >= order.length) {
          if (loop) {
            orderPos = 0;
          } else {
            orderPos = order.length - 1;
            playing = false;
            draw();
            return;
          }
        }
      }
      if (stepped) draw();
      raf = requestAnimationFrame(tick);
    };

    const play = () => {
      if (playing || reduced || !sources.length) return;
      playing = true;
      lastTs = 0;
      acc = 0;
      raf = requestAnimationFrame(tick);
    };

    const pause = () => {
      playing = false;
      cancelAnimationFrame(raf);
    };

    // Central gate: only play when autoplay + loaded + in view + tab visible + motion allowed.
    function updatePlayState() {
      const shouldPlay =
        autoplay && sources.length > 0 && inView && !document.hidden && !reduced;
      if (shouldPlay) play();
      else pause();
    }

    // --- observers / listeners ---
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        updatePlayState();
      },
      { threshold: 0.25 }
    );
    io.observe(wrapper);

    const onVisibility = () => updatePlayState();
    document.addEventListener('visibilitychange', onVisibility);

    const onReducedChange = () => {
      reduced = reducedQuery.matches;
      if (reduced) {
        pause();
        orderPos = 0;
        draw(); // show only the first frame
      } else {
        updatePlayState();
      }
    };
    if (reducedQuery.addEventListener) reducedQuery.addEventListener('change', onReducedChange);
    else if (reducedQuery.addListener) reducedQuery.addListener(onReducedChange);

    const ro = new ResizeObserver(() => {
      syncCanvasSize();
      draw();
      // Re-decode at higher resolution if the box grew enough that we'd be upscaling.
      const needed = canvas.width;
      const canSharpen = decodedWidth < Math.min(natW || Infinity, MAX_DECODE_WIDTH);
      if (needed > decodedWidth * 1.15 && canSharpen && sources.length) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (!cancelled) decodeAll(needed);
        }, 250);
      }
    });
    ro.observe(wrapper);

    // Kick off: size the canvas, then preload/decode all frames before playing.
    syncCanvasSize();
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    const initialTarget = Math.max(1, Math.round(wrapper.getBoundingClientRect().width * dpr)) || 1280;
    decodeAll(initialTarget);

    return () => {
      cancelled = true;
      pause();
      clearTimeout(resizeTimer);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      if (reducedQuery.removeEventListener) reducedQuery.removeEventListener('change', onReducedChange);
      else if (reducedQuery.removeListener) reducedQuery.removeListener(onReducedChange);
      closeSources(sources);
      sources = [];
    };
    // Re-initialize if any structural/config prop changes.
  }, [urls, order, fps, loop, autoplay, objectFit, cropTop, cropBottom, cropLeft, cropRight]);

  return (
    <div
      ref={wrapperRef}
      className={`animated-sequence ${ready ? 'is-ready' : ''} ${className}`}
      style={{ width, height }}
      role="img"
      aria-label={ariaLabel}
    >
      <canvas ref={canvasRef} className="animated-sequence__canvas" />
    </div>
  );
}

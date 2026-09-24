// A viewport-height unit that ignores mobile browser chrome.
//
// The stylesheet sizes the sticky Spaces slides, hero and images in viewport
// heights. On phones (and especially in-app browsers like Instagram's) the
// web view itself shrinks and grows as the toolbar collapses and expands
// while the reader scrolls, so every `vh` value changes at once. With twenty
// or so full-height slides stacked above Words, that shifts everything below
// them by hundreds of pixels while the scroll position stays put: the page
// appears to "jump" back into Spaces or on to Paintings.
//
// `--vhu` is 1% of the viewport height, written to <html> by JS and used by
// the stylesheet in place of `vh`. It is refreshed on a real resize (window
// drag, rotation, split view) but not on the small height-only changes that
// browser chrome causes.

// Height-only changes smaller than this are treated as browser chrome.
export const CHROME_HEIGHT_RATIO = 0.3;

export function isTouchOnlyDevice() {
  return typeof window.matchMedia === 'function'
    ? window.matchMedia('(hover: none) and (pointer: coarse)').matches
    : false;
}

export function installStableViewportUnit({ root = document.documentElement } = {}) {
  let width = window.innerWidth;
  let height = window.innerHeight;

  const write = () => {
    root.style.setProperty('--vhu', `${height / 100}px`);
  };

  const handleResize = () => {
    const nextWidth = window.innerWidth;
    const nextHeight = window.innerHeight;
    const widthChanged = nextWidth !== width;
    const heightChange = Math.abs(nextHeight - height) / Math.max(height, 1);
    // Desktop windows resize freely; touch devices only re-measure when the
    // width moved (rotation, split view) or the height changed dramatically
    // (a keyboard, a real rotation without a width change).
    const shouldUpdate = !isTouchOnlyDevice() || widthChanged || heightChange > CHROME_HEIGHT_RATIO;
    if (!shouldUpdate) return;
    width = nextWidth;
    height = nextHeight;
    write();
  };

  write();
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', handleResize);
  };
}

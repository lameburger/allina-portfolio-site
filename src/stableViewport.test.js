/**
 * The page is laid out in a JS-pinned viewport-height unit so that mobile
 * browser chrome collapsing mid-scroll can't reflow the sticky slides above
 * the reader (which showed up as "jumping back to Spaces" in Words).
 */
import fs from 'fs';
import path from 'path';
import { installStableViewportUnit } from './stableViewport';

const TOUCH_QUERY = '(hover: none) and (pointer: coarse)';

function mockMatchMedia({ touchOnly }) {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === TOUCH_QUERY ? touchOnly : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

function setViewport(width, height) {
  Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: width });
  Object.defineProperty(window, 'innerHeight', { configurable: true, writable: true, value: height });
}

function resize(width, height) {
  setViewport(width, height);
  window.dispatchEvent(new Event('resize'));
}

const unit = () => document.documentElement.style.getPropertyValue('--vhu');

let uninstall;
afterEach(() => {
  if (uninstall) uninstall();
  uninstall = null;
  document.documentElement.style.removeProperty('--vhu');
});

test('the stylesheet never uses bare vh units', () => {
  const css = fs.readFileSync(path.join(__dirname, 'App.css'), 'utf8');
  const bare = css.match(/\d(?:\.\d+)?(?:vh|dvh|svh|lvh)\b/g) || [];
  // The one allowed `vh` is the --vhu fallback itself.
  expect(bare).toEqual(['1vh']);
  expect(css).toContain('--vhu: 1vh');
});

test('writes 1% of the initial viewport height in px', () => {
  mockMatchMedia({ touchOnly: true });
  setViewport(390, 700);
  uninstall = installStableViewportUnit();
  expect(unit()).toBe('7px');
});

describe('touch-only devices', () => {
  beforeEach(() => mockMatchMedia({ touchOnly: true }));

  test('ignores browser chrome collapsing and expanding', () => {
    setViewport(390, 700);
    uninstall = installStableViewportUnit();

    resize(390, 780); // toolbar hides: +11%
    expect(unit()).toBe('7px');

    resize(390, 700); // toolbar shows again
    expect(unit()).toBe('7px');
  });

  test('re-measures on rotation', () => {
    setViewport(390, 700);
    uninstall = installStableViewportUnit();

    resize(700, 390);
    expect(unit()).toBe('3.9px');
  });

  test('re-measures on a large height-only change', () => {
    setViewport(390, 700);
    uninstall = installStableViewportUnit();

    resize(390, 350); // keyboard: -50%
    expect(unit()).toBe('3.5px');
  });
});

describe('desktop', () => {
  test('follows every window resize', () => {
    mockMatchMedia({ touchOnly: false });
    setViewport(1440, 900);
    uninstall = installStableViewportUnit();
    expect(unit()).toBe('9px');

    resize(1440, 950);
    expect(unit()).toBe('9.5px');
  });
});

test('uninstall stops listening', () => {
  mockMatchMedia({ touchOnly: false });
  setViewport(1440, 900);
  const stop = installStableViewportUnit();
  stop();
  resize(1440, 1000);
  expect(unit()).toBe('9px');
});

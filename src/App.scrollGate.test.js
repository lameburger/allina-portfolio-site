/**
 * Regression tests for the mobile scroll-jump fixes in the Spaces gate:
 *  1. touch-only devices never get the gate at all
 *  2. viewport resizes never move the scroll position
 *  3. touch direction is measured from the previous move, not the touch start
 *  4. project images reserve their intrinsic dimensions
 */
import { render, act } from '@testing-library/react';
import App from './App';
import imageDimensions from './imageDimensions.json';

const TOUCH_QUERY = '(hover: none) and (pointer: coarse)';

// Fake page geometry: home 0-1000, spaces menu 1000-2500, spaces 2500+.
const OFFSETS = {
  home: [0, 1000],
  'spaces-menu': [1000, 1500],
  spaces: [2500, 5000],
};

function mockMatchMedia({ touchOnly }) {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === TOUCH_QUERY ? touchOnly : query === '(min-width: 769px)',
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  }));
}

function mockGeometry() {
  Object.defineProperty(HTMLElement.prototype, 'offsetTop', {
    configurable: true,
    get() {
      return OFFSETS[this.id]?.[0] ?? 0;
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return OFFSETS[this.id]?.[1] ?? 0;
    },
  });
}

function setViewport(innerHeight) {
  Object.defineProperty(window, 'innerHeight', { configurable: true, writable: true, value: innerHeight });
}

function setScrollY(y) {
  Object.defineProperty(window, 'scrollY', { configurable: true, writable: true, value: y });
}

function fire(type, init = {}) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.assign(event, init);
  act(() => {
    window.dispatchEvent(event);
  });
  return event;
}

function fireScroll(y) {
  setScrollY(y);
  return fire('scroll');
}

const touch = (clientY) => ({ touches: [{ clientY }] });

// Menu is 1500px tall and the viewport 800px, so the locked band is
// scrollY 1000 .. 1700 (top .. top + overflow).
const MENU_TOP = 1000;
const MENU_MAX_Y = 1700;

beforeEach(() => {
  mockGeometry();
  setViewport(800);
  setScrollY(0);
  window.scrollTo = jest.fn(({ top }) => setScrollY(top));
  window.requestAnimationFrame = (cb) => setTimeout(cb, 0);
  window.cancelAnimationFrame = (id) => clearTimeout(id);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('touch-only devices', () => {
  test('the gate is never installed, so overshooting the menu is not corrected', () => {
    mockMatchMedia({ touchOnly: true });
    const addSpy = jest.spyOn(window, 'addEventListener');
    render(<App />);

    const types = addSpy.mock.calls.map(([type]) => type);
    expect(types).not.toContain('wheel');
    expect(types).not.toContain('touchmove');

    // Momentum carries the reader 60px past the menu's limit: nothing yanks them back.
    fireScroll(MENU_TOP + 50);
    fireScroll(MENU_MAX_Y + 60);
    expect(window.scrollTo).not.toHaveBeenCalled();

    // Browser chrome resizing the viewport doesn't either.
    setViewport(900);
    fire('resize');
    expect(window.scrollTo).not.toHaveBeenCalled();

    // Forward touch input is never blocked either.
    fire('touchstart', touch(300));
    const move = fire('touchmove', touch(200));
    expect(move.defaultPrevented).toBe(false);
  });
});

describe('desktop / hybrid devices', () => {
  beforeEach(() => mockMatchMedia({ touchOnly: false }));

  test('the gate still locks at the menu (sanity check that the gate exists)', () => {
    render(<App />);
    // A scrollbar drag straight past the menu: armed -> locked with a correction.
    fireScroll(MENU_MAX_Y + 60);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: MENU_MAX_Y, behavior: 'auto' });
  });

  test('a viewport height change never moves the scroll position', () => {
    render(<App />);
    fireScroll(MENU_MAX_Y + 60); // -> locked, corrected to MENU_MAX_Y
    window.scrollTo.mockClear();

    // Browser chrome appears: viewport grows 100px, so the stop drops by 100px.
    setViewport(900);
    fire('resize');
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(window.scrollY).toBe(MENU_MAX_Y);
  });

  test('reversing a swipe mid-gesture is treated as scrolling back', () => {
    render(<App />);
    fireScroll(MENU_MAX_Y + 60); // -> locked at the forward stop

    fire('touchstart', touch(300));
    // Finger travels up 50px: forward scroll at the stop, blocked as intended.
    const forward = fire('touchmove', touch(250));
    expect(forward.defaultPrevented).toBe(true);

    // Finger comes back down 10px without lifting. Before the fix this was
    // still "40px above the start" and got blocked; now it is a reverse move.
    const reverse = fire('touchmove', touch(260));
    expect(reverse.defaultPrevented).toBe(false);

    // Small jitter under the threshold is ignored in either direction.
    const jitter = fire('touchmove', touch(257));
    expect(jitter.defaultPrevented).toBe(false);
  });
});

describe('image layout reservation', () => {
  test('every project and painting image carries its intrinsic width/height', () => {
    mockMatchMedia({ touchOnly: false });
    const { container } = render(<App />);
    const images = container.querySelectorAll('img.project-image, img.painting-image');
    expect(images.length).toBeGreaterThan(0);

    images.forEach((img) => {
      const src = img.getAttribute('src');
      const dims = imageDimensions[src];
      expect(dims).toBeDefined();
      expect(Number(img.getAttribute('width'))).toBe(dims.width);
      expect(Number(img.getAttribute('height'))).toBe(dims.height);
      expect(img.getAttribute('loading')).toBe('lazy');
    });
  });
});

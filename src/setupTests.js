import '@testing-library/jest-dom';

// jsdom has no IntersectionObserver / ResizeObserver; AnimatedSequence uses both.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = window.IntersectionObserver || NoopObserver;
window.ResizeObserver = window.ResizeObserver || NoopObserver;

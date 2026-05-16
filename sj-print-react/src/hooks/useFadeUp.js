import { useEffect } from 'react';

/**
 * Replaces the inline <script> tag at the bottom of the original HTML.
 * Observes all `.fade-up` elements once on mount and adds `.in-view`
 * when they cross into the viewport.
 */
export default function useFadeUp() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => io.observe(el));

    // Reveal hero text immediately (matches the original `load` listener).
    document
      .querySelectorAll('.hero .fade-up')
      .forEach((el) => el.classList.add('in-view'));

    return () => io.disconnect();
  }, []);
}

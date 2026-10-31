import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from 'react';

const REDUCED = '(prefers-reduced-motion: reduce)';

/** A layout effect in the browser; a plain effect during the build-time render, where layout effects can't run. */
export const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}

/** True when the visitor asks for reduced motion. Pre-rendered HTML assumes motion; the browser then corrects it. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

/**
 * 'idle': final state, no animation. 'armed': waiting below the fold in its start state.
 * 'in': scrolled into view, animating to its final state.
 */
export type InViewState = 'idle' | 'armed' | 'in';

/**
 * Plays an entrance once when an element scrolls into view. Elements that start on screen, and
 * visitors who prefer reduced motion, stay 'idle' (final state), so nothing is ever hidden on load.
 */
export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<InViewState>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window) || window.matchMedia(REDUCED).matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    setState('armed');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('in');
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, state] as const;
}

/**
 * Classes for an in-view entrance: the start state is applied instantly while 'armed', and the
 * transition only runs once the element is 'in' view.
 */
export const enter = (state: InViewState, transition: string) => (state === 'in' ? transition : '');

/** True while the element is on screen; used to pause ambient animation when it is not. */
export function useOnScreen<T extends Element>(rootMargin = '0px') {
  const ref = useRef<T>(null);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, onScreen] as const;
}

/** Pointer handler that feeds the pointer position to a spotlight through CSS variables. */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const onPointerMove = (e: PointerEvent<T>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--sx', `${e.clientX - r.left}px`);
    el.style.setProperty('--sy', `${e.clientY - r.top}px`);
  };
  return { ref, onPointerMove };
}

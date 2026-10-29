import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Animate only on larger screens for users who haven't asked for reduced motion.
// On phones, content appears immediately so nothing looks half-faded mid-scroll.
const shouldAnimate = () =>
  typeof window !== 'undefined' &&
  typeof IntersectionObserver !== 'undefined' &&
  window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches;

/** Fades content up once as it scrolls into view (desktop only). */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate] = useState(shouldAnimate);
  const [visible, setVisible] = useState(!animate);

  useEffect(() => {
    const node = ref.current;
    if (!animate || !node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [animate]);

  const state = !animate ? '' : visible ? 'animate-[reveal-up_0.6s_ease-out_both]' : 'opacity-0';
  return (
    <div ref={ref} className={`${state} ${className}`} style={animate && visible ? { animationDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

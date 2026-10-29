import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type Variant = 'up' | 'fade' | 'scale' | 'left' | 'right';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  variant?: Variant;
  className?: string;
  as?: ElementType;
}

const animations: Record<Variant, string> = {
  up: 'reveal-up',
  fade: 'reveal-fade',
  scale: 'reveal-scale',
  left: 'reveal-left',
  right: 'reveal-right',
};

// Skipped entirely for visitors who have asked their device to reduce motion
const shouldAnimate = () =>
  typeof window !== 'undefined' &&
  typeof IntersectionObserver !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

/** Animates content in once as it scrolls into view. */
export default function Reveal({ children, delay = 0, variant = 'up', className = '', as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
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
      // The observed area extends far above the screen, so content that a fast scroll or an in-page
      // jump carried straight past still counts as seen and is never left invisible
      { rootMargin: '300% 0px -6% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [animate]);

  const style =
    animate && visible
      ? { animation: `${animations[variant]} 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both` }
      : undefined;

  return (
    <Tag ref={ref} className={`${animate && !visible ? 'opacity-0' : ''} ${className}`} style={style}>
      {children}
    </Tag>
  );
}

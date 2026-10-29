import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outlineLight';

const base =
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-brand active:scale-[0.98]';

// Padding lives here rather than in `base` so the text-style ghost variant can opt out of it
const sizes = {
  md: 'px-6 py-3 text-[15px]',
  sm: 'px-5 py-2.5 text-sm',
};

const variants: Record<Variant, string> = {
  primary: 'sheen bg-ink text-paper shadow-[0_8px_20px_-10px_rgba(11,27,46,0.55)] hover:bg-ink-700 hover:shadow-[0_14px_28px_-12px_rgba(11,27,46,0.6)]',
  secondary: 'border border-ink/20 bg-white/40 text-ink hover:border-ink/60 hover:bg-white',
  ghost: 'text-[15px] text-ink hover:text-brass-dark',
  light: 'sheen bg-paper text-ink hover:bg-white',
  outlineLight: 'border border-paper/30 text-paper hover:border-paper/60 hover:bg-paper/10',
};

interface ButtonProps {
  to?: string;
  href?: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  arrow = false,
  children,
  className = '',
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const padding = variant === 'ghost' ? '' : sizes[size];
  const classes = `${base} ${padding} ${variants[variant]} ${disabled ? 'cursor-not-allowed opacity-60' : ''} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" aria-hidden="true" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outlineLight';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 py-3 text-[15px] font-semibold transition-colors duration-200';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-ink-700',
  secondary: 'border border-ink/20 text-ink hover:border-ink hover:bg-white',
  ghost: 'px-0 py-0 text-ink hover:text-brass-dark',
  light: 'bg-paper text-ink hover:bg-white',
  outlineLight: 'border border-paper/30 text-paper hover:border-paper/60 hover:bg-paper/10',
};

interface ButtonProps {
  to?: string;
  href?: string;
  variant?: Variant;
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
  arrow = false,
  children,
  className = '',
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${disabled ? 'cursor-not-allowed opacity-60' : ''} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
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

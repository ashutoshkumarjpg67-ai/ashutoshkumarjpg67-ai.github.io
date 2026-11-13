import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/cn';

type Variant = 'gold' | 'outline' | 'quiet';
type Size = 'md' | 'lg';

interface ActionButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  /** Accessible label for links that open a new tab. */
  external?: boolean;
}

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-ink-deep hover:bg-gold-soft border border-gold',
  outline: 'border border-bone/25 text-bone hover:border-gold/70 hover:text-gold-soft',
  quiet: 'border border-transparent text-mist hover:text-gold-soft',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-3 text-[0.72rem]',
  lg: 'px-7 py-4 text-[0.78rem]',
};

export default function ActionButton({
  children,
  to,
  href,
  onClick,
  variant = 'gold',
  size = 'md',
  withArrow = false,
  className,
  type = 'button',
  disabled = false,
  external = false,
}: ActionButtonProps) {
  const classes = cn(
    'label inline-flex items-center justify-center gap-2.5 transition-[background-color,color,border-color,transform] duration-300',
    variants[variant],
    sizes[size],
    disabled && 'pointer-events-none opacity-45',
    className,
  );

  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cn('group/btn', classes)} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={cn('group/btn', classes)}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={cn('group/btn', classes)} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}

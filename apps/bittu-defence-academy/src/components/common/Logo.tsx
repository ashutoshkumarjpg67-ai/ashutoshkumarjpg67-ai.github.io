import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

interface LogoProps {
  className?: string;
  compact?: boolean;
}

/** Typographic lockup — provisional until the academy supplies a real mark. */
export default function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Bittu Defence Academy — home"
      className={cn('group flex items-center gap-3', className)}
    >
      <span className="relative grid h-11 w-11 shrink-0 place-items-center border border-gold/45 bg-ink-deep/60">
        <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden="true">
          <path d="M6 10h28M6 16h17M6 30h28" stroke="#C6A45A" strokeWidth="2.4" />
          <path d="M20 5v30" stroke="#C6A45A" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="20" cy="23" r="4.6" fill="#F2F0E8" />
          <circle cx="20" cy="23" r="7.6" fill="none" stroke="#C6A45A" strokeWidth="1.6" />
        </svg>
        <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-gold/60" />
      </span>

      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.28rem] tracking-[0.06em] text-bone transition-colors group-hover:text-gold-soft sm:text-[1.42rem]">
          Bittu
        </span>
        {!compact && (
          <span className="label mt-1 text-[0.58rem] tracking-[0.3em] text-gold/85">Defence Academy</span>
        )}
      </span>
    </Link>
  );
}

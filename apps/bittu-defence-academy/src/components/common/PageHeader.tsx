import type { ReactNode } from 'react';
import VisualPlate, { type PlateVariant } from './VisualPlate';
import { cn } from '../../lib/cn';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  art: PlateVariant;
  children?: ReactNode;
}

/** Shared inner-page hero. Sits below the fixed navbar. */
export default function PageHeader({ eyebrow, title, description, art, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-gold/15 bg-ink pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="absolute inset-0 opacity-40 tactical-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block">
        <VisualPlate variant={art} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1320px] px-6 sm:px-8 lg:px-12">
        <div className={cn('max-w-2xl')}>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-gold/70" />
            <span className="label text-gold">{eyebrow}</span>
          </div>
          <h1 className="font-display text-[clamp(2.6rem,7vw,5rem)] text-bone">{title}</h1>
          <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-mist">{description}</p>
          {children && <div className="mt-9">{children}</div>}
        </div>
      </div>
    </header>
  );
}

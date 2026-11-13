import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import VisualPlate from '../common/VisualPlate';
import type { Program } from '../../data/programs';
import { cn } from '../../lib/cn';

interface ProgramCardProps {
  program: Program;
  index: number;
  className?: string;
}

export default function ProgramCard({ program, index, className }: ProgramCardProps) {
  return (
    <Link
      to={`/programs#${program.id}`}
      className={cn(
        'group relative flex flex-col border border-bone/10 bg-ink-deep/60 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-gold/45',
        className,
      )}
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]">
          <VisualPlate variant={program.art} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/25 to-transparent" />
        <span className="absolute top-4 left-4 label text-[0.55rem] text-gold/90">
          {String(index + 1).padStart(2, '0')} / {program.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.6rem] text-bone transition-colors duration-300 group-hover:text-gold-soft">
          {program.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{program.summary}</p>
        <span className="label mt-6 inline-flex items-center gap-2 text-[0.6rem] text-gold">
          Explore
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>

      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold/70 transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
    </Link>
  );
}

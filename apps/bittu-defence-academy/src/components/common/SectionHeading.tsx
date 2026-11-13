import { cn } from '../../lib/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
  tone?: 'dark' | 'light';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  id,
  tone = 'dark',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'mb-5 flex items-center gap-3',
            align === 'center' && 'justify-center',
          )}
        >
          <span className={cn('h-px w-8', tone === 'dark' ? 'bg-gold/70' : 'bg-ink/40')} />
          <span className={cn('label', tone === 'dark' ? 'text-gold' : 'text-ink/70')}>{eyebrow}</span>
        </div>
      )}
      <h2
        id={id}
        className={cn(
          'font-display text-[clamp(2.15rem,5vw,3.65rem)]',
          tone === 'dark' ? 'text-bone' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 max-w-2xl text-[0.98rem] leading-relaxed',
            align === 'center' && 'mx-auto',
            tone === 'dark' ? 'text-mist' : 'text-ink/70',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

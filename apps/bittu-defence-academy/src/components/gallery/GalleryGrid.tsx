import VisualPlate from '../common/VisualPlate';
import type { GalleryItem } from '../../data/gallery';
import { cn } from '../../lib/cn';

interface GalleryGridProps {
  items: GalleryItem[];
  onSelect: (index: number) => void;
  className?: string;
}

export default function GalleryGrid({ items, onSelect, className }: GalleryGridProps) {
  return (
    <ul className={cn('grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3', className)}>
      {items.map((item, index) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onSelect(index)}
            className="group relative block w-full overflow-hidden border border-bone/10 text-left transition-colors duration-500 hover:border-gold/45"
            aria-label={`View ${item.title}`}
          >
            <span className="block aspect-[4/5] overflow-hidden">
              <span className="block h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]">
                <VisualPlate variant={item.art} />
              </span>
            </span>
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/95 via-ink-deep/10 to-transparent opacity-90" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
              <span className="label block text-[0.52rem] text-gold/90">{item.category}</span>
              <span className="mt-1 block text-sm leading-snug text-bone">{item.title}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

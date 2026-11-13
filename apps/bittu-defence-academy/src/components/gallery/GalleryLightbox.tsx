import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import VisualPlate from '../common/VisualPlate';
import type { GalleryItem } from '../../data/gallery';
import { useBodyScrollLock } from '../../hooks/ui';

interface GalleryLightboxProps {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({ items, index, onClose, onNavigate }: GalleryLightboxProps) {
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const item = index !== null ? items[index] : undefined;

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open || index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate((index + 1) % items.length);
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {open && item && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} — image ${index + 1} of ${items.length}`}
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink-deep/97 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-4 border-b border-bone/10 px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="label text-[0.55rem] text-gold">{item.category}</p>
              <p className="mt-1 truncate text-sm text-bone">{item.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="label mr-2 hidden text-[0.6rem] text-mist/60 sm:block">
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => onNavigate((index - 1 + items.length) % items.length)}
                className="grid h-10 w-10 place-items-center border border-bone/20 text-bone transition-colors hover:border-gold/60 hover:text-gold"
                aria-label="Previous image"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate((index + 1) % items.length)}
                className="grid h-10 w-10 place-items-center border border-bone/20 text-bone transition-colors hover:border-gold/60 hover:text-gold"
                aria-label="Next image"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center border border-bone/20 text-bone transition-colors hover:border-gold/60 hover:text-gold"
                aria-label="Close gallery"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
            <motion.div
              key={item.id}
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-full max-h-[70svh] w-full max-w-4xl overflow-hidden border border-bone/10"
            >
              <VisualPlate variant={item.art} />
            </motion.div>
          </div>

          <p className="label px-5 pb-6 text-center text-[0.55rem] text-mist/45 sm:px-8">
            Sample visual — academy photography will replace this plate
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

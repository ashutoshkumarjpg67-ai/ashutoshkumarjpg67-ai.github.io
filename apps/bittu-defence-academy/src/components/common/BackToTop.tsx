import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrolled } from '../../hooks/ui';

export default function BackToTop() {
  const visible = useScrolled(700);
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
          className="fixed right-5 bottom-5 z-40 grid h-11 w-11 place-items-center border border-gold/40 bg-ink-deep/90 text-gold backdrop-blur transition-colors hover:border-gold hover:text-gold-soft sm:right-8 sm:bottom-8"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

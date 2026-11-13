import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import type { VideoEntry } from '../../data/videos';
import { useBodyScrollLock } from '../../hooks/ui';

interface VideoModalProps {
  video: VideoEntry | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const reduceMotion = useReducedMotion();
  const open = Boolean(video?.youtubeId);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && video?.youtubeId && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-ink-deep/96 p-4 backdrop-blur-sm sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl border border-bone/15 bg-ink"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-bone/10 px-5 py-4">
              <p className="text-sm text-bone">{video.title}</p>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center border border-bone/20 text-bone transition-colors hover:border-gold/60 hover:text-gold"
                aria-label="Close video"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

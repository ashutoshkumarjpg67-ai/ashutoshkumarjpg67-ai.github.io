import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/cn';

/**
 * Athlete visual for the hero: a stencil-style sprinter rendered in SVG, with
 * speed streaks and a grounding shadow. Honest about being an illustration —
 * replace with a licensed photograph or 3D figure in the next phase.
 */
export default function AthleteVisual({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn('pointer-events-none select-none', className)}
      initial={reduceMotion ? undefined : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 520 620" className="h-full w-full">
        <defs>
          <linearGradient id="athlete-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3d5a47" />
            <stop offset="60%" stopColor="#20352a" />
            <stop offset="100%" stopColor="#101a16" />
          </linearGradient>
          <linearGradient id="athlete-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e0c890" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c6a45a" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <g stroke="#c6a45a" strokeOpacity="0.28" strokeLinecap="round">
          <line x1="30" y1="250" x2="150" y2="250" strokeWidth="2" />
          <line x1="10" y1="300" x2="120" y2="300" strokeWidth="3" />
          <line x1="40" y1="352" x2="140" y2="352" strokeWidth="2" />
        </g>

        <ellipse cx="300" cy="560" rx="150" ry="16" fill="#050908" fillOpacity="0.55" />

        <g transform="translate(150 120)">
          {/* rear limbs */}
          <path d="M212 190 L150 260 L100 250" stroke="#1b2c23" strokeWidth="26" strokeLinecap="round" fill="none" />
          <path d="M212 190 L166 300 L120 372" stroke="#16241d" strokeWidth="34" strokeLinecap="round" fill="none" />

          {/* torso + head */}
          <path d="M214 176 L250 60" stroke="url(#athlete-body)" strokeWidth="72" strokeLinecap="round" fill="none" />
          <path d="M214 176 L250 60" stroke="url(#athlete-rim)" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.75" />
          <circle cx="258" cy="44" r="29" fill="#22362b" />
          <path d="M232 30 A29 29 0 0 1 284 30" stroke="url(#athlete-rim)" strokeWidth="6" fill="none" strokeLinecap="round" />

          {/* front limbs */}
          <path d="M240 104 L300 148 L336 118" stroke="#2b4436" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M246 118 L296 182 L272 240" stroke="#334e3d" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
          <path d="M216 182 L256 292 L226 366" stroke="#2b4436" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M226 366 L214 398" stroke="#16241d" strokeWidth="24" strokeLinecap="round" />
        </g>
      </svg>
    </motion.div>
  );
}

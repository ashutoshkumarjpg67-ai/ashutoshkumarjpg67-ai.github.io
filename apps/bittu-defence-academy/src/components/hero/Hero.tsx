import { motion, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import HeroVisual from './HeroVisual';
import ActionButton from '../common/ActionButton';
import { academy } from '../../data/academy';
import { locationLine } from '../../lib/links';
import { EASE_OUT } from '../../animations/variants';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const parent = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
  };
  const child = {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
  };

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pt-28 pb-10 sm:justify-center sm:pt-32 sm:pb-16"
      aria-label="Bittu Defence Academy introduction"
    >
      <HeroVisual />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/55" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1320px] px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={parent}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={child} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="label border border-gold/45 px-3 py-1.5 text-[0.6rem] tracking-[0.24em] text-gold">
              Gopalganj · Bihar
            </span>
            <span className="label flex items-center gap-2 text-[0.6rem] text-mist/80">
              <MapPin className="h-3 w-3 text-gold/70" aria-hidden="true" />
              {locationLine()}
            </span>
          </motion.div>

          <motion.h1
            variants={child}
            className="font-display text-[clamp(2.5rem,7.4vw,5.9rem)] leading-[0.88] text-bone"
          >
            Discipline builds strength.
            <span className="mt-2 block text-gold-soft">Dedication builds champions.</span>
          </motion.h1>

          <motion.p variants={child} className="mt-7 max-w-xl text-base leading-relaxed text-mist sm:text-[1.05rem]">
            Train with purpose. Build physical strength, endurance and confidence at{' '}
            {academy.name}.
          </motion.p>

          <motion.div variants={child} className="mt-9 flex flex-wrap items-center gap-3">
            <ActionButton to="/programs" size="lg" withArrow>
              Explore Training
            </ActionButton>
            <ActionButton to="/contact" variant="outline" size="lg">
              Contact Academy
            </ActionButton>
          </motion.div>
        </motion.div>
      </div>

      {/* bottom information rail */}
      <div className="relative mx-auto mt-12 w-full max-w-[1320px] px-6 sm:mt-16 sm:px-8 lg:px-12">
        <dl className="grid grid-cols-2 gap-px border-t border-bone/10 bg-bone/10 sm:grid-cols-4">
          {[
            { term: 'Venue', detail: academy.location.venue },
            { term: 'Focus', detail: 'Track & field' },
            { term: 'Training', detail: 'Conditioning' },
            { term: 'Discipline', detail: 'Every session' },
          ].map((item) => (
            <div key={item.term} className="bg-ink/70 px-4 py-4 backdrop-blur-sm">
              <dt className="label text-[0.55rem] text-gold/80">{item.term}</dt>
              <dd className="mt-1.5 text-sm text-bone/90">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

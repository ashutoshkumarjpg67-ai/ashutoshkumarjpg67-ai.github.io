import { Check } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import ScrollReveal from '../components/common/ScrollReveal';
import ActionButton from '../components/common/ActionButton';
import VisualPlate from '../components/common/VisualPlate';
import { academy } from '../data/academy';
import { programs } from '../data/programs';
import { usePageMeta } from '../lib/seo';
import { cn } from '../lib/cn';

export default function Programs() {
  usePageMeta({
    title: 'Training Programs — Bittu Defence Academy',
    description:
      'Training focus areas at Bittu Defence Academy, Gopalganj: running practice, high jump, physical fitness, army physical preparation and sports training.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Training programs"
        title="Training, in detail."
        description="Each programme has a clear focus. Sessions are built around technique, repetition and the physical base that supports both."
        art="track"
      >
        <div className="flex flex-wrap gap-2">
          {programs.map((program) => (
            <a
              key={program.id}
              href={`#${program.id}`}
              className="label border border-bone/15 px-3 py-2 text-[0.58rem] text-mist transition-colors hover:border-gold/60 hover:text-gold-soft"
            >
              {program.title}
            </a>
          ))}
        </div>
      </PageHeader>

      <div className="bg-ink">
        {programs.map((program, index) => {
          const reversed = index % 2 === 1;
          return (
            <section
              key={program.id}
              id={program.id}
              aria-labelledby={`${program.id}-title`}
              className={cn(
                'scroll-mt-24 border-b border-bone/10 py-16 sm:py-20',
                index % 2 === 1 && 'bg-ink-deep',
              )}
            >
              <Container>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <ScrollReveal className={cn(reversed && 'lg:order-2')}>
                    <div className="relative">
                      <div className="aspect-[16/11] overflow-hidden border border-bone/10">
                        <VisualPlate variant={program.art} />
                      </div>
                      <span className="label absolute top-3 left-3 border border-gold/40 bg-ink-deep/85 px-2.5 py-1 text-[0.52rem] text-gold">
                        {program.tag}
                      </span>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.08} className={cn(reversed && 'lg:order-1')}>
                    <p className="label text-[0.58rem] text-gold/80">
                      {String(index + 1).padStart(2, '0')} / {String(programs.length).padStart(2, '0')}
                    </p>
                    <h2
                      id={`${program.id}-title`}
                      className="mt-3 font-display text-[clamp(2rem,4.4vw,3.2rem)] text-bone"
                    >
                      {program.title}
                    </h2>
                    <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-mist">{program.summary}</p>

                    <div className="mt-7">
                      <p className="label text-[0.55rem] text-mist/50">Training focus</p>
                      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {program.focus.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-bone/85">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <ActionButton to="/contact" withArrow>
                        Enquire about this
                      </ActionButton>
                      <ActionButton to="/gallery" variant="quiet">
                        See gallery
                      </ActionButton>
                    </div>
                  </ScrollReveal>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <section className="bg-moss py-16 sm:py-20" aria-labelledby="programs-note">
        <Container>
          <div className="grid gap-8 border border-gold/25 bg-ink-deep/40 p-8 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 id="programs-note" className="font-display text-[clamp(1.6rem,3vw,2.4rem)] text-bone">
                Not sure where to start?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist/85">
                {academy.provisionalNote} Fees, batch timings, duration and eligibility are not listed on
                this site because they are confirmed individually by the academy.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ActionButton to="/contact" withArrow>
                Contact academy
              </ActionButton>
              <ActionButton href={academy.instagram.url} variant="outline" external>
                Instagram
              </ActionButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

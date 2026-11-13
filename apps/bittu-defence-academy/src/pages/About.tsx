import { Compass, Flag, Shield } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import ScrollReveal from '../components/common/ScrollReveal';
import ActionButton from '../components/common/ActionButton';
import VisualPlate from '../components/common/VisualPlate';
import ContactChannels from '../components/contact/ContactChannels';
import { academy } from '../data/academy';
import { usePageMeta } from '../lib/seo';

const pillars = [
  {
    title: 'Mission',
    icon: Flag,
    body: 'To give athletes in Gopalganj a disciplined place to train — with structure, coaching and a ground to practise on, week after week.',
  },
  {
    title: 'Vision',
    icon: Compass,
    body: 'A training culture where physical preparation is taken seriously, and where consistent work is respected more than shortcuts.',
  },
  {
    title: 'Philosophy',
    icon: Shield,
    body: 'Technique before volume, base before peak, and honesty about what a session can achieve. No inflated claims, no shortcuts.',
  },
];

const principles = [
  {
    title: 'Show up on the hard days',
    body: 'Consistency is the habit the training is designed to build. It is also the habit that carries into selection and competition.',
  },
  {
    title: 'Respect the process',
    body: 'Warm-ups, drills and repetitions are not obstacles between you and the result. They are the result, repeated.',
  },
  {
    title: 'Train with intent',
    body: 'Every attempt has a purpose. Attention to detail is treated as part of the physical work, not an optional extra.',
  },
];

export default function About() {
  usePageMeta({
    title: 'About — Bittu Defence Academy, Gopalganj',
    description:
      'Bittu Defence Academy is a sports and physical training academy at Minz Stadium, Gopalganj, Bihar. Built around discipline, conditioning and consistent practice.',
  });

  return (
    <>
      <PageHeader
        eyebrow="About the academy"
        title="Built on repetition."
        description={`${academy.name} is a sports and physical training academy based at ${academy.location.venue}, ${academy.location.city}. The work is straightforward and it is done on the ground.`}
        art="nightrun"
      >
        <div className="flex flex-wrap gap-3">
          <ActionButton to="/programs" withArrow>
            Training programmes
          </ActionButton>
          <ActionButton to="/contact" variant="outline">
            Contact academy
          </ActionButton>
        </div>
      </PageHeader>

      <section className="bg-ink py-20 sm:py-24" aria-labelledby="about-intro">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <ScrollReveal>
              <SectionHeading
                id="about-intro"
                eyebrow="Who we are"
                title="A training academy for people who intend to improve."
                description={academy.intro}
              />
              <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-mist/85">
                <p>
                  The academy works across track and field and general physical preparation. Sessions
                  cover running mechanics, high jump technique, conditioning and the kind of sustained
                  physical work that defence-style selection routines ask for.
                </p>
                <p>
                  Training takes place at {academy.location.venue} in {academy.location.city}. Group
                  sessions are led on the ground, with attention to technique and to the individual
                  adjustments each athlete needs.
                </p>
                <p className="border-l border-gold/40 pl-4 text-sm text-mist/70">
                  Academy history, coaching credentials, batch details and fees are not published here.
                  For confirmed information, contact the academy directly.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden border border-bone/10">
                  <VisualPlate variant="hurdle" />
                </div>
                <div className="absolute -right-2 -bottom-2 h-16 w-16 border-r border-b border-gold/60" aria-hidden="true" />
                <p className="mt-3 text-xs text-mist/50">Sample visual — replace with academy photography</p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-gold/10 bg-ink-deep py-20 sm:py-24" aria-labelledby="pillars-heading">
        <Container>
          <SectionHeading
            id="pillars-heading"
            eyebrow="Direction"
            title="Mission, vision and philosophy."
            className="max-w-2xl"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={pillar.title} delay={index * 0.06}>
                  <article className="h-full border border-bone/10 bg-ink/60 p-7 transition-colors duration-500 hover:border-gold/40">
                    <Icon className="h-6 w-6 text-gold" aria-hidden="true" />
                    <h3 className="mt-6 font-display text-[1.55rem] text-bone">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{pillar.body}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-moss py-20 sm:py-24" aria-labelledby="discipline-heading">
        <div className="absolute inset-0 hatch opacity-25" aria-hidden="true" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              id="discipline-heading"
              eyebrow="Discipline & dedication"
              title="The two things nobody can do for you."
              description="Talent gets attention. Discipline gets results. Training is organised so that both are practised, not just discussed."
            />
            <ol className="space-y-8">
              {principles.map((principle, index) => (
                <ScrollReveal key={principle.title} delay={index * 0.05}>
                  <li className="border-t border-bone/15 pt-6">
                    <div className="flex items-baseline gap-4">
                      <span className="label text-[0.6rem] text-gold/70">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.4rem] text-bone">{principle.title}</h3>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-mist/85">{principle.body}</p>
                      </div>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 sm:py-24" aria-labelledby="showcase-heading">
        <Container>
          <SectionHeading
            id="showcase-heading"
            eyebrow="On the ground"
            title="Where the training happens."
            description="Minz Stadium, Gopalganj — track, field and conditioning work under one programme."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {(['track', 'highjump', 'drills'] as const).map((variant) => (
              <div key={variant} className="aspect-[4/3] overflow-hidden border border-bone/10">
                <VisualPlate variant={variant} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-gold/10 bg-ink-deep py-20 sm:py-24" aria-labelledby="about-contact">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              id="about-contact"
              eyebrow="Next step"
              title="Come and see a session."
              description="The fastest way to understand the training is to visit the ground or speak to the academy directly."
            />
            <ContactChannels />
          </div>
        </Container>
      </section>
    </>
  );
}

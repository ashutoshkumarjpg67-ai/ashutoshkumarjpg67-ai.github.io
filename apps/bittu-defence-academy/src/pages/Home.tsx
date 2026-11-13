import { useNavigate } from 'react-router-dom';
import { Award, Dumbbell, Footprints, Repeat, Target } from 'lucide-react';
import Hero from '../components/hero/Hero';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import ScrollReveal from '../components/common/ScrollReveal';
import ActionButton from '../components/common/ActionButton';
import ProgramCard from '../components/cards/ProgramCard';
import VideoCard from '../components/cards/VideoCard';
import GalleryGrid from '../components/gallery/GalleryGrid';
import ContactChannels from '../components/contact/ContactChannels';
import VisualPlate from '../components/common/VisualPlate';
import { academy } from '../data/academy';
import { programs } from '../data/programs';
import { galleryItems } from '../data/gallery';
import { videos, videosArePlaceholders, youtubeChannelUrl } from '../data/videos';
import { usePageMeta } from '../lib/seo';

const values = [
  {
    title: 'Discipline',
    detail: 'Sessions start on time and finish with the work done. Structure is the point, not a constraint.',
    icon: Target,
  },
  {
    title: 'Physical fitness',
    detail: 'Strength, mobility and stamina built in the right order — the base comes before the peak.',
    icon: Dumbbell,
  },
  {
    title: 'Consistency',
    detail: 'Progress on the track is accumulated, not summoned. Showing up is the skill underneath the skill.',
    icon: Repeat,
  },
  {
    title: 'Dedication',
    detail: 'Attention to the small technical details that decide whether an attempt lands or falls short.',
    icon: Footprints,
  },
  {
    title: 'Sports performance',
    detail: 'Training aimed at measurable improvement in how you run, jump and hold up under effort.',
    icon: Award,
  },
];

export default function Home() {
  const navigate = useNavigate();

  usePageMeta({
    title: 'Bittu Defence Academy — Sports & Fitness Training in Gopalganj, Bihar',
    description:
      'Sports and physical training at Minz Stadium, Gopalganj. High jump, running practice, physical fitness and army physical preparation.',
  });

  return (
    <>
      <Hero />

      {/* C — academy introduction */}
      <section className="relative border-t border-gold/10 bg-ink py-20 sm:py-28" aria-labelledby="intro-heading">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <ScrollReveal className="order-2 lg:order-1">
              <SectionHeading
                id="intro-heading"
                eyebrow="The academy"
                title="A training ground, not a shortcut."
                description={academy.intro}
              />
              <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-mist/85">
                Sessions take place at {academy.location.venue} in {academy.location.city}, where track
                and field work, conditioning and general sports training share the same ground. The
                approach is straightforward: learn the technique, repeat it, and let the results follow
                the work.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ActionButton to="/about" withArrow>
                  Read more
                </ActionButton>
                <ActionButton to="/contact" variant="quiet">
                  Talk to the academy
                </ActionButton>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="order-1 lg:order-2">
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden border border-bone/10">
                  <VisualPlate variant="stands" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center justify-between gap-3 p-5">
                    <div>
                      <p className="label text-[0.52rem] text-gold">Training base</p>
                      <p className="mt-1 text-sm text-bone">
                        {academy.location.venue}, {academy.location.city}
                      </p>
                    </div>
                    <p className="label text-[0.52rem] text-mist/70">Sample visual</p>
                  </div>
                </div>
                <div className="absolute -top-3 -left-3 h-10 w-10 border-t border-l border-gold/60" aria-hidden="true" />
                <div className="absolute -right-3 -bottom-3 h-10 w-10 border-r border-b border-gold/60" aria-hidden="true" />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* D — training programs */}
      <section className="relative bg-ink-deep py-20 sm:py-28" aria-labelledby="programs-heading">
        <div className="absolute inset-0 tactical-grid opacity-20" aria-hidden="true" />
        <Container className="relative">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="programs-heading"
              eyebrow="Training programs"
              title="Build the base. Then build the athlete."
            />
            <ActionButton to="/programs" variant="outline" withArrow className="shrink-0">
              All programmes
            </ActionButton>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <ScrollReveal key={program.id} delay={index * 0.05}>
                <ProgramCard program={program} index={index} className="h-full" />
              </ScrollReveal>
            ))}
          </div>

          <p className="mt-8 max-w-3xl border-l border-gold/40 pl-4 text-xs leading-relaxed text-mist/60">
            {academy.provisionalNote}
          </p>
        </Container>
      </section>

      {/* E — why train with us */}
      <section className="relative overflow-hidden bg-moss py-20 sm:py-28" aria-labelledby="values-heading">
        <div className="absolute inset-0 hatch opacity-30" aria-hidden="true" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <ScrollReveal>
              <SectionHeading
                id="values-heading"
                eyebrow="Why train with us"
                title="Five habits that outlast any single session."
                description="No promises about outcomes. This is what the training is built on, and what we ask of everyone on the ground."
              />
            </ScrollReveal>

            <ul className="divide-y divide-bone/10 border-t border-bone/10">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <ScrollReveal key={value.title} delay={index * 0.04}>
                    <li className="group flex gap-5 py-6">
                      <span className="label w-8 shrink-0 pt-1 text-[0.6rem] text-gold/70">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold/80" aria-hidden="true" />
                      <div>
                        <h3 className="font-display text-[1.35rem] text-bone">{value.title}</h3>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-mist/85">{value.detail}</p>
                      </div>
                    </li>
                  </ScrollReveal>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      {/* F — gallery preview */}
      <section className="bg-ink py-20 sm:py-28" aria-labelledby="gallery-heading">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="gallery-heading"
              eyebrow="Training gallery"
              title="Work done on the ground."
              description="Running, high jump and conditioning sessions from the academy ground."
            />
            <ActionButton to="/gallery" variant="outline" withArrow className="shrink-0">
              Open gallery
            </ActionButton>
          </div>

          <ScrollReveal className="mt-12">
            <GalleryGrid
              items={galleryItems.slice(0, 4)}
              onSelect={() => navigate('/gallery')}
              className="lg:grid-cols-4"
            />
          </ScrollReveal>

          <p className="mt-6 text-xs leading-relaxed text-mist/50">
            Sample visuals are shown until academy photography is supplied.
          </p>
        </Container>
      </section>

      {/* G — video showcase */}
      <section className="border-y border-gold/10 bg-ink-deep py-20 sm:py-28" aria-labelledby="videos-heading">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="videos-heading"
              eyebrow="Video showcase"
              title="Sessions, in motion."
              description="Training clips are published on the academy's YouTube channel once uploads are confirmed."
            />
            <ActionButton to="/videos" variant="outline" withArrow className="shrink-0">
              View videos
            </ActionButton>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <ScrollReveal key={video.id} delay={index * 0.05}>
                <VideoCard video={video} onPlay={() => navigate('/videos')} />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border border-dashed border-bone/15 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-mist/60">
              {videosArePlaceholders
                ? 'No YouTube video links have been supplied yet, so no placeholder players are embedded.'
                : 'Watch the full collection on the academy channel.'}
            </p>
            {youtubeChannelUrl ? (
              <ActionButton href={youtubeChannelUrl} external variant="outline">
                YouTube channel
              </ActionButton>
            ) : (
              <span className="label text-[0.6rem] text-mist/40">Channel link pending</span>
            )}
          </div>
        </Container>
      </section>

      {/* H — contact CTA */}
      <section className="relative overflow-hidden bg-ink py-20 sm:py-28" aria-labelledby="contact-heading">
        <div className="absolute inset-0 tactical-grid opacity-20" aria-hidden="true" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <ScrollReveal>
              <SectionHeading
                id="contact-heading"
                eyebrow="Get in touch"
                title="Start with a conversation."
                description="Call or message the academy to ask about training at Minz Stadium. Fees, batch timings and availability are confirmed directly by the academy."
              />
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ActionButton to="/contact" withArrow>
                  Contact page
                </ActionButton>
                <ActionButton href={academy.instagram.url} variant="outline" external>
                  Instagram
                </ActionButton>
              </div>
              <p className="mt-10 max-w-sm text-xs leading-relaxed text-mist/50">
                {academy.name} · {academy.category} · {academy.location.city}, {academy.location.state}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <ContactChannels />
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="bg-ink-deep py-14" aria-labelledby="closing-heading">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 border border-gold/25 bg-gradient-to-r from-moss/60 to-ink-deep p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 id="closing-heading" className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] text-bone">
                {academy.tagline}
              </h2>
              <p className="mt-2 text-sm text-mist/75">
                {academy.location.venue} · {academy.location.city}, {academy.location.state}
              </p>
            </div>
            <ActionButton to="/programs" size="lg" withArrow className="shrink-0">
              Explore training
            </ActionButton>
          </div>
        </Container>
      </section>
    </>
  );
}

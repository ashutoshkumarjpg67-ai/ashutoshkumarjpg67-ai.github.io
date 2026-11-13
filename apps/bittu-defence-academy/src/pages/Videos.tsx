import { useState } from 'react';
import { Youtube } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import VideoCard from '../components/cards/VideoCard';
import VideoModal from '../components/common/VideoModal';
import ActionButton from '../components/common/ActionButton';
import { videos, videosArePlaceholders, youtubeChannelUrl, type VideoEntry } from '../data/videos';
import { academy } from '../data/academy';
import { usePageMeta } from '../lib/seo';

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState<VideoEntry | null>(null);

  usePageMeta({
    title: 'Videos — Bittu Defence Academy',
    description:
      'Training clips from Bittu Defence Academy, Gopalganj: high jump, running practice and physical training sessions.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Video showcase"
        title="Training, in motion."
        description="Clips from the ground are published on the academy's YouTube channel. Video links are added only when the academy supplies them."
        art="nightrun"
      />

      <section className="bg-ink py-14 sm:py-20" aria-labelledby="video-grid-heading">
        <Container>
          <SectionHeading
            id="video-grid-heading"
            eyebrow="Sessions"
            title="What a session looks like."
            description="Uploads are pending. Each card below is a placeholder for a real academy clip — no sample video has been embedded in its place."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} onPlay={setActiveVideo} />
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-6 border border-gold/25 bg-moss/40 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-start gap-4">
              <Youtube className="mt-1 h-7 w-7 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <h2 className="font-display text-[1.6rem] text-bone">The official channel</h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-mist/85">
                  {youtubeChannelUrl
                    ? 'Watch the full collection of academy uploads on YouTube.'
                    : `${academy.name} has not shared its YouTube channel URL yet. It will be linked here, and in the footer, as soon as it is confirmed.`}
                </p>
              </div>
            </div>

            {youtubeChannelUrl ? (
              <ActionButton href={youtubeChannelUrl} external withArrow className="shrink-0">
                Open channel
              </ActionButton>
            ) : (
              <span className="label shrink-0 border border-dashed border-bone/20 px-4 py-3 text-[0.6rem] text-mist/45">
                Channel link pending
              </span>
            )}
          </div>

          {videosArePlaceholders && (
            <p className="mt-6 text-xs leading-relaxed text-mist/50">
              Video titles describe training focus areas and are placeholders until real uploads are
              supplied.
            </p>
          )}
        </Container>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}

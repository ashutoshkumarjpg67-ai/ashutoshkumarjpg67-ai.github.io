import { Play } from 'lucide-react';
import VisualPlate from '../common/VisualPlate';
import type { VideoEntry } from '../../data/videos';

interface VideoCardProps {
  video: VideoEntry;
  onPlay: (video: VideoEntry) => void;
}

export default function VideoCard({ video, onPlay }: VideoCardProps) {
  const playable = Boolean(video.youtubeId);

  return (
    <article className="group relative flex flex-col border border-bone/10 bg-ink-deep/60">
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0">
          <VisualPlate variant={video.art} />
        </div>
        <div className="absolute inset-0 bg-ink-deep/30" />

        {playable ? (
          <button
            type="button"
            onClick={() => onPlay(video)}
            className="absolute inset-0 grid place-items-center"
            aria-label={`Play video: ${video.title}`}
          >
            <span className="grid h-14 w-14 place-items-center border border-gold/70 bg-ink-deep/70 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink-deep">
              <Play className="ml-0.5 h-5 w-5" aria-hidden="true" />
            </span>
          </button>
        ) : (
          <span className="label absolute top-3 left-3 border border-bone/20 bg-ink-deep/80 px-2.5 py-1 text-[0.52rem] text-mist/80">
            Video coming soon
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.02rem] font-medium text-bone">{video.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{video.description}</p>
        {!playable && (
          <p className="mt-4 text-xs text-mist/50">
            Awaiting the academy&apos;s official upload link.
          </p>
        )}
      </div>
    </article>
  );
}

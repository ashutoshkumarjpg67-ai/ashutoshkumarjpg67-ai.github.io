import type { PlateVariant } from '../components/common/VisualPlate';
import { academy } from './academy';

export interface VideoEntry {
  id: string;
  title: string;
  description: string;
  /** YouTube video id. `null` until a real video is supplied — never invented. */
  youtubeId: string | null;
  art: PlateVariant;
}

/** Channel URL is configurable in `academy.youtube.url`. */
export const youtubeChannelUrl = academy.youtube.url;

export const videos: VideoEntry[] = [
  {
    id: 'v1',
    title: 'High jump training',
    description: 'Approach, take-off and clearance work from a training session.',
    youtubeId: null,
    art: 'highjump',
  },
  {
    id: 'v2',
    title: 'Track and running practice',
    description: 'Sprint mechanics and repeat efforts on the track.',
    youtubeId: null,
    art: 'track',
  },
  {
    id: 'v3',
    title: 'Physical training session',
    description: 'Conditioning and strength basics at the ground.',
    youtubeId: null,
    art: 'drills',
  },
];

export const videosArePlaceholders = videos.every((video) => video.youtubeId === null);

import type { PlateVariant } from '../components/common/VisualPlate';

export const galleryCategories = ['Running', 'High Jump', 'Physical Training', 'Academy Activities'] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  art: PlateVariant;
}

/**
 * Placeholder plates. Replace `art` with an image source once academy
 * photography is supplied — see README ("Replacing sample visuals").
 */
export const galleryItems: GalleryItem[] = [
  { id: 'g1', title: 'Track session at Minz Stadium', category: 'Running', art: 'track' },
  { id: 'g2', title: 'Stride work on the straight', category: 'Running', art: 'nightrun' },
  { id: 'g3', title: 'Approach run practice', category: 'High Jump', art: 'highjump' },
  { id: 'g4', title: 'Bar clearance work', category: 'High Jump', art: 'banner' },
  { id: 'g5', title: 'Ground conditioning', category: 'Physical Training', art: 'drills' },
  { id: 'g6', title: 'Strength and movement basics', category: 'Physical Training', art: 'relay' },
  { id: 'g7', title: 'Training group on the field', category: 'Academy Activities', art: 'stands' },
  { id: 'g8', title: 'Evening practice', category: 'Academy Activities', art: 'hurdle' },
  { id: 'g9', title: 'Sprint repetition sets', category: 'Running', art: 'runner' },
];

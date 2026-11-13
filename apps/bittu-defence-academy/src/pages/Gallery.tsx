import { useMemo, useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import GalleryGrid from '../components/gallery/GalleryGrid';
import GalleryLightbox from '../components/gallery/GalleryLightbox';
import { galleryCategories, galleryItems, type GalleryCategory } from '../data/gallery';
import { usePageMeta } from '../lib/seo';
import { cn } from '../lib/cn';

type Filter = GalleryCategory | 'All';

const filters: Filter[] = ['All', ...galleryCategories];

export default function Gallery() {
  const [active, setActive] = useState<Filter>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  usePageMeta({
    title: 'Gallery — Bittu Defence Academy',
    description:
      'Training gallery: running, high jump, physical training and academy activities at Bittu Defence Academy, Minz Stadium, Gopalganj.',
  });

  const items = useMemo(
    () => (active === 'All' ? galleryItems : galleryItems.filter((item) => item.category === active)),
    [active],
  );

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="On the ground."
        description="Running sessions, high jump work, conditioning and academy activity from Minz Stadium."
        art="drills"
      />

      <section className="bg-ink py-14 sm:py-20" aria-labelledby="gallery-grid-heading">
        <Container>
          <div className="flex flex-col gap-5 border-b border-bone/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="gallery-grid-heading" className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] text-bone">
                {active === 'All' ? 'All training visuals' : active}
              </h2>
              <p className="mt-1 text-xs text-mist/50">
                {items.length} {items.length === 1 ? 'visual' : 'visuals'}
              </p>
            </div>

            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1" role="group" aria-label="Filter gallery by category">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    setActive(filter);
                    setLightboxIndex(null);
                  }}
                  aria-pressed={active === filter}
                  className={cn(
                    'label shrink-0 border px-3.5 py-2 text-[0.58rem] transition-colors duration-300',
                    active === filter
                      ? 'border-gold bg-gold text-ink-deep'
                      : 'border-bone/15 text-mist hover:border-gold/60 hover:text-gold-soft',
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <GalleryGrid items={items} onSelect={setLightboxIndex} className="mt-8" />

          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-mist/50">
            Sample visuals are in place while academy photography is being collected. Images provided by
            the academy can replace these plates directly.
          </p>
        </Container>
      </section>

      <GalleryLightbox
        items={items}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}

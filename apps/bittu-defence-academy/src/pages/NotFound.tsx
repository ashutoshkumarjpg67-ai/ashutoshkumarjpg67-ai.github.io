import Container from '../components/common/Container';
import ActionButton from '../components/common/ActionButton';
import { navItems } from '../data/nav';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/seo';

export default function NotFound() {
  usePageMeta({
    title: 'Page not found — Bittu Defence Academy',
    description: 'The page you were looking for is not available.',
  });

  return (
    <section className="relative flex min-h-[78svh] items-center overflow-hidden bg-ink pt-28 pb-20">
      <div className="absolute inset-0 tactical-grid opacity-25" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" aria-hidden="true" />

      <Container className="relative">
        <p className="label text-gold">Error 404</p>
        <h1 className="mt-5 font-display text-[clamp(3rem,10vw,7rem)] leading-none text-bone">
          Off the track.
        </h1>
        <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-mist">
          This page does not exist. Head back to the academy, or pick a route below.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <ActionButton to="/" withArrow>
            Back home
          </ActionButton>
          <ActionButton to="/contact" variant="outline">
            Contact academy
          </ActionButton>
        </div>

        <ul className="mt-12 grid gap-2 border-t border-bone/10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item, index) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="group flex items-baseline justify-between gap-4 border-b border-bone/10 py-3 text-sm text-mist transition-colors hover:text-gold-soft"
              >
                <span>{item.label}</span>
                <span className="label text-[0.55rem] text-mist/40">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

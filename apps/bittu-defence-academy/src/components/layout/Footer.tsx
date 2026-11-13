import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Youtube } from 'lucide-react';
import Logo from '../common/Logo';
import { academy } from '../../data/academy';
import { programs } from '../../data/programs';
import { navItems } from '../../data/nav';
import { formatPhone, locationLine, mapsHref, telHref } from '../../lib/links';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gold/15 bg-ink-deep">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />

      <div className="mx-auto w-full max-w-[1320px] px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
              Sports and physical training at {academy.location.venue}, {academy.location.city}. Built around
              discipline, conditioning and consistent practice.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href={academy.instagram.url}
                target="_blank"
                rel="noreferrer noopener"
                className="grid h-10 w-10 place-items-center border border-bone/15 text-mist transition-colors hover:border-gold/60 hover:text-gold"
                aria-label="Bittu Defence Academy on Instagram"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <span
                className="grid h-10 w-10 cursor-not-allowed place-items-center border border-bone/10 text-mist/35"
                title="YouTube channel link coming soon"
                aria-label="YouTube channel link coming soon"
              >
                <Youtube className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="label text-gold">Explore</h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-mist transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Training areas">
            <h2 className="label text-gold">Training</h2>
            <ul className="mt-5 space-y-3">
              {programs.map((program) => (
                <li key={program.id}>
                  <Link
                    to={`/programs#${program.id}`}
                    className="text-sm text-mist transition-colors hover:text-bone"
                  >
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label text-gold">Reach us</h2>
            <ul className="mt-5 space-y-4 text-sm">
              {academy.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={telHref(phone)}
                    className="flex items-center gap-3 text-mist transition-colors hover:text-bone"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
                    {formatPhone(phone)}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={mapsHref()}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-start gap-3 text-mist transition-colors hover:text-bone"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
                  <span>
                    {locationLine()}
                    <span className="mt-1 block text-xs text-mist/60">Open in maps</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-bone/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mist/70">
            © {year} {academy.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-mist/60">
            <span>{academy.category}</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="label text-[0.62rem] text-mist/70 transition-colors hover:text-gold"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

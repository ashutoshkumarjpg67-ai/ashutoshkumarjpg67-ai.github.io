import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import Logo from '../common/Logo';
import ActionButton from '../common/ActionButton';
import { navItems } from '../../data/nav';
import { academy } from '../../data/academy';
import { formatPhone, telHref } from '../../lib/links';
import { useBodyScrollLock, useEscapeKey, useScrolled } from '../../hooks/ui';
import { cn } from '../../lib/cn';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(28);
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const heroTransparent = location.pathname === '/' && !scrolled && !menuOpen;

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useBodyScrollLock(menuOpen);
  useEscapeKey(menuOpen, closeMenu);

  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink-deep focus:text-sm"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          heroTransparent
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-gold/15 bg-ink/92 backdrop-blur-md',
        )}
      >
        <div className="mx-auto flex h-[76px] w-full max-w-[1320px] items-center justify-between gap-4 px-6 sm:h-20 sm:px-8 lg:px-12">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'label relative px-3.5 py-2 text-[0.70rem] tracking-[0.16em] transition-colors duration-300',
                    isActive ? 'text-gold' : 'text-bone/75 hover:text-bone',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={cn(
                        'absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300',
                        isActive ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={telHref(academy.phones[0])}
              className="label flex items-center gap-2 text-[0.7rem] text-mist transition-colors hover:text-gold-soft"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {formatPhone(academy.phones[0])}
            </a>
            <ActionButton to="/contact" withArrow>
              Enquire
            </ActionButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center border border-bone/20 text-bone transition-colors hover:border-gold/60 hover:text-gold lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-ink-deep/98 pt-[76px] backdrop-blur-md lg:hidden"
          >
            <div className="absolute inset-0 tactical-grid opacity-30" aria-hidden="true" />
            <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto px-6 pt-8 pb-6">
              <ul className="divide-y divide-bone/10 border-y border-bone/10">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.to}
                    initial={reduceMotion ? undefined : { opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index + 0.05, duration: 0.35 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-baseline justify-between gap-4 py-4',
                          isActive ? 'text-gold' : 'text-bone',
                        )
                      }
                    >
                      <span className="font-display text-[1.6rem]">{item.label}</span>
                      <span className="label text-[0.6rem] text-mist/60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 grid gap-3">
                <ActionButton to="/contact" size="lg" withArrow className="w-full">
                  Enquire
                </ActionButton>
                <div className="grid grid-cols-2 gap-3">
                  {academy.phones.map((phone) => (
                    <ActionButton key={phone} href={telHref(phone)} variant="outline" className="w-full">
                      {formatPhone(phone)}
                    </ActionButton>
                  ))}
                </div>
                <Link to="/gallery" className="label mt-2 text-center text-[0.65rem] text-mist/70 underline-offset-4 hover:text-gold hover:underline">
                  {academy.location.venue}, {academy.location.city}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

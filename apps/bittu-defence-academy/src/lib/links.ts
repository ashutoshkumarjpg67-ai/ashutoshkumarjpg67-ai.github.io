import { academy } from '../data/academy';

/** `9304057730` -> `+91 93040 57730` (display only; numbers stay as supplied). */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(-10);
  const groups = [digits.slice(0, 5), digits.slice(5)];
  return `${academy.dialCode} ${groups.filter(Boolean).join(' ')}`.trim();
}

export function telHref(raw: string): string {
  return `tel:+${academy.countryCode}${raw.replace(/\D/g, '').slice(-10)}`;
}

export function whatsappHref(raw: string, message: string = academy.whatsappMessage): string {
  return `https://wa.me/${academy.countryCode}${raw.replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(message)}`;
}

/** Location line — venue, city and state only. No street address is published. */
export function locationLine(): string {
  const { venue, city, state } = academy.location;
  return `${venue}, ${city}, ${state}`;
}

export function mapsHref(): string {
  const q = encodeURIComponent(`${academy.name}, ${locationLine()}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

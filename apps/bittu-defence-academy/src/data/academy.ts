/**
 * Single source of truth for academy facts.
 * Only publicly shared information lives here — no fees, timings, coach details,
 * student numbers, achievements or street address are invented.
 */
export const academy = {
  name: 'Bittu Defence Academy',
  shortName: 'BDA',
  category: 'Sports & Fitness Instruction',
  tagline: 'Discipline builds strength. Dedication builds champions.',
  location: {
    venue: 'Minz Stadium',
    city: 'Gopalganj',
    state: 'Bihar',
    country: 'India',
  },
  /** Numbers as supplied by the academy. */
  phones: ['9304057730', '9934116573'],
  countryCode: '91',
  dialCode: '+91',
  instagram: {
    label: 'bittu_defence_academy_09',
    url: 'https://www.instagram.com/bittu_defence_academy_09/',
  },
  /** Configurable placeholder — set `url` once the official channel is confirmed. */
  youtube: {
    label: 'YouTube channel',
    url: '',
  },
  whatsappMessage:
    'Hello Bittu Defence Academy, I would like to know more about training at the academy.',
  intro:
    'Bittu Defence Academy is a sports and physical training academy based at Minz Stadium in Gopalganj, Bihar. Training is built around track and field work, conditioning and the physical habits that hold up under pressure.',
  /** Shown wherever training categories are listed. */
  provisionalNote:
    'Training categories reflect the focus areas the academy shares publicly. Schedules, eligibility and availability are confirmed directly by the academy.',
} as const;

export type Academy = typeof academy;

import { useId } from 'react';
import { cn } from '../../lib/cn';

/**
 * Art-directed placeholder plates.
 *
 * These are drawn as SVG so the first delivery has zero licensing risk and no
 * heavy downloads. Swap them for academy photography when it is supplied —
 * see README ("Replacing sample visuals").
 */
export type PlateVariant =
  | 'track'
  | 'highjump'
  | 'runner'
  | 'stands'
  | 'drills'
  | 'banner'
  | 'hurdle'
  | 'nightrun'
  | 'relay';

interface VisualPlateProps {
  variant: PlateVariant;
  className?: string;
  /** Decorative plates are hidden from assistive tech. */
  decorative?: boolean;
}

export default function VisualPlate({ variant, className, decorative = true }: VisualPlateProps) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '');
  const bg = `bg-${uid}`;
  const glow = `glow-${uid}`;
  const vignette = `vig-${uid}`;
  const hatch = `hatch-${uid}`;

  return (
    <svg
      viewBox="0 0 800 560"
      preserveAspectRatio="xMidYMid slice"
      className={cn('h-full w-full', className)}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative ? true : undefined}
    >
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22362b" />
          <stop offset="55%" stopColor="#182620" />
          <stop offset="100%" stopColor="#0c1512" />
        </linearGradient>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c6a45a" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#c6a45a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={vignette} cx="50%" cy="45%" r="72%">
          <stop offset="55%" stopColor="#050908" stopOpacity="0" />
          <stop offset="100%" stopColor="#050908" stopOpacity="0.72" />
        </radialGradient>
        <pattern id={hatch} width="10" height="10" patternTransform="rotate(-45)" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="none" />
          <line x1="0" y1="0" x2="0" y2="10" stroke="#c6a45a" strokeOpacity="0.09" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="800" height="560" fill={`url(#${bg})`} />
      {renderArt(variant, glow)}

      <rect width="800" height="560" fill={`url(#${hatch})`} />
      <rect width="800" height="560" fill={`url(#${vignette})`} />

      {/* registration ticks */}
      <g stroke="#c6a45a" strokeOpacity="0.5" strokeWidth="1.5">
        <path d="M28 28h22M28 28v22" />
        <path d="M772 532h-22M772 532v-22" />
      </g>
    </svg>
  );
}

function renderArt(variant: PlateVariant, glow: string) {
  const gold = '#c6a45a';
  const bone = '#e9e7dd';

  switch (variant) {
    case 'track':
      return (
        <g>
          <ellipse cx="400" cy="300" rx="330" ry="190" fill={`url(#${glow})`} />
          <path d="M-40 560 L330 300 L470 300 L840 560Z" fill="#2f4a3a" fillOpacity="0.55" />
          {[0, 1, 2, 3, 4, 5].map((lane) => {
            const bottom = -40 + lane * 176;
            return (
              <line
                key={lane}
                x1={330}
                y1={300}
                x2={bottom + 80}
                y2={560}
                stroke={gold}
                strokeOpacity="0.45"
                strokeWidth="1.4"
              />
            );
          })}
          <line x1="120" y1="300" x2="690" y2="300" stroke={bone} strokeOpacity="0.35" strokeWidth="2" />
          <g stroke={bone} strokeOpacity="0.16" strokeWidth="1">
            <line x1="80" y1="330" x2="730" y2="330" />
            <line x1="120" y1="372" x2="700" y2="372" />
            <line x1="160" y1="424" x2="660" y2="424" />
          </g>
          <rect x="330" y="150" width="140" height="150" fill="none" stroke={gold} strokeOpacity="0.35" />
        </g>
      );

    case 'highjump':
      return (
        <g>
          <ellipse cx="470" cy="250" rx="290" ry="170" fill={`url(#${glow})`} />
          <path d="M150 470 Q320 120 560 250" fill="none" stroke={gold} strokeWidth="2" strokeDasharray="7 9" />
          <line x1="360" y1="300" x2="620" y2="300" stroke={bone} strokeWidth="4" />
          <line x1="376" y1="250" x2="376" y2="380" stroke={bone} strokeOpacity="0.7" strokeWidth="4" />
          <line x1="604" y1="250" x2="604" y2="380" stroke={bone} strokeOpacity="0.7" strokeWidth="4" />
          <rect x="472" y="196" width="34" height="96" rx="17" fill={bone} fillOpacity="0.86" transform="rotate(24 489 244)" />
          <circle cx="500" cy="188" r="13" fill={bone} fillOpacity="0.86" />
          <line x1="60" y1="470" x2="740" y2="470" stroke={gold} strokeOpacity="0.3" />
          <path d="M60 470h120M200 470h60" stroke={bone} strokeOpacity="0.18" strokeWidth="3" />
        </g>
      );

    case 'runner':
      return (
        <g>
          <ellipse cx="380" cy="290" rx="300" ry="180" fill={`url(#${glow})`} />
          {[110, 168, 232, 300, 356].map((y, index) => (
            <rect
              key={y}
              x={90 + index * 26}
              y={y}
              width={420 - index * 46}
              height="3"
              fill={gold}
              opacity={0.12 + index * 0.07}
            />
          ))}
          <g transform="translate(300 150)">
            <circle cx="150" cy="40" r="20" fill={bone} fillOpacity="0.9" />
            <path d="M146 70 L118 138" stroke={bone} strokeOpacity="0.9" strokeWidth="30" strokeLinecap="round" />
            <path d="M138 92 L188 118 L206 158" stroke={bone} strokeOpacity="0.85" strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M136 96 L86 84 L58 112" stroke={bone} strokeOpacity="0.6" strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M118 138 L164 190 L150 236" stroke={bone} strokeOpacity="0.85" strokeWidth="22" strokeLinecap="round" fill="none" />
            <path d="M118 138 L86 198 L44 216" stroke={bone} strokeOpacity="0.6" strokeWidth="22" strokeLinecap="round" fill="none" />
          </g>
        </g>
      );

    case 'stands':
      return (
        <g>
          <ellipse cx="400" cy="250" rx="340" ry="180" fill={`url(#${glow})`} />
          {[0, 1, 2, 3, 4].map((ring) => (
            <path
              key={ring}
              d={`M-60 ${430 - ring * 52} Q400 ${110 - ring * 26} 860 ${430 - ring * 52}`}
              fill="none"
              stroke={ring % 2 === 0 ? gold : bone}
              strokeOpacity={ring % 2 === 0 ? 0.4 : 0.14}
              strokeWidth="2"
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((seat) => (
            <circle key={seat} cx={140 + seat * 68} cy={330 - Math.abs(4 - seat) * 16} r="3" fill={bone} fillOpacity="0.4" />
          ))}
          <path d="M-40 560 L300 400 L500 400 L840 560Z" fill="#2b4436" fillOpacity="0.6" />
        </g>
      );

    case 'drills':
      return (
        <g>
          <ellipse cx="400" cy="320" rx="320" ry="180" fill={`url(#${glow})`} />
          <path d="M-40 560 L340 300 L460 300 L840 560Z" fill="#2b4436" fillOpacity="0.5" />
          {[-3, -1.5, 0, 1.5, 3].map((offset, index) => {
            const x = 400 + offset * 95;
            const y = 360 + Math.abs(offset) * 26;
            const size = 16 + Math.abs(offset) * 5;
            return (
              <g key={index}>
                <path d={`M${x} ${y - size} L${x + size * 0.7} ${y + size * 0.5} L${x - size * 0.7} ${y + size * 0.5}Z`} fill={gold} fillOpacity="0.75" />
                <ellipse cx={x} cy={y + size * 0.62} rx={size * 0.8} ry={size * 0.16} fill="#050908" fillOpacity="0.4" />
              </g>
            );
          })}
          <path d="M120 470 Q260 400 400 430 T700 470" fill="none" stroke={bone} strokeOpacity="0.22" strokeWidth="2" strokeDasharray="10 10" />
        </g>
      );

    case 'banner':
      return (
        <g>
          <ellipse cx="400" cy="280" rx="320" ry="190" fill={`url(#${glow})`} />
          {[0, 1, 2, 3].map((panel) => (
            <g key={panel}>
              <path
                d={`M${130 + panel * 140} 140 L${250 + panel * 140} 180 L${250 + panel * 140} 430 L${130 + panel * 140} 400Z`}
                fill={panel % 2 === 0 ? '#334e3d' : '#263d30'}
                stroke={gold}
                strokeOpacity="0.28"
              />
              <line x1={140 + panel * 140} y1={230} x2={244 + panel * 140} y2={252} stroke={bone} strokeOpacity="0.2" />
            </g>
          ))}
          <path d="M120 470h560" stroke={bone} strokeOpacity="0.25" strokeWidth="2" />
        </g>
      );

    case 'hurdle':
      return (
        <g>
          <ellipse cx="400" cy="300" rx="300" ry="180" fill={`url(#${glow})`} />
          {[0, 1, 2, 3].map((hurdle) => {
            const scale = 1 - hurdle * 0.19;
            const x = 150 + hurdle * 135;
            const y = 430 - hurdle * 52;
            return (
              <g key={hurdle} opacity={1 - hurdle * 0.16}>
                <line x1={x} y1={y} x2={x} y2={y - 150 * scale} stroke={bone} strokeWidth={3.2} />
                <line x1={x + 120 * scale} y1={y} x2={x + 120 * scale} y2={y - 150 * scale} stroke={bone} strokeWidth={3.2} />
                <rect x={x - 6} y={y - 112 * scale} width={132 * scale} height={13 * scale} fill={gold} fillOpacity="0.8" />
              </g>
            );
          })}
          <line x1="40" y1="470" x2="760" y2="470" stroke={gold} strokeOpacity="0.28" />
        </g>
      );

    case 'nightrun':
      return (
        <g>
          <rect width="800" height="560" fill="#0b1411" />
          <path d="M60 0 L300 560 L-80 560Z" fill={`url(#${glow})`} opacity="0.9" />
          <path d="M740 0 L500 560 L880 560Z" fill={`url(#${glow})`} opacity="0.75" />
          <g stroke={gold} strokeOpacity="0.5" strokeWidth="1.4">
            <line x1="400" y1="250" x2="180" y2="560" />
            <line x1="400" y1="250" x2="330" y2="560" />
            <line x1="400" y1="250" x2="470" y2="560" />
            <line x1="400" y1="250" x2="620" y2="560" />
          </g>
          <line x1="240" y1="250" x2="560" y2="250" stroke={bone} strokeOpacity="0.3" strokeWidth="2" />
          <g fill={bone} fillOpacity="0.7">
            <rect x="86" y="70" width="6" height="34" />
            <rect x="700" y="70" width="6" height="34" />
          </g>
        </g>
      );

    case 'relay':
      return (
        <g>
          <ellipse cx="400" cy="280" rx="320" ry="190" fill={`url(#${glow})`} />
          <ellipse cx="400" cy="300" rx="240" ry="130" fill="none" stroke={gold} strokeOpacity="0.35" strokeWidth="2" />
          <ellipse cx="400" cy="300" rx="180" ry="95" fill="none" stroke={bone} strokeOpacity="0.18" strokeWidth="2" />
          <ellipse cx="400" cy="300" rx="120" ry="62" fill="none" stroke={bone} strokeOpacity="0.12" strokeWidth="2" />
          <rect x="352" y="262" width="96" height="26" rx="13" fill={gold} fillOpacity="0.9" transform="rotate(-18 400 275)" />
          {[0, 1, 2, 3].map((dot) => (
            <circle key={dot} cx={400 + Math.cos((dot * Math.PI) / 2) * 240} cy={300 + Math.sin((dot * Math.PI) / 2) * 130} r="4" fill={bone} fillOpacity="0.6" />
          ))}
          <path d="M120 470h200M420 470h260" stroke={bone} strokeOpacity="0.2" strokeWidth="3" />
        </g>
      );
  }
}

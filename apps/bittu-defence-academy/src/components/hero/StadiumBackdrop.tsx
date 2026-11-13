import { useId } from 'react';
import { cn } from '../../lib/cn';

/**
 * Static hero backdrop: floodlit stadium, banked stands and a track running to
 * the horizon. Drawn as SVG so the first delivery ships without heavy media or
 * asset licensing issues.
 */
export default function StadiumBackdrop({ className }: { className?: string }) {
  const raw = useId();
  const uid = raw.replace(/[^a-zA-Z0-9]/g, '');
  const sky = `sky-${uid}`;
  const glow = `glow-${uid}`;
  const track = `track-${uid}`;
  const vignette = `vig-${uid}`;

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1210" />
          <stop offset="42%" stopColor="#16241d" />
          <stop offset="70%" stopColor="#1f3327" />
          <stop offset="100%" stopColor="#0d1713" />
        </linearGradient>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e0c890" stopOpacity="0.42" />
          <stop offset="45%" stopColor="#c6a45a" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#c6a45a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={track} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e4a3a" />
          <stop offset="100%" stopColor="#16241d" />
        </linearGradient>
        <radialGradient id={vignette} cx="50%" cy="42%" r="70%">
          <stop offset="55%" stopColor="#050908" stopOpacity="0" />
          <stop offset="100%" stopColor="#050908" stopOpacity="0.85" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill={`url(#${sky})`} />

      {/* floodlight bloom */}
      <ellipse cx="1180" cy="300" rx="520" ry="360" fill={`url(#${glow})`} />
      <ellipse cx="360" cy="360" rx="420" ry="300" fill={`url(#${glow})`} opacity="0.55" />

      {/* distant stand bowl */}
      <g fill="#132019" opacity="0.9">
        <path d="M-40 520 Q800 330 1640 520 L1640 640 L-40 640Z" />
      </g>
      <g stroke="#c6a45a" strokeOpacity="0.2" fill="none" strokeWidth="1.6">
        <path d="M-40 500 Q800 312 1640 500" />
        <path d="M-40 532 Q800 346 1640 532" />
        <path d="M-40 566 Q800 382 1640 566" />
        <path d="M-40 604 Q800 424 1640 604" />
      </g>
      <g fill="#dfe4dd" fillOpacity="0.16">
        {Array.from({ length: 26 }, (_, index) => (
          <circle key={index} cx={60 + index * 62} cy={470 - Math.abs(13 - index) * 5} r="2.4" />
        ))}
      </g>

      {/* far touchline + track */}
      <path d="M-40 640 L1640 640 L1640 900 L-40 900Z" fill={`url(#${track})`} />
      <line x1="-40" y1="640" x2="1640" y2="640" stroke="#f2f0e8" strokeOpacity="0.32" strokeWidth="3" />

      {/* lane lines in perspective toward a vanishing point */}
      <g stroke="#f2f0e8" strokeOpacity="0.22" strokeWidth="2">
        <line x1="820" y1="640" x2="470" y2="900" />
        <line x1="820" y1="640" x2="640" y2="900" />
        <line x1="820" y1="640" x2="810" y2="900" />
        <line x1="820" y1="640" x2="980" y2="900" />
        <line x1="820" y1="640" x2="1150" y2="900" />
        <line x1="820" y1="640" x2="1320" y2="900" />
      </g>
      <g stroke="#c6a45a" strokeOpacity="0.3" strokeWidth="1.5">
        <line x1="120" y1="690" x2="1480" y2="690" />
        <line x1="60" y1="762" x2="1540" y2="762" />
        <line x1="-20" y1="852" x2="1620" y2="852" />
      </g>

      {/* floodlight pylons */}
      {[
        { x: 250, y: 120, scale: 1 },
        { x: 1290, y: 96, scale: 0.86 },
      ].map((pylon) => (
        <g key={pylon.x} transform={`translate(${pylon.x} ${pylon.y}) scale(${pylon.scale})`}>
          <rect x="-4" y="0" width="8" height="330" fill="#0b1411" />
          <rect x="-58" y="-30" width="116" height="34" fill="#0b1411" />
          <g fill="#f4e7c2">
            {Array.from({ length: 8 }, (_, index) => (
              <rect key={index} x={-50 + index * 13} y="-24" width="7" height="9" rx="1" opacity="0.9" />
            ))}
          </g>
          <path d="M-56 6 L-300 640 L300 640 L56 6Z" fill={`url(#${glow})`} opacity="0.5" />
        </g>
      ))}

      {/* atmospheric haze */}
      <rect width="1600" height="900" fill={`url(#${vignette})`} />
    </svg>
  );
}

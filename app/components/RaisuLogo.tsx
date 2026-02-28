import { useId } from "react";

interface RaisuLogoProps {
  /** Icon size in px */
  iconSize?: number;
  /** Whether to render the "Raisu" wordmark next to the icon */
  wordmark?: boolean;
  className?: string;
}

/**
 * Raisu brand mark.
 * Mark: violet→indigo rounded square, camera-viewfinder corner brackets,
 * miniature sparkline in the centre — "monitoring snapshot".
 */
export function RaisuLogo({ iconSize = 28, wordmark = true, className }: RaisuLogoProps) {
  const uid = useId().replace(/[^a-z0-9]/gi, "");
  const gid = `rlg${uid}`;

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <svg
        viewBox="0 0 36 36"
        width={iconSize}
        height={iconSize}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Raisu"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="36" height="36" rx="8.5" fill={`url(#${gid})`} />

        {/* Subtle inner glow */}
        <rect width="36" height="36" rx="8.5" fill="white" fillOpacity="0.05" />

        {/* Corner bracket — top-left */}
        <path d="M7 12 L7 7 L12 7"
          stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
        {/* Corner bracket — top-right */}
        <path d="M29 12 L29 7 L24 7"
          stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
        {/* Corner bracket — bottom-left */}
        <path d="M7 24 L7 29 L12 29"
          stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
        {/* Corner bracket — bottom-right */}
        <path d="M29 24 L29 29 L24 29"
          stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />

        {/* Mini sparkline data wave */}
        <polyline
          points="10,22 13,16.5 16.5,20 20,13.5 23.5,18 26,22"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.88"
        />
        {/* End dot */}
        <circle cx="26" cy="22" r="1.8" fill="white" fillOpacity="0.88" />
      </svg>

      {wordmark && (
        <span className="font-bold tracking-tight text-white" style={{ fontSize: iconSize * 0.5 }}>
          Raisu
        </span>
      )}
    </div>
  );
}

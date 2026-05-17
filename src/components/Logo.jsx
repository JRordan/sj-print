// Used in both the nav and the footer.
// In the original HTML this SVG was duplicated verbatim in two places.

export default function Logo({ tagline = 'Print', clipId = 'logoOverlap' }) {
  return (
    <div className="logo">
      <svg
        className="logo-mark"
        viewBox="0 0 56 34"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId}>
            <circle cx="36" cy="17" r="15" />
          </clipPath>
        </defs>
        <circle cx="20" cy="17" r="15" fill="#0E0C0A" />
        <circle cx="36" cy="17" r="15" fill="#D62828" />
        <g clipPath={`url(#${clipId})`}>
          <circle cx="20" cy="17" r="15" fill="#5A1414" />
        </g>
        <text
          x="20"
          y="23"
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontSize="17"
          fontWeight="500"
          fontStyle="italic"
          fill="#FAF7F1"
        >
          S
        </text>
        <text
          x="36"
          y="23"
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontSize="17"
          fontWeight="500"
          fontStyle="italic"
          fill="#FAF7F1"
        >
          J
        </text>
      </svg>
      <span className="logo-text-wrap">
        <span className="logo-eyebrow">SAN JOSE</span>
        <span>{tagline}</span>
      </span>
    </div>
  );
}

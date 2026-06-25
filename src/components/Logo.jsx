// Apex summit mark — reused in the nav, footer and auth screens.
export default function Logo({ size = 30, light = false }) {
  const ink = light ? '#f3eee2' : '#13182b'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill={ink} />
        <path d="M16 6 L26 25 L19.5 25 L16 17.5 L12.5 25 L6 25 Z" fill="#f0a93b" />
        <path d="M16 6 L19.5 13 L16 13 L12.5 13 Z" fill="#fff" opacity="0.85" />
      </svg>
      <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: size * 0.62, color: light ? '#f3eee2' : 'var(--ink)', letterSpacing: '-0.02em' }}>
        Apex Academy
      </span>
    </span>
  )
}

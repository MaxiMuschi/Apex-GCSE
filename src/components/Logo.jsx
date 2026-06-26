// Apex summit mark — sourced from /public/apex-logo.svg so the nav, footer and
// auth screens all share one brand asset. `light` flips the wordmark colour for
// use on dark (navy / graphite) surfaces.
export default function Logo({ size = 30, light = false }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <img
        src="/apex-logo.svg"
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
        style={{ display: 'block', borderRadius: size * 0.25 }}
      />
      <span
        style={{
          fontFamily: 'var(--display)',
          fontWeight: 700,
          fontSize: size * 0.62,
          color: light ? '#f3eee2' : 'var(--ink)',
          letterSpacing: '-0.02em',
        }}
      >
        Apex Academy
      </span>
    </span>
  )
}

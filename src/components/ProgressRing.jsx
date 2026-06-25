// A compact SVG progress ring used on cards and dashboards.
export default function ProgressRing({ value = 0, size = 52, stroke = 5, color = 'var(--amber)' }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16,1,0.3,1)' }}
      />
      <text
        x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        fontSize={size * 0.27} fontWeight="700" fill="var(--ink)" fontFamily="var(--mono)"
      >
        {Math.round(value)}
      </text>
    </svg>
  )
}

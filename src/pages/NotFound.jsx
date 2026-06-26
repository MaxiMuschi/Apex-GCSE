import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="wrap section center" style={{ minHeight: '55vh', display: 'grid', placeItems: 'center' }}>
      <div>
        <span className="eyebrow">404</span>
        <h1 className="display-xxl" style={{ margin: '0.2em 0' }}>Off the trail.</h1>
        <p className="muted" style={{ marginBottom: '1.5rem' }}>That page isn’t part of the climb. Let’s get you back on route.</p>
        <Link to="/" className="btn btn-primary">Back to base camp</Link>
      </div>
    </div>
  )
}

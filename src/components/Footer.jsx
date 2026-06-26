import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Logo size={28} light />
          <p className="muted-on-ink">
            GCSE self-study for AQA specifications, built for Kenyan students.
            Part of the Apex Academy family — KS3 lives at apexacademy.co.ke.
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <h5>Learn</h5>
            <Link to="/subjects">Subjects</Link>
            <Link to="/subjects/maths">Mathematics</Link>
            <Link to="/pricing">Pricing</Link>
          </div>
          <div>
            <h5>Account</h5>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Create account</Link>
            <Link to="/parent">Parents</Link>
          </div>
          <div>
            <h5>Apex</h5>
            <a href="https://apexacademy.co.ke" target="_blank" rel="noreferrer">KS3 platform</a>
            <span className="muted-on-ink small">Nairobi, Kenya</span>
          </div>
        </div>
      </div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} Apex Academy</span>
        <span>AQA is the awarding body; Apex Academy is an independent study platform.</span>
      </div>
    </footer>
  )
}

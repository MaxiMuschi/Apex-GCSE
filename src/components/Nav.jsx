import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import Logo from './Logo.jsx'

export default function Nav() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)
  const doLogout = () => { logout(); close(); navigate('/') }

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link to="/" onClick={close} className="nav-brand" aria-label="Apex Academy home">
          <Logo size={30} />
          <span className="nav-gcse">GCSE</span>
        </Link>

        <button className="nav-burger" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/subjects" onClick={close} className={({ isActive }) => isActive ? 'active' : ''}>Subjects</NavLink>
          <NavLink to="/pricing" onClick={close} className={({ isActive }) => isActive ? 'active' : ''}>Pricing</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" onClick={close} className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
              {user.role === 'parent' && (
                <NavLink to="/parent" onClick={close} className={({ isActive }) => isActive ? 'active' : ''}>Parent view</NavLink>
              )}
              <button className="btn btn-ghost nav-cta" onClick={doLogout}>Sign out</button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={close} className={({ isActive }) => isActive ? 'active' : ''}>Log in</NavLink>
              <Link to="/signup" onClick={close} className="btn btn-primary nav-cta">Get started</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

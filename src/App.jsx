import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Subjects from './pages/Subjects.jsx'
import SubjectView from './pages/SubjectView.jsx'
import LessonView from './pages/LessonView.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ParentDashboard from './pages/ParentDashboard.jsx'
import Pricing from './pages/Pricing.jsx'
import NotFound from './pages/NotFound.jsx'
import './app.css'

// Reset scroll position on every route change.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <ScrollToTop />
      <Nav />
      <main className="app-main">
        <Routes>
          {/* /gcse and / both serve the GCSE landing page */}
          <Route path="/" element={<Landing />} />
          <Route path="/gcse" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:slug" element={<SubjectView />} />
          <Route
            path="/subjects/:slug/:lessonId"
            element={<ProtectedRoute><LessonView /></ProtectedRoute>}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/parent"
            element={<ProtectedRoute><ParentDashboard /></ProtectedRoute>}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

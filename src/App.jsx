import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Feed from './Feed'
import Profile from './profile'
import Suggestions from './Suggestions'
import Sidebar from './Sidebar'
import { Login, Signup } from './Login'

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('insta_user')
  return user ? children : <Navigate to="/login" />
}

function App() {
  const location = useLocation()
  const isProfile = location.pathname === '/profile'
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div className="d-flex vh-100">
      {!isAuthPage && !isProfile && <div className="w-20"><Sidebar /></div>}
      <div className={isAuthPage || isProfile ? 'w-100' : 'w-50'}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </div>
      {!isAuthPage && !isProfile && <div className="w-30"><Suggestions /></div>}
    </div>
  )
}

export default App
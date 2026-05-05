import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

// ─── Dummy user database ──────────────────────────
const USERS = [
  { username: 'suren_02', password: 'suren123', name: 'Suren' },
]

// ─── LOGIN PAGE ───────────────────────────────────
export function Login() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setCredentials((c) => ({ ...c, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate network delay
    setTimeout(() => {
      const user = USERS.find(
        (u) =>
          (u.username === credentials.username || u.name.toLowerCase() === credentials.username.toLowerCase()) &&
          u.password === credentials.password
      )

      if (user) {
        localStorage.setItem('insta_user', JSON.stringify(user))
        navigate('/')
      } else {
        setError('Sorry, your password was incorrect. Please double-check your password.')
      }
      setLoading(false)
    }, 800)
  }

  const isDisabled = !credentials.username || !credentials.password || loading

  return (
    <div className="loginPage">
      <div className="loginCard">
        {/* Logo */}
        <div className="loginLogo">Instagram</div>

        {/* Form */}
        <form className="loginForm" onSubmit={handleLogin}>
          <input
            className="loginInput"
            type="text"
            name="username"
            placeholder="Phone number, username, or email"
            value={credentials.username}
            onChange={handleChange}
            autoComplete="username"
          />

          <div className="passwordWrap">
            <input
              className="loginInput"
              type={showPass ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {credentials.password && (
              <button type="button" className="showHideBtn" onClick={() => setShowPass((s) => !s)}>
                {showPass ? 'Hide' : 'Show'}
              </button>
            )}
          </div>

          {error && <p className="errorMsg">{error}</p>}

          <button className="loginBtn" type="submit" disabled={isDisabled}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {/* OR divider */}
        <div className="orDivider">
          <div className="orLine" />
          <span className="orText">OR</span>
          <div className="orLine" />
        </div>

        {/* Facebook */}
        <button className="facebookBtn">
          <div className="fbIcon">f</div>
          Log in with Facebook
        </button>

        {/* Forgot password */}
        <a className="forgotLink" href="#">Forgot password?</a>
      </div>

      {/* Sign up */}
      <div className="signupCard">
        Don't have an account?{' '}
        <span onClick={() => navigate('/signup')}>Sign up</span>
      </div>

      App download
      <div className="appDownload">
        <p>Get the app.</p>
        <div className="appBadges">
          <div className="appBadge">▶ Google Play</div>
          <div className="appBadge"> Microsoft Store</div>
        </div>
      </div>

      {/* Footer */}
      <div className="loginFooter">
        {['Meta','About','Blog','Jobs','Help','API','Privacy','Terms','Locations','Instagram Lite','Threads','Contact uploading','Meta Verified'].map((item) => (
          <a key={item} href="#">{item}</a>
        ))}
        <p>© 2026 Instagram from Meta</p>
      </div>
    </div>
  )
}

// ─── SIGNUP PAGE ──────────────────────────────────
export function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', fullname: '', username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSignup = (e) => {
    e.preventDefault()
    if (!form.email || !form.fullname || !form.username || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      // Save new user
      const newUser = { username: form.username, password: form.password, name: form.fullname }
      const allUsers = JSON.parse(localStorage.getItem('insta_users') || '[]')
      allUsers.push(newUser)
      localStorage.setItem('insta_users', JSON.stringify(allUsers))
      localStorage.setItem('insta_user', JSON.stringify(newUser))
      navigate('/')
      setLoading(false)
    }, 800)
  }

  const isDisabled = !form.email || !form.fullname || !form.username || !form.password || loading

  return (
    <div className="signupPage">
      <div className="signupCard2">
        <div className="loginLogo">Instagram</div>
        <p className="signupTagline">Sign up to see photos and videos from your friends.</p>

        {/* Facebook */}
        <button className="signupBtn" style={{ background: '#385185' }}>
          <span style={{ marginRight: 6 }}>f</span> Log in with Facebook
        </button>

        <div className="orDivider" style={{ margin: '4px 0' }}>
          <div className="orLine" />
          <span className="orText">OR</span>
          <div className="orLine" />
        </div>

        <form className="loginForm" onSubmit={handleSignup}>
          <input
            className="loginInput"
            type="text"
            name="email"
            placeholder="Mobile number or email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="loginInput"
            type="text"
            name="fullname"
            placeholder="Full name"
            value={form.fullname}
            onChange={handleChange}
          />
          <input
            className="loginInput"
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          <input
            className="loginInput"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          {error && <p className="errorMsg">{error}</p>}

          <p className="dividerText" style={{ fontSize: 11, color: '#8e8e8e', textAlign: 'center' }}>
            People who use our service may have uploaded your contact information to Instagram.{' '}
            <a href="#" style={{ color: '#00376b' }}>Learn more</a>
          </p>
          <p className="dividerText" style={{ fontSize: 11, color: '#8e8e8e', textAlign: 'center' }}>
            By signing up, you agree to our{' '}
            <a href="#" style={{ color: '#00376b' }}>Terms</a>,{' '}
            <a href="#" style={{ color: '#00376b' }}>Privacy Policy</a> and{' '}
            <a href="#" style={{ color: '#00376b' }}>Cookies Policy</a>.
          </p>

          <button className="signupBtn" type="submit" disabled={isDisabled}>
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </div>

      <div className="alreadyHave">
        Have an account? <span onClick={() => navigate('/login')}>Log in</span>
      </div>
    </div>
  )
}

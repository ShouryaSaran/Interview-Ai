import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import '../styles/auth.register.scss'

function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate('/dashboard')
  }

  if (loading) {
    return (
      <main className="loading-state">
        <h1>Loading.......</h1>
      </main>
    )
  }

  return (
    <div className="Register-Page">
      <header className="register-header">
        <Link to="/login" className="register-back">
          ←
        </Link>
        <h1 className="register-title">Create Account</h1>
      </header>

      <main className="register-content">
        <section className="register-hero">
          <div className="register-hero__overlay" />
          <div className="register-hero__copy">
            <div className="register-hero__icon">🎓</div>
            <h2 className="register-hero__heading">Elevate Your Career Preparation</h2>
            <p className="register-hero__text">
              Join thousands of professionals mastering their interview skills.
            </p>
          </div>
        </section>

        <section className="register-form">
          <form onSubmit={handleSubmit}>
            <label className="field">
              <span className="field__label">Full Name</span>
              <input
                className="field__input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Name"
                required
              />
            </label>

            <label className="field">
              <span className="field__label">Email Address</span>
              <input
                className="field__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
              />
            </label>

            <label className="field">
              <span className="field__label">Password</span>
              <input
                className="field__input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            <button type="submit" className="primary-button">
              Create account
            </button>

            <div className="divider" aria-hidden="true">
              <span>OR CONTINUE WITH</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="social-button">
                <span className="social-button__icon">G</span>
                Google
              </button>
              <button type="button" className="social-button">
                <span className="social-button__icon"></span>
                Apple
              </button>
            </div>

            <p className="login-link">
              Already have an account?{' '}
              <Link to="/login" className="login-link__anchor">
                Log in
              </Link>
            </p>

            <p className="legal">
              By creating an account, you agree to InterPrep's{' '}
              <Link to="#" className="legal__link">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="#" className="legal__link">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Register


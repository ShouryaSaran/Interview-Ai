import React, { useState } from 'react'
import "../styles/auth.login.scss"
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Rocket_launch from "../../../assets/rocket_launch.svg"

function Login() {
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({ email, password })
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
    <div className="Login-Page">
      <header className="login-header">
        <div className="login-header__brand">
          <div className="login-brand__icon">
            <img className="rocket-image" src={Rocket_launch} alt="InterPrep logo" />
          </div>
          <span className="login-brand__name">InterPrep</span>
        </div>
      </header>

      <main className="login-content">
        <section className="login-hero">
          <div className="login-hero__overlay" />
          <div className="login-hero__copy">
            <div className="login-hero__icon">🔒</div>
            <h2 className="login-hero__heading">Welcome back</h2>
            <p className="login-hero__text">
              Enter your credentials to access your preparation dashboard.
            </p>
          </div>
        </section>

        <section className="login-form">
          <div className="login-form__card">
            <form onSubmit={handleSubmit}>
              <label className="field">
                <span className="field__label">Email address</span>
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
                <div className="field__label-row">
                  <span>Password</span>
                  <Link to="#" className="field__link">
                    Forgot password?
                  </Link>
                </div>
                <input
                  className="field__input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </label>

              <label className="checkbox-field">
                <input
                  className="checkbox-field__input"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Remember me for 30 days</span>
              </label>

              <button className="primary-button" type="submit">
                Sign in to InterPrep
              </button>

              <p className="login-footer">
                Don&apos;t have an account yet?{' '}
                <Link to="/register" className="login-footer__link">
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Login


import { useState } from "react";
import "../styles/Home.scss";
import Rocket_launch from "../../../assets/rocket_launch.svg"
import auto_awesome from "../../../assets/auto_awesome.svg"
import check_circle from "../../../assets/check_circle.svg"
import InterviewImg from "../../../assets/interview.jpg"
import psychology from "../../../assets/psychology.svg"
import quiz from "../../../assets/quiz.svg"
import analytics from "../../../assets/analytics.svg"
import generate from "../../../assets/generate.svg"
import { Link } from "react-router";



function Home() {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="Home-Page">
      {/* Top Navigation Bar */}
      <header className="navbar">
        <div className="navbar__inner">
          <div className="navbar__logo">
            <div className="navbar__logo-icon">
              <span className="material-symbols-outlined"><img className='rocket-image' src={Rocket_launch} alt="" /></span>
            </div>
            <h1 className="navbar__title">InterPrep</h1>
          </div>
          <nav className="navbar__links">
            <a href="#">Practice</a>
            <a href="#">Analysis</a>
            <a href="#">Reports</a>
          </nav>
          <div className="navbar__auth">
            <Link to={'/login'} className="btn btn--ghost">Log In</Link>
            <Link to={'/register'} className="btn btn--primary">Sign Up</Link>
          </div>
        </div>
      </header>

      <main className="main">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero__content">
            <div className="hero__badge">
              <span className="material-symbols-outlined"><img src={auto_awesome} alt="" /></span>
              AI-Powered Interview Coach
            </div>
            <h1 className="hero__title">
              Ace Your Next <span className="hero__title--accent">Interview</span>
            </h1>
            <p className="hero__subtitle">
              Master your performance with AI-driven insights and personalized
              practice tools designed for modern professionals.
            </p>
            <div className="hero__actions">
              <button className="btn btn--primary btn--lg">Get Started</button>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__video-box">
              <span className="material-symbols-outlined hero__video-icon"><img className="interview-img" src={InterviewImg} alt="" /></span>
            </div>
            <div className="hero__stat-card">
              <div className="hero__stat-icon">
                <span className="material-symbols-outlined"><img className="check_circle" src={check_circle} alt="" /></span>
              </div>
              <div>
                <div className="hero__stat-title">Performance Up</div>
                <p className="hero__stat-desc">
                  Your confidence score increased by 24% after 3 sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="features">
          <div className="feature-card">
            <div className="feature-card__icon">
              <span className="psychology-container material-symbols-outlined"><img className='psychology-img' src={psychology} alt="" /></span>
            </div>
            <h3>AI Analysis</h3>
            <p>Get real-time feedback on your speech patterns, tone, and body language during mock interviews.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">
              <span className="quiz-conatiner material-symbols-outlined"><img className='quiz' src={quiz} alt="" /></span>
            </div>
            <h3>Practice Tools</h3>
            <p>Access a library of 10,000+ industry-specific questions with AI-generated ideal answers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">
              <span className="analytics-container material-symbols-outlined"><img className="analytics" src={analytics} alt="" /></span>
            </div>
            <h3>Detailed Reports</h3>
            <p>Comprehensive post-interview breakdowns highlighting your strengths and areas for improvement.</p>
          </div>
        </section>

        {/* Preparation Details Form */}
        <section className="prep-section">
          <div className="prep-section__header">
            <h2>Preparation Details</h2>
            <p>Fill in the details below to customize your AI interview simulation.</p>
          </div>
          <div className="prep-form">
            <div className="prep-form__left">
              <div className="form-group">
                <label className="form-label">Job Description</label>
                <textarea
                  className="form-textarea"
                  placeholder="Paste the job requirements, responsibilities, and key skills here..."
                  rows="6"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Self Description</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Describe your current role and key achievements..."
                />
              </div>
            </div>

            <div className="prep-form__right">
              <div className="form-group">
                <label className="form-label">Resume Upload</label>
                <div className="drop-zone">
                  <input
                    type="file"
                    className="drop-zone__input"
                    onChange={handleFileChange}
                  />
                  <span className="material-symbols-outlined drop-zone__icon">upload_file</span>
                  <p className="drop-zone__title">
                    {fileName ? fileName : "Click or drag your resume here"}
                  </p>
                  <p className="drop-zone__hint">PDF, DOCX up to 10MB</p>
                </div>
              </div>
              <div className="prep-form__submit">
                <button className="btn btn--generate">
                  <span className="generate-container material-symbols-outlined"><img className="generate" src={generate} alt="" /></span>
                  Generate Mock Interview
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <span className="rocket-container material-symbols-outlined"><img className='rocket' src={Rocket_launch} alt="" /></span>
              </div>
              <h3>InterPrep</h3>
            </div>
            <p>The modern standard for career preparation and professional growth.</p>
          </div>
          <div className="footer__col">
            <h4>Platform</h4>
            <ul>
              <li>Practice Mode</li>
              <li>AI Coach</li>
              <li>Question Bank</li>
              <li>Integrations</li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2024 InterPrep AI. All rights reserved.</p>
          <div className="footer__bottom-links">
            Twitter
            LinkedIn
            Discord
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
import React, { useRef, useState } from "react";
import "../styles/dashboard.scss";
import { useAuth } from "../../auth/hooks/useAuth.js";
import ViewReport from "../components/ViewReport.jsx";

export default function Dashboard() {
  const [resumeFile, setResumeFile] = useState(null);
  const resumeInputRef = useRef(null);
  const [active, setActive] = useState('dashboard');
  const [reports, setReports] = useState([]);
  const Auth = useAuth();
  const [viewReport, setViewReport] = useState(null);

  const handleViewReport = (report) => {
    if (!report) return;
    setViewReport(report);
    setActive('viewReport');
  };
  const getInitials = (name) => {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
}
  const fetchReports = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/interview/reports",
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json()
      setReports(data.reports || [])
      console.log(reports);
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  const handleBrowseFilesClick = () => {
    resumeInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="dashboard-root">
      <aside className="sidebar-left">
        <div className="sidebar-left__inner">
          <div className="sidebar-left__brand">
            <div className="brand-icon">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div>
              <h1 className="brand-title">InterPrep</h1>
              <p className="brand-subtitle">Interview Intelligence</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div
              className={`nav-link ${active === "dashboard" ? "nav-link--active" : ""}`}
              onClick={() => setActive("dashboard")}
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span>Dashboard</span>
            </div>
            <div
              className={`nav-link ${active === "Interview" ? "nav-link--active" : ""}`}
              onClick={() => {
                fetchReports();
                setActive("Interview");
              }}
            >
              <span className="material-symbols-outlined">calendar_today</span>
              <span>Interviews</span>
            </div>
            <div
              className={`nav-link ${active === "Resources" ? "nav-link--active" : ""}`}
              onClick={() => setActive("Resources")}
            >
              <span className="material-symbols-outlined">menu_book</span>
              <span>Resources</span>
            </div>
            <div
              className={`nav-link ${active === "Analytics" ? "nav-link--active" : ""}`}
              onClick={() => setActive("Analytics")}
            >
              <span className="material-symbols-outlined">analytics</span>
              <span>Analytics</span>
            </div>
          </nav>
        </div>
        <div className="bar"></div>
        <div className="sidebar-left__footer">
          <div className="upgrade-card">
            <p className="upgrade-card__title">Pro Plan</p>
            <p className="upgrade-card__desc">
              Unlimited mock interviews and deep analytics.
            </p>
            <button className="upgrade-card__btn">Upgrade Now</button>
          </div>
        </div>
      </aside>

      {active === "dashboard" && (
        <main className="main-content">
          <div className="main-scroll no-scrollbar">
            <header className="page-header">
              <h2 className="page-header__title">New Interview Setup</h2>
              <p className="page-header__subtitle">
                Complete the details below. Our AI will analyze your profile and
                the target role to generate a high-fidelity mock session
                tailored for you.
              </p>
            </header>

            <div className="steps-container">
              <section className="step-section">
                <div className="step-header">
                  <span className="step-badge">1</span>
                  <h3 className="step-title">Resume Upload</h3>
                </div>

                <div className="dropzone-wrapper">
                  <div
                    className="dropzone"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <div className="dropzone__icon-wrap">
                      <span className="material-symbols-outlined">
                        cloud_upload
                      </span>
                    </div>
                    <h4 className="dropzone__title">
                      Drag and drop your resume here
                    </h4>
                    <p className="dropzone__subtitle">
                      Supports PDF, DOCX (Max 3MB)
                    </p>
                    <button
                      type="button"
                      className="dropzone__btn"
                      onClick={handleBrowseFilesClick}
                    >
                      Browse Files
                    </button>
                    <input
                      ref={resumeInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    {resumeFile && (
                      <p style={{ marginTop: "8px", fontSize: "0.85rem" }}>
                        Selected: {resumeFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section className="step-section">
                <div className="step-header">
                  <span className="step-badge">2</span>
                  <h3 className="step-title">Job Description</h3>
                </div>

                <div className="input-card">
                  <p className="input-card__hint">
                    Paste the job posting details here to help the AI focus on
                    relevant technical skills and cultural alignment.
                  </p>
                  <textarea
                    className="input-textarea"
                    placeholder="e.g. Senior Software Engineer at TechCorp. Requirements include 5+ years experience with React, Node.js, and Distributed Systems..."
                    rows={8}
                  />
                </div>
              </section>

              <section className="step-section">
                <div className="step-header">
                  <span className="step-badge">3</span>
                  <h3 className="step-title">
                    Self-Description
                    <span className="step-title__optional">
                      (For best results it is recommended to give a self
                      description)
                    </span>
                  </h3>
                </div>

                <div className="input-card">
                  <p className="input-card__hint">
                    Provide any additional context like career shifts, specific
                    areas you want to practice, or unique achievements.
                  </p>
                  <textarea
                    className="input-textarea"
                    placeholder="Tell us more about yourself or specific focus areas..."
                    rows={5}
                  />
                </div>
              </section>

              <div className="cta-section">
                <button className="cta-btn">
                  <span>Generate Mock Interview</span>
                  <span className="material-symbols-outlined">
                    auto_awesome
                  </span>
                </button>
                <p className="cta-note">
                  Estimated generation time: 15-20 seconds
                </p>
              </div>
            </div>
          </div>

          <aside className="sidebar-right no-scrollbar">
            <div className="sidebar-right__sticky">
              <h3 className="sidebar-right__heading">
                <span className="material-symbols-outlined">lightbulb</span>
                Preparation Tips
              </h3>

              <div className="tips-list">
                <div className="tip-card">
                  <h4 className="tip-card__title">Detailed Resume</h4>
                  <p className="tip-card__body">
                    The more detail you provide in your resume, the better our
                    AI can craft behavior-based questions specific to your past
                    experience.
                  </p>
                </div>

                <div className="tip-card">
                  <h4 className="tip-card__title">Keywords Matter</h4>
                  <p className="tip-card__body">
                    Ensure the job description includes technical requirements.
                    Our AI extracts these to simulate real technical screenings.
                  </p>
                </div>

                <div className="tip-card tip-card--pro">
                  <div className="tip-card__pro-label">
                    <span className="material-symbols-outlined">stars</span>
                    <span>Pro Tip</span>
                  </div>
                  <p className="tip-card__body">
                    Record your session. We'll analyze your body language, pace,
                    and vocal tone to provide a complete performance score.
                  </p>
                </div>
                <div className="quote-block">
                  <img
                    className="quote-block__img"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvy_6vlMawMlVlVZCzN-fwSmMULsjuVsoYqvD7MdVlSv2lsQ8eVTqly9QXyhKXvtTxCT1GNQoTTKiGB0aJD9UOGDd7FeX_PUBDM_OlPx3b_Wy2m4jfehC7WCmPyQ3ngnwpgq3WPIQUDZkDH--Ee3Q2gqxtnQRneJW-1IIh5j7NAxoYrhtvtjUogcfkvQPjZxSTgbhmRlPuSunRL1scpGufmlsa8qMYBDO2MMihYnv2sTDCQsZrHABVoIiVD2Yrj9aINIOauIaCZdc"
                    alt="A professional person preparing for a video interview"
                  />
                  <div className="quote-block__caption">
                    "90% of candidates feel more confident after 3 mock
                    sessions."
                  </div>
                </div>
                <div className="community-card">
                  <h4 className="community-card__title">Join the Community</h4>
                  <p className="community-card__desc">
                    Connect with 10k+ other applicants preparing for top-tier
                    roles.
                  </p>

                  <div className="community-card__avatars">
                    <img
                      className="community-card__avatar"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpDpVTztjxWmI1JcMEhYiYZpBrA7tJsefryS7-sQvwZaFbq_NylaawfxxN3O0hUvAagCdyLFhCLqwN9LlSyytDmhDd6lMtntf6_XY6HsI8dvbKOReuUvz4hNY036JeEjQXU9kZzEpBj29KiejXNy_uidwTta6GEfGOBBy2Dw3v-bvumUJlsSeayBTL8SRXmpENSy-LwJoa740cQ-09rBqb7gtdImNAgxCo2J6DuUxH9FjlE_3ecCB-FoXIRcIa5qmburdf_tIjQ4g"
                      alt="User avatar 1"
                    />
                    <img
                      className="community-card__avatar"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhcVqu-lUcl0XZZS7kDfNzMSBYpUpMC-MxnxVIieg0vLzTx_RScqc-8nKwQHKRY1Z9QJ7lcWIoqLAfyGPDf_zLTti1ZMs1WiSRHcWUmh6Q4wWoXrROpA0QvVbUiu3LU9sdZJe06hhm5omRX-5rM7iCdPjomN6ziNVImJPfG-DLM_QPNuRwCAoOldAPmkVbEoRneoDCLo220v1ehssVDx_Bcgz6iOtB7QlC5SHoBd7U-xmosRt42m4DdLbrwQtIalYK0nRNpSFmst0"
                      alt="User avatar 2"
                    />
                    <img
                      className="community-card__avatar"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsCQyA9VwFmi330GRMuyt8E844DZCPKHyvUUpEUSDtSJYbhOmYAEskD9fb3ilIvt_tJuzQ4YtF8z5zU8CvS42ExMSd0JAaRodg8ausOzoUWZZONGMFO4baSrPaRLvkmbNd4cvy1Oh5mVjbPyFrjIfG-BH2Nqwv2lh1XtmTWTSYrj54HKiKBz7Zhndfu5Ggam8UOkrOMgUeD9EJEZB0dXK0Yefu3h_sZVmcpiUMcyEDfYrMXo1vngfqFQsNE4Y2f76g61L51iy80vE"
                      alt="User avatar 3"
                    />
                    <div className="community-card__avatar community-card__avatar--count">
                      +12
                    </div>
                  </div>

                  <button className="community-card__btn">Join Discord</button>
                </div>
              </div>
            </div>
          </aside>
        </main>
      )}

      {active === "Interview" && (
        <main className="main-content">
          <div className="interview-page">
          <div className="interview-header">
            <div className="interview-header__left">
              <div className="title-block">
                <span className="material-symbols-outlined">chevron_right</span>
                <div>
                  <h2>My Reports</h2>
                  <p>Comprehensive review of your AI-simulated interview performance.</p>
                </div>
              </div>
            </div>
            <div className="interview-header__right">
              <button className="icon-btn" aria-label="Notifications">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div className="user-chip">
                <div className="user-name">{Auth.user.username}</div>
                <div>
                  <span className="avatar">{getInitials(Auth.user.username)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="reports-toolbar">
            <div className="search-box">
              <span className="material-symbols-outlined">search</span>
              <input type="text" placeholder="Search reports..." />
            </div>
            <div className="toolbar-actions">
              <button className="btn-outline">
                <span className="material-symbols-outlined">download</span>
                Export CSV
              </button>
              <button className="btn-primary">
                <span className="material-symbols-outlined">add</span>
                New Interview
              </button>
            </div>
          </div>

          <section className="reports-table">
            <div className="reports-head-row">
              <span>Job Title</span>
              <span>Interview Date</span>
              <span>Match Score</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {reports.length === 0 ? (
              <div className="empty-row">No reports yet. Run a mock interview to generate your first report.</div>
            ) : (
              reports.map((report) => (
                <div key={report._id || report.id || Math.random()} className="reports-row">
                  <div className="job-cell">
                    <div className="job-title">{report.title || report.jobTitle || "Senior Frontend Engineer"}</div>
                    <div className="job-sub">{report.skills || report.jobSkills || "React, Node.js, CSS"}</div>
                  </div>
                  <div>{new Date(report.createdAt || report.date || Date.now()).toLocaleDateString()}</div>
                  <div>
                    <div className="score-pill">
                      <div className="score-track">
                        <div className="score-fill" style={{ width: `${report.matchScore || report.match || 82}%` }} />
                      </div>
                      <span className="score-text">{report.matchScore || report.match || 82}%</span>
                    </div>
                  </div>
                  <div>
                    <span className={`status-pill ${report.status?.toLowerCase() || "completed"}`}>
                      {report.status || "COMPLETED"}
                    </span>
                  </div>
                  <div>
                    <button className="link-btn" onClick={() => handleViewReport(report)}>View Report</button>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </main>
      )}

      {active === "viewReport" && viewReport && (
        <main className="main-content">
          <div className="main-scroll no-scrollbar">
            <ViewReport report={viewReport} onBack={() => setActive("Interview")} />
          </div>
        </main>
      )}
    </div>
  );
}

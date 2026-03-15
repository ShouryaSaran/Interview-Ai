import React from "react";
import "../styles/report.scss";

const severityConfig = {
  high: { color: "#dc2626", label: "CRITICAL" },
  medium: { color: "#f59e0b", label: "MODERATE" },
  low: { color: "#2563eb", label: "MINOR" },
};

function getSeverityStyles(severity) {
  const normalized = (severity || "low").toLowerCase();
  return severityConfig[normalized] || severityConfig.low;
}

function ScoreRing({ score }) {
  const normalizedScore = Math.max(0, Math.min(100, Number(score) || 0));
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - normalizedScore / 100);

  return (
    <div className="score-ring-wrap">
      <svg width="130" height="130" className="score-ring-svg">
        <circle
          className="ring-bg"
          cx="65"
          cy="65"
          r={radius}
          strokeWidth="10"
          fill="none"
        />
        <circle
          className="ring-progress"
          cx="65"
          cy="65"
          r={radius}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 65 65)"
        />
      </svg>
      <div className="ring-center">
        <div className="ring-score">{normalizedScore}%</div>
        <div className="ring-label">MATCH SCORE</div>
      </div>
    </div>
  );
}

export default function ViewReport({ report = {}, onBack }) {
   const {
    title,
    matchScore,
    jobDescription,
    skillGaps,
    technicalQuestions,
    behavioralQuestions,
    preparationPlan,
  } = report;

  const planDays = preparationPlan.length;
  const prepPlan = preparationPlan;

  return (
    <div className="full_report">
      <div className="full_report__header">
        <div className="full_report__header-left">
          <button className="back-btn" onClick={onBack} aria-label="Back to reports">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1>Interview Analysis</h1>
            <p>Comprehensive review of your AI-simulated interview performance.</p>
          </div>
        </div>
        <div className="full_report__header-right">
          <div className="search-inline">
            <span className="material-symbols-outlined">search</span>
            <input placeholder="Search reports..." type="text" />
          </div>
          <button className="icon-btn" aria-label="Notifications"><span className="material-symbols-outlined">notifications</span></button>
          <button className="btn btn-primary">Export PDF</button>
        </div>
      </div>

      <div className="hero-card">
        <div className="hero-score">
          <ScoreRing score={matchScore} />
        </div>
        <div className="hero-content">
          <h2>{title}</h2>
          <p>{jobDescription}</p>
          <p className="hero-trend">↗ +5% vs last week</p>
        </div>
      </div>

      <div className="skill-gap-section">
        <div className="section-title">
          <span className="material-symbols-outlined">warning</span>
          <h3>Skill Gaps & Severity</h3>
        </div>
        <div className="gap-grid">
          {skillGaps.map((gap, idx) => {
            const { color, label } = getSeverityStyles(gap.severity);
            return (
              <div key={`${gap.skill}-${idx}`} className="gap-card" style={{ borderLeftColor: color }}>
                <div className="gap-meta">
                  <span className="severity-pill" style={{ background: `${color}20`, color }}>{label}</span>
                  <span className="gap-icon material-symbols-outlined">stacked_line_chart</span>
                </div>
                <h4>{gap.skill}</h4>
                <p>{gap.summary || "Key strengths and recommendations to improve."}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="deep-dive-row">
        <div className="deep-dive-card">
          <div className="section-heading"><span className="material-symbols-outlined">code</span> Technical Deep Dive</div>
          {technicalQuestions.map((q, idx) => (
            <div key={`${q.question}-${idx}`} className="question-block">
              <div className="question-title">{q.question}</div>
              <div className="question-intention">{q.intention}</div>
              <div className="question-answer">{q.answer}</div>
            </div>
          ))}
        </div>
        <div className="deep-dive-card behavioral">
          <div className="section-heading"><span className="material-symbols-outlined">psychology</span> Behavioral Deep Dive</div>
          {behavioralQuestions.map((q, idx) => (
            <div key={`${q.question}-${idx}`} className="question-block">
              <div className="question-title">{q.question}</div>
              <div className="question-intention">{q.intention}</div>
              <div className="question-answer">{q.answer}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="prep-plan">
        <div className="prep-title">
          <span className="material-symbols-outlined">calendar_month</span>
          <h3>{planDays}-Day Preparation Plan</h3>
        </div>
        <div className="plan-grid">
          {prepPlan.map((dayItem, idx) => (
            <div key={`plan-${idx}`} className="plan-card">
              <div className="plan-day">Day {dayItem.day || idx + 1}</div>
              <div className="plan-focus">{dayItem.focus || "Practice Focus"}</div>
              <ul>
                {(dayItem.tasks || []).map((task, tIdx) => (
                  <li key={`${dayItem.day}-${tIdx}`}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
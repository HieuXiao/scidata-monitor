export function DashboardPage() {
  return (
    <section className="sdm-page sdm-page-dashboard">
      <header className="sdm-page-header">
        <h1>Dashboard</h1>
        <p>Live monitoring of research outputs, breakthroughs and hotspots.</p>
      </header>

      <div className="sdm-grid sdm-grid-3col">
        <div className="sdm-card sdm-list-card">
          <h3>Research Feed</h3>
          <ul className="sdm-simple-list">
            <li>
              <span>Foundation Models for Radiogenomics</span>
              <span className="sdm-tag">Nature Medicine</span>
            </li>
            <li>
              <span>Scaling Laws for Data-Centric AI</span>
              <span className="sdm-tag">arXiv</span>
            </li>
            <li>
              <span>GPT-5 Architecture Leak Reveals MoE at Scale</span>
              <span className="sdm-tag">The Information</span>
            </li>
          </ul>
        </div>

        <div className="sdm-card sdm-chart-card">
          <h3>Key Metrics</h3>
          <div className="sdm-chart-placeholder">Compact metrics chart</div>
        </div>

        <div className="sdm-card sdm-list-card">
          <h3>Trending Topics</h3>
          <ul className="sdm-simple-list">
            <li>
              <span>Radiogenomics Foundation Models</span>
              <span className="sdm-metric-trend-up">+34.5%</span>
            </li>
            <li>
              <span>Agentic AI Systems</span>
              <span className="sdm-metric-trend-up">+28.2%</span>
            </li>
            <li>
              <span>Spatial Transcriptomics</span>
              <span className="sdm-metric-trend-up">+156%</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}


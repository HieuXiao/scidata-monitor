export function OverviewPage() {
  return (
    <section className="sdm-page sdm-page-overview">
      <header className="sdm-page-header">
        <h1>Global Research Intelligence</h1>
        <p>
          Monitoring scientific activity across data science, radiogenomics, AI/ML,
          genomics and medical imaging worldwide.
        </p>
      </header>

      <div className="sdm-grid sdm-grid-overview">
        <div className="sdm-card sdm-metric-card">
          <h3>Papers Today</h3>
          <div className="sdm-metric-main">2,847</div>
          <span className="sdm-metric-trend sdm-metric-trend-up">+12.3%</span>
        </div>
        <div className="sdm-card sdm-metric-card">
          <h3>Active Domains</h3>
          <div className="sdm-metric-main">6</div>
          <span className="sdm-metric-trend">Live</span>
        </div>
        <div className="sdm-card sdm-metric-card">
          <h3>Breakthroughs</h3>
          <div className="sdm-metric-main">12</div>
          <span className="sdm-metric-trend sdm-metric-trend-up">+3</span>
        </div>
        <div className="sdm-card sdm-metric-card">
          <h3>Tracked Institutions</h3>
          <div className="sdm-metric-main">847</div>
          <span className="sdm-metric-trend sdm-metric-trend-up">+2.8%</span>
        </div>
      </div>

      <div className="sdm-grid sdm-grid-2col">
        <div className="sdm-card sdm-chart-card">
          <h3>Research Activity Trend</h3>
          <div className="sdm-chart-placeholder">Line chart placeholder</div>
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
            <li>
              <span>Multimodal Medical AI</span>
              <span className="sdm-metric-trend-up">+42.3%</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}


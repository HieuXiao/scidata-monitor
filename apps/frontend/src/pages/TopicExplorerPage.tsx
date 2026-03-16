export function TopicExplorerPage() {
  return (
    <section className="sdm-page">
      <header className="sdm-page-header">
        <h1>Topic Explorer</h1>
        <p>Discover and follow research topics across scientific domains.</p>
      </header>

      <div className="sdm-card sdm-table-card">
        <div className="sdm-table-header">
          <span>Topics</span>
        </div>
        <div className="sdm-table sdm-table-topics">
          <div className="sdm-table-row sdm-table-row-header">
            <span>Topic</span>
            <span>Domain</span>
            <span>Papers</span>
            <span>Trend</span>
          </div>
          <div className="sdm-table-row">
            <span>Radiogenomics Foundation Models</span>
            <span>Radiogenomics</span>
            <span>1,247</span>
            <span className="sdm-metric-trend-up">+34.5%</span>
          </div>
          <div className="sdm-table-row">
            <span>Agentic AI Systems</span>
            <span>AI / ML</span>
            <span>982</span>
            <span className="sdm-metric-trend-up">+28.2%</span>
          </div>
          <div className="sdm-table-row">
            <span>Spatial Transcriptomics</span>
            <span>Genomics</span>
            <span>876</span>
            <span className="sdm-metric-trend-up">+156%</span>
          </div>
        </div>
      </div>
    </section>
  )
}


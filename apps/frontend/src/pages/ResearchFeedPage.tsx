export function ResearchFeedPage() {
  return (
    <section className="sdm-page">
      <header className="sdm-page-header">
        <h1>Research Feed</h1>
        <p>Latest scientific publications across domains.</p>
      </header>

      <div className="sdm-card sdm-table-card">
        <div className="sdm-table-header">
          <span>Research Feed</span>
          <div className="sdm-table-filters">
            <button className="sdm-pill sdm-pill-active">All</button>
            <button className="sdm-pill">Data Science</button>
            <button className="sdm-pill">AI / ML</button>
            <button className="sdm-pill">Genomics</button>
            <button className="sdm-pill">Medical Imaging</button>
          </div>
        </div>
        <div className="sdm-table">
          <div className="sdm-table-row sdm-table-row-header">
            <span>Title</span>
            <span>Domain</span>
            <span>Source</span>
            <span>Activity</span>
          </div>
          <div className="sdm-table-row">
            <span>Foundation Models for Radiogenomics: Integrating Multi-Omics</span>
            <span>Radiogenomics</span>
            <span>Nature Medicine</span>
            <span>47 saves</span>
          </div>
          <div className="sdm-table-row">
            <span>Scaling Laws for Data-Centric AI</span>
            <span>Data Science</span>
            <span>arXiv</span>
            <span>32 saves</span>
          </div>
          <div className="sdm-table-row">
            <span>GPT-5 Architecture Leak Reveals Mixture-of-Experts</span>
            <span>AI / ML</span>
            <span>The Information</span>
            <span>18 saves</span>
          </div>
        </div>
      </div>
    </section>
  )
}


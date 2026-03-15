export function InstitutionsPage() {
  return (
    <section className="sdm-page">
      <header className="sdm-page-header">
        <h1>Institutions</h1>
        <p>Top research institutions tracked globally.</p>
      </header>

      <div className="sdm-grid sdm-grid-3col">
        <div className="sdm-card sdm-institution-card">
          <div className="sdm-institution-rank">#1</div>
          <div className="sdm-institution-name">MIT</div>
          <div className="sdm-institution-meta">Cambridge, MA, USA</div>
          <div className="sdm-institution-stats">128k citations • 3,200 papers</div>
        </div>
        <div className="sdm-card sdm-institution-card">
          <div className="sdm-institution-rank">#2</div>
          <div className="sdm-institution-name">Stanford University</div>
          <div className="sdm-institution-meta">Stanford, CA, USA</div>
          <div className="sdm-institution-stats">115k citations • 4,200 papers</div>
        </div>
        <div className="sdm-card sdm-institution-card">
          <div className="sdm-institution-rank">#3</div>
          <div className="sdm-institution-name">Harvard University</div>
          <div className="sdm-institution-meta">Boston, MA, USA</div>
          <div className="sdm-institution-stats">135k citations • 4,800 papers</div>
        </div>
      </div>
    </section>
  )
}


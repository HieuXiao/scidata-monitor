export function DatasetsPage() {
  return (
    <section className="sdm-page">
      <header className="sdm-page-header">
        <h1>Dataset Tracker</h1>
        <p>Biomedical and scientific datasets used in recent publications.</p>
      </header>

      <div className="sdm-card sdm-table-card">
        <div className="sdm-table-header">
          <span>Datasets</span>
        </div>
        <div className="sdm-table sdm-table-datasets">
          <div className="sdm-table-row sdm-table-row-header">
            <span>Dataset</span>
            <span>Domain</span>
            <span>Samples</span>
            <span>Papers</span>
            <span>Growth</span>
          </div>
          <div className="sdm-table-row">
            <span>TCGA Pan-Cancer Atlas</span>
            <span>Radiogenomics</span>
            <span>11,000+</span>
            <span>1,247</span>
            <span className="sdm-metric-trend-up">+18%</span>
          </div>
          <div className="sdm-table-row">
            <span>UK Biobank Imaging</span>
            <span>Medical Imaging</span>
            <span>100,000+</span>
            <span>892</span>
            <span className="sdm-metric-trend-up">+24%</span>
          </div>
          <div className="sdm-table-row">
            <span>MIMIC-IV</span>
            <span>Biomedical Informatics</span>
            <span>400,000+</span>
            <span>756</span>
            <span className="sdm-metric-trend-up">+12%</span>
          </div>
        </div>
      </div>
    </section>
  )
}


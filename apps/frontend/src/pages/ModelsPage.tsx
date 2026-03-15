export function ModelsPage() {
  return (
    <section className="sdm-page">
      <header className="sdm-page-header">
        <h1>Model Tracker</h1>
        <p>Latest AI/ML models in biomedical research.</p>
      </header>

      <div className="sdm-grid sdm-grid-3col">
        <div className="sdm-card sdm-model-card">
          <div className="sdm-model-title">BioMedGPT-2</div>
          <div className="sdm-model-meta">Biomedical NLP &bull; Transformer</div>
          <div className="sdm-model-footer">
            <span>4,200 ⭐</span>
            <span>2 days ago</span>
          </div>
        </div>
        <div className="sdm-card sdm-model-card">
          <div className="sdm-model-title">RadioGenomics-FM</div>
          <div className="sdm-model-meta">
            Radiogenomics &bull; Vision-Language &bull; Fusion
          </div>
          <div className="sdm-model-footer">
            <span>3,580 ⭐</span>
            <span>1 week ago</span>
          </div>
        </div>
        <div className="sdm-card sdm-model-card">
          <div className="sdm-model-title">MedSAM-2</div>
          <div className="sdm-model-meta">Medical Imaging &bull; SAM</div>
          <div className="sdm-model-footer">
            <span>5,400 ⭐</span>
            <span>3 days ago</span>
          </div>
        </div>
      </div>
    </section>
  )
}


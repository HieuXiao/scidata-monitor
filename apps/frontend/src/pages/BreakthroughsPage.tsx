export function BreakthroughsPage() {
  return (
    <section className="sdm-page">
      <header className="sdm-page-header">
        <h1>Breakthrough Timeline</h1>
        <p>Major scientific discoveries and milestones.</p>
      </header>

      <div className="sdm-card sdm-timeline-card">
        <ul className="sdm-timeline">
          <li>
            <div className="sdm-timeline-date">Mar 2026</div>
            <div className="sdm-timeline-content">
              <h3>Radiogenomics AI predicts treatment response with 96% accuracy</h3>
              <p>
                A foundation model trained on TCGA and TCIA achieves breakthrough
                performance in predicting genomic alterations from radiology images.
              </p>
            </div>
          </li>
          <li>
            <div className="sdm-timeline-date">Feb 2026</div>
            <div className="sdm-timeline-content">
              <h3>Self-supervised learning eliminates need for labeled medical data</h3>
              <p>New pretraining paradigm enables models to learn from raw data.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}


import { ResearchActivityChart } from '../components/charts/ResearchActivityChart'
import { TopicTrendSpark } from '../components/charts/TopicTrendSpark'

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

      <div className="sdm-grid sdm-grid-2col sdm-overview-middle">
        <div className="sdm-card sdm-chart-card">
          <div className="sdm-card-header">
            <h3>Research Activity Trend</h3>
            <span className="sdm-card-subtitle">Last 7 days</span>
          </div>
          <ResearchActivityChart />
        </div>
        <div className="sdm-card sdm-list-card">
          <div className="sdm-card-header">
            <h3>Trending Topics</h3>
            <button className="sdm-link-button">View all</button>
          </div>
          <ol className="sdm-simple-list sdm-simple-list-ranked">
            <li>
              <span className="sdm-rank">1</span>
              <span className="sdm-list-main">
                <span>Radiogenomics Foundation Models</span>
                <span className="sdm-list-meta">1,247 papers</span>
              </span>
              <div className="sdm-topic-trend">
                <TopicTrendSpark value={34.5} />
                <span className="sdm-metric-trend-up">+34.5%</span>
              </div>
            </li>
            <li>
              <span className="sdm-rank">2</span>
              <span className="sdm-list-main">
                <span>Agentic AI Systems</span>
                <span className="sdm-list-meta">982 papers</span>
              </span>
              <div className="sdm-topic-trend">
                <TopicTrendSpark value={28.2} />
                <span className="sdm-metric-trend-up">+28.2%</span>
              </div>
            </li>
            <li>
              <span className="sdm-rank">3</span>
              <span className="sdm-list-main">
                <span>Spatial Transcriptomics</span>
                <span className="sdm-list-meta">876 papers</span>
              </span>
              <div className="sdm-topic-trend">
                <TopicTrendSpark value={156} />
                <span className="sdm-metric-trend-up">+156%</span>
              </div>
            </li>
            <li>
              <span className="sdm-rank">4</span>
              <span className="sdm-list-main">
                <span>Multimodal Medical AI</span>
                <span className="sdm-list-meta">567 papers</span>
              </span>
              <div className="sdm-topic-trend">
                <TopicTrendSpark value={42.3} />
                <span className="sdm-metric-trend-up">+42.3%</span>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className="sdm-grid sdm-grid-2col sdm-overview-bottom">
        {/* Latest Breakthroughs */}
        <div className="sdm-card sdm-list-card">
          <div className="sdm-card-header">
            <h3 className="sdm-section-title">
              <span className="sdm-section-icon sdm-section-icon-amber">⚡</span>
              Latest Breakthroughs
            </h3>
            <button className="sdm-link-button">View all →</button>
          </div>
          <ul className="sdm-bt-list">
            <li className="sdm-bt-item">
              <p className="sdm-bt-title">Radiogenomics AI predicts treatment response with 96% accuracy</p>
              <div className="sdm-bt-footer">
                <span className="sdm-domain-tag sdm-domain-tag-indigo">Radiogenomics</span>
                <span className="sdm-bt-date">Mar 2026</span>
              </div>
            </li>
            <li className="sdm-bt-item">
              <p className="sdm-bt-title">Self-supervised learning eliminates need for labeled medical data</p>
              <div className="sdm-bt-footer">
                <span className="sdm-domain-tag sdm-domain-tag-teal">Data Science</span>
                <span className="sdm-bt-date">Feb 2026</span>
              </div>
            </li>
            <li className="sdm-bt-item">
              <p className="sdm-bt-title">Pan-cancer genomic atlas completed with spatial resolution</p>
              <div className="sdm-bt-footer">
                <span className="sdm-domain-tag sdm-domain-tag-purple">Genomics</span>
                <span className="sdm-bt-date">Jan 2026</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Most Influential Papers Today */}
        <div className="sdm-card sdm-list-card">
          <div className="sdm-card-header">
            <h3 className="sdm-section-title">
              <span className="sdm-section-icon sdm-section-icon-purple">✦</span>
              Most Influential Papers Today
            </h3>
            <button className="sdm-link-button">View all →</button>
          </div>
          <ul className="sdm-paper-list">
            <li className="sdm-paper-item">
              <div className="sdm-paper-info">
                <p className="sdm-paper-title">Foundation Models for Radiogenomics</p>
                <div className="sdm-paper-meta">
                  <span className="sdm-paper-authors">Chen et al.</span>
                  <span className="sdm-journal sdm-journal-teal">Nature Medicine</span>
                </div>
              </div>
              <span className="sdm-paper-citations">312 citations</span>
            </li>
            <li className="sdm-paper-item">
              <div className="sdm-paper-info">
                <p className="sdm-paper-title">Scaling Laws for Data-Centric AI</p>
                <div className="sdm-paper-meta">
                  <span className="sdm-paper-authors">Kaplan et al.</span>
                  <span className="sdm-journal sdm-journal-blue">arXiv</span>
                </div>
              </div>
              <span className="sdm-paper-citations">891 citations</span>
            </li>
            <li className="sdm-paper-item">
              <div className="sdm-paper-info">
                <p className="sdm-paper-title">Spatial Transcriptomics Atlas</p>
                <div className="sdm-paper-meta">
                  <span className="sdm-paper-authors">Wang et al.</span>
                  <span className="sdm-journal sdm-journal-green">Cell</span>
                </div>
              </div>
              <span className="sdm-paper-citations">456 citations</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}


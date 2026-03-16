import { useMemo, useState } from 'react'

const TOPICS = [
  'ALL',
  'DATA SCIENCE',
  'RADIOGENOMICS',
  'AI / ML',
  'GENOMICS',
  'MEDICAL IMAGING',
  'BIOMEDICAL INFORMATICS',
] as const

type Topic = typeof TOPICS[number]

type FeedItem = {
  id: number
  author: string
  org: string
  timeAgo: string
  source: string
  sourceColor: 'teal' | 'blue' | 'green' | 'gray' | 'purple'
  stars: number
  title: string
  insight: string
  impact: 'HIGH' | 'MED'
  datasets: string[]
  hasCode: boolean
  topic: Topic
}

const FEED_ITEMS: FeedItem[] = [
  {
    id: 1,
    author: 'Chen Y.',
    org: 'MSKCC',
    timeAgo: '2h ago',
    source: 'Nature Medicine',
    sourceColor: 'teal',
    stars: 47,
    title: 'Foundation Models for Radiogenomics: Integrating Multi-Omics with Medical Imaging',
    insight: 'A new foundation model achieves state-of-the-art performance in predicting genomic alterations from radiology images across 14 cancer types.',
    impact: 'HIGH',
    datasets: ['TCGA Pan-Cancer'],
    hasCode: true,
    topic: 'RADIOGENOMICS',
  },
  {
    id: 2,
    author: 'Kaplan J.',
    org: 'Google DeepMind',
    timeAgo: '4h ago',
    source: 'arXiv / Google DeepMind',
    sourceColor: 'blue',
    stars: 132,
    title: "Scaling Laws for Data-Centric AI: When More Data Isn't Better",
    insight: 'Researchers demonstrate diminishing returns in data scaling and propose quality-focused training paradigms.',
    impact: 'HIGH',
    datasets: ['C4', 'RedPajama'],
    hasCode: false,
    topic: 'AI / ML',
  },
  {
    id: 3,
    author: 'Staff Reporter',
    org: 'The Information',
    timeAgo: '6h ago',
    source: 'The Information',
    sourceColor: 'gray',
    stars: 89,
    title: 'GPT-5 Architecture Leak Reveals Mixture-of-Experts at Scale',
    insight: 'Reports suggest next-gen models use 16 expert networks with dynamic routing for 10x inference efficiency.',
    impact: 'HIGH',
    datasets: [],
    hasCode: false,
    topic: 'AI / ML',
  },
  {
    id: 4,
    author: 'Wang L.',
    org: 'Stanford Medicine',
    timeAgo: '8h ago',
    source: 'Cell',
    sourceColor: 'green',
    stars: 211,
    title: 'Spatial Transcriptomics Atlas of Human Breast Tumors at Single-Cell Resolution',
    insight: 'A comprehensive spatial map of gene expression across 56 breast tumor samples, revealing novel immune evasion patterns.',
    impact: 'MED',
    datasets: ['GEO', 'SRA'],
    hasCode: true,
    topic: 'GENOMICS',
  },
  {
    id: 5,
    author: 'Nguyen T.',
    org: 'MIT CSAIL',
    timeAgo: '10h ago',
    source: 'NeurIPS 2026',
    sourceColor: 'purple',
    stars: 56,
    title: 'Self-Supervised Pre-Training for Medical Image Segmentation Without Labels',
    insight: 'Contrastive learning on unlabeled CT scans matches supervised baselines with zero manual annotation effort.',
    impact: 'MED',
    datasets: ['LIDC-IDRI'],
    hasCode: true,
    topic: 'MEDICAL IMAGING',
  },
  {
    id: 6,
    author: 'Patel R.',
    org: 'Broad Institute',
    timeAgo: '12h ago',
    source: 'Nature Genetics',
    sourceColor: 'teal',
    stars: 178,
    title: 'Pan-Cancer Polygenic Risk Scores Enable Early Detection Across 20 Tumor Types',
    insight: 'Aggregated germline variants improve early detection AUC to 0.91 across 20 cancer types in prospective cohort.',
    impact: 'HIGH',
    datasets: ['UK Biobank'],
    hasCode: false,
    topic: 'GENOMICS',
  },
  {
    id: 7,
    author: 'Okonkwo A.',
    org: 'DeepMind Health',
    timeAgo: '14h ago',
    source: 'Science',
    sourceColor: 'blue',
    stars: 304,
    title: 'Protein Structure Prediction Extends to Full Proteome Complexes',
    insight: 'The latest AlphaFold variant predicts multi-chain protein complexes at atomic resolution for entire proteomes.',
    impact: 'HIGH',
    datasets: ['PDB', 'UniProt'],
    hasCode: true,
    topic: 'DATA SCIENCE',
  },
]

const SOURCE_COLORS: Record<FeedItem['sourceColor'], string> = {
  teal: '#0d9488',
  blue: '#2563eb',
  green: '#16a34a',
  gray: '#6b7280',
  purple: '#7c3aed',
}

export function ResearchFeedPage() {
  const [activeTopic, setActiveTopic] = useState<Topic>('ALL')
  const [sortBy, setSortBy] = useState<'latest' | 'most-saved' | 'impact'>('latest')

  const filtered = useMemo(() => {
    const items = activeTopic === 'ALL'
      ? FEED_ITEMS
      : FEED_ITEMS.filter(item => item.topic === activeTopic)

    if (sortBy === 'most-saved') {
      return [...items].sort((a, b) => b.stars - a.stars)
    }
    if (sortBy === 'impact') {
      return [...items].sort((a, b) => {
        if (a.impact === b.impact) return b.stars - a.stars
        return a.impact === 'HIGH' ? -1 : 1
      })
    }
    return items
  }, [activeTopic, sortBy])

  return (
    <section className="sdm-page sdm-page-feed">
      <div className="sdm-feed-page-head">
        <header className="sdm-page-header">
          <h1>Research Feed</h1>
          <p>Latest scientific publications across all domains</p>
        </header>
        <button className="sdm-feed-bookmark-btn" type="button">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 2.2h8v9.6L7 9.6 3 11.8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
          Bookmarks
        </button>
      </div>

      <div className="sdm-feed-filters sdm-feed-page-filters">
        {TOPICS.map(topic => (
          <button
            key={topic}
            className={[
              'sdm-feed-filter-btn',
              activeTopic === topic ? 'sdm-feed-filter-active' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => setActiveTopic(topic)}
            type="button"
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="sdm-feed-page-toolbar">
        <span className="sdm-feed-sort-icon">⇅</span>
        <select
          className="sdm-feed-sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'latest' | 'most-saved' | 'impact')}
        >
          <option value="latest">Latest</option>
          <option value="most-saved">Most Saved</option>
          <option value="impact">Impact First</option>
        </select>
      </div>

      <div className="sdm-feed-header">
        <span className="sdm-feed-header-title">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
            <path d="M2 10L6 5l3 3 3-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          RESEARCH FEED
        </span>
        <span className="sdm-feed-header-count">{filtered.length} items</span>
      </div>

      <div className="sdm-feed-list">
        {filtered.map(item => (
          <div key={item.id} className="sdm-feed-item">
            <div className="sdm-feed-meta">
              <span className="sdm-feed-author">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="4" r="2.3" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M1.5 10.5c0-2.5 9-2.5 9 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                {item.author}
              </span>
              <span className="sdm-feed-org">@ {item.org}</span>
              <span className="sdm-feed-time">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <circle cx="5.5" cy="5.5" r="4.2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M5.5 3v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {item.timeAgo}
              </span>
              <a href="#" className="sdm-feed-source" style={{ color: SOURCE_COLORS[item.sourceColor] }}>
                {item.source}
              </a>
              <span className="sdm-feed-stars">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M5.5 1l1.1 3.3H10L7.2 6.4l1 3.1L5.5 7.8 2.8 9.5l1-3.1L1 4.3h3.4z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
                </svg>
                {item.stars}
              </span>
            </div>

            <div className="sdm-feed-content">
              <h3 className="sdm-feed-title">{item.title}</h3>
              <div className="sdm-feed-insight">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M6.5 1.5l.9 2.7H10L7.8 5.8l.8 2.5-2.1-1.5-2.1 1.5.8-2.5L3 4.2h2.6z" stroke="#6366f1" strokeWidth="1.1" strokeLinejoin="round" />
                </svg>
                <p>{item.insight}</p>
              </div>
              <div className="sdm-feed-footer">
                <span className={['sdm-impact-badge', item.impact === 'HIGH' ? 'sdm-impact-high' : 'sdm-impact-med'].join(' ')}>
                  {item.impact}
                </span>
                {item.datasets.map(dataset => (
                  <span key={dataset} className="sdm-feed-dataset">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <ellipse cx="5.5" cy="3" rx="4" ry="1.5" stroke="currentColor" strokeWidth="1.1" />
                      <path d="M1.5 3v2.5c0 .83 1.79 1.5 4 1.5s4-.67 4-1.5V3" stroke="currentColor" strokeWidth="1.1" />
                      <path d="M1.5 5.5V8c0 .83 1.79 1.5 4 1.5S9.5 8.83 9.5 8V5.5" stroke="currentColor" strokeWidth="1.1" />
                    </svg>
                    {dataset}
                  </span>
                ))}
                {item.hasCode && (
                  <span className="sdm-feed-code-tag">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M3.5 3.5L1 5.5l2.5 2M7.5 3.5L10 5.5l-2.5 2M6 2l-1 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Code
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


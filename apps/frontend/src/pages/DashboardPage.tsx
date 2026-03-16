import { useState } from 'react'

const TOPICS = [
  'ALL', 'DATA SCIENCE', 'RADIOGENOMICS', 'AI / ML',
  'GENOMICS', 'MEDICAL IMAGING', 'BIOMEDICAL INFORMATICS',
] as const
type Topic = typeof TOPICS[number]

const FEED_ITEMS = [
  {
    id: 1,
    author: 'Chen Y.',
    org: 'MSKCC',
    timeAgo: '2h ago',
    source: 'Nature Medicine',
    sourceColor: 'teal' as const,
    stars: 47,
    title: 'Foundation Models for Radiogenomics: Integrating Multi-Omics with Medical Imaging',
    insight: 'A new foundation model achieves state-of-the-art performance in predicting genomic alterations from radiology images across 14 cancer types.',
    impact: 'HIGH' as const,
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
    sourceColor: 'blue' as const,
    stars: 132,
    title: "Scaling Laws for Data-Centric AI: When More Data Isn't Better",
    insight: 'Researchers demonstrate diminishing returns in data scaling and propose quality-focused training paradigms.',
    impact: 'HIGH' as const,
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
    sourceColor: 'gray' as const,
    stars: 89,
    title: 'GPT-5 Architecture Leak Reveals Mixture-of-Experts at Scale',
    insight: 'Reports suggest next-gen models use 16 expert networks with dynamic routing to reduce inference cost by 4×.',
    impact: 'HIGH' as const,
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
    sourceColor: 'green' as const,
    stars: 211,
    title: 'Spatial Transcriptomics Atlas of Human Breast Tumors at Single-Cell Resolution',
    insight: 'A comprehensive spatial map of gene expression across 56 breast tumor samples, revealing novel immune evasion patterns.',
    impact: 'MED' as const,
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
    sourceColor: 'purple' as const,
    stars: 56,
    title: 'Self-Supervised Pre-Training for Medical Image Segmentation Without Labels',
    insight: 'Contrastive learning on unlabeled CT scans matches supervised baselines with zero manual annotation effort.',
    impact: 'MED' as const,
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
    sourceColor: 'teal' as const,
    stars: 178,
    title: 'Pan-Cancer Polygenic Risk Scores Enable Early Detection Across 20 Tumor Types',
    insight: 'Aggregated germline variants improve early detection AUC to 0.91 across 20 cancer types in prospective cohort.',
    impact: 'HIGH' as const,
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
    sourceColor: 'blue' as const,
    stars: 304,
    title: 'Protein Structure Prediction Extends to Full Proteome Complexes',
    insight: 'The latest AlphaFold variant predicts multi-chain protein complexes at atomic resolution for entire proteomes.',
    impact: 'HIGH' as const,
    datasets: ['PDB', 'UniProt'],
    hasCode: true,
    topic: 'DATA SCIENCE',
  },
]

const SOURCE_COLORS: Record<string, string> = {
  teal: '#0d9488', blue: '#2563eb', green: '#16a34a', gray: '#6b7280', purple: '#7c3aed',
}

// ── Key Metrics ───────────────────────────────────────────────
const KEY_METRICS = [
  { label: 'PAPERS TODAY',    value: '2,847', trend: '+12.3%', sub: 'vs. 2,536 yesterday',     spark: [60,65,70,68,72,78,85] },
  { label: 'RADIOGENOMICS',   value: '156',   trend: '+34.5%', sub: 'Fastest growing field',   spark: [30,40,52,55,65,75,95] },
  { label: 'AI/ML MODELS',    value: '423',   trend: '+8.2%',  sub: 'Released this week',      spark: [65,68,72,70,73,78,82] },
  { label: 'ACTIVE DATASETS', value: '1,284', trend: '+5.1%',  sub: 'Across 48 repositories', spark: [72,74,76,75,78,80,82] },
  { label: 'BREAKTHROUGHS',   value: '12',    trend: '+3',     sub: 'This month',              spark: [40,50,55,60,70,75,80] },
  { label: 'INSTITUTIONS',    value: '847',   trend: '+2.8%',  sub: 'Tracked globally',        spark: [68,70,72,71,74,76,78] },
]

// ── Weekly Activity ───────────────────────────────────────────
const WEEKLY_VALUES = [1820, 2140, 2390, 2180, 1960, 2640, 2980]
const WEEKLY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// ── Citation Velocity ─────────────────────────────────────────
const CITE_VELOCITY = [
  { title: 'Foundation Models for Radiogenomics', authors: 'Chen et al.',   journal: 'Nature Medicine', journalColor: '#0d9488', rate: '+47/day', total: 312, spark: [12,18,25,31,38,44,47] },
  { title: 'Scaling Laws for Data-Centric AI',    authors: 'Kaplan et al.', journal: 'arXiv',           journalColor: '#2563eb', rate: '+31/day', total: 891, spark: [18,22,28,33,38,34,31] },
]

// ── Breakthroughs ─────────────────────────────────────────────
const BK_ITEMS = [
  { date: 'MAR 2026', title: 'Radiogenomics AI predicts treatment response with 96% accuracy',    tag: 'RADIOGENOMICS',   tagColor: 'indigo' as const, desc: 'Personalized oncology enters clinical trials phase' },
  { date: 'FEB 2026', title: 'Self-supervised learning eliminates need for labeled medical data', tag: 'DATA SCIENCE',    tagColor: 'teal'   as const, desc: '10x reduction in annotation costs for medical AI' },
  { date: 'FEB 2026', title: 'Room-temperature quantum processor demonstrated',                   tag: 'TECH REVOLUTION', tagColor: 'red'    as const, desc: 'Practical quantum computing moves 5 years closer' },
  { date: 'JAN 2026', title: 'Pan-cancer genomic atlas completed with spatial resolution',        tag: 'GENOMICS',        tagColor: 'purple' as const, desc: 'Complete molecular maps of 50+ cancer types' },
  { date: 'JAN 2026', title: 'Multimodal AI agent achieves PhD-level scientific reasoning',       tag: 'AI / ML',         tagColor: 'blue'   as const, desc: 'Autonomous hypothesis generation and experiment design' },
]
const BK_TAG_COLORS = {
  indigo: { bg: '#e0e7ff', color: '#4338ca' },
  teal:   { bg: '#ccfbf1', color: '#0f766e' },
  red:    { bg: '#fee2e2', color: '#dc2626' },
  purple: { bg: '#ede9fe', color: '#6d28d9' },
  blue:   { bg: '#dbeafe', color: '#1d4ed8' },
}

// ── Domain Distribution ───────────────────────────────────────
const DOMAIN_DATA = [
  { name: 'Data Science',           pct: 31.8, color: '#3b82f6' },
  { name: 'AI / ML',                pct: 23.9, color: '#0ea5e9' },
  { name: 'Radiogenomics',          pct: 14.0, color: '#f59e0b' },
  { name: 'Genomics',               pct: 12.2, color: '#14b8a6' },
  { name: 'Biomedical Informatics', pct:  9.8, color: '#ef4444' },
  { name: 'Medical Imaging',        pct:  8.3, color: '#22c55e' },
]

// ── Trending Topics ───────────────────────────────────────────
const TRENDING = [
  { rank: 1, name: 'Radiogenomics Foundation Models', pct: '+34.5%', count: '1,247', isNew: false, spark: [40,52,60,72,80,88,95] },
  { rank: 2, name: 'Agentic AI Systems',              pct: '+28.2%', count: '982',   isNew: false, spark: [50,58,62,67,74,80,85] },
  { rank: 3, name: 'Spatial Transcriptomics',         pct: '+156%',  count: '876',   isNew: true,  spark: [10,15,25,40,60,75,95] },
  { rank: 4, name: 'Quantum Error Correction',        pct: '+15.8%', count: '743',   isNew: false, spark: [60,65,68,72,74,78,82] },
  { rank: 5, name: 'Data-Centric AI',                 pct: '+3.2%',  count: '698',   isNew: false, spark: [60,62,60,64,63,65,66] },
  { rank: 6, name: 'Multimodal LLMs',                 pct: '+5.1%',  count: '654',   isNew: false, spark: [55,57,60,58,62,64,65] },
  { rank: 7, name: 'Synthetic Biology',               pct: '+89.3%', count: '589',   isNew: true,  spark: [10,18,28,42,55,70,88] },
  { rank: 8, name: 'Neuromorphic Computing',          pct: '+12.4%', count: '456',   isNew: false, spark: [45,50,53,58,62,65,68] },
]

// ── Dataset Activity ──────────────────────────────────────────
const DATASETS = [
  { name: 'TCGA Pan-Cancer Atlas', tag: 'Radiogenomics',  org: 'NCI',        papers: '1,247', trend: '+18%' },
  { name: 'ImageNet-Medical 2.0', tag: 'Medical Imaging', org: 'Stanford',   papers: '892',   trend: '+9%'  },
  { name: 'UK Biobank Genomics',  tag: 'Genomics',        org: 'UK Biobank', papers: '2,103', trend: '+24%' },
  { name: 'C4 / RedPajama',       tag: 'Data Science',    org: 'EleutherAI', papers: '634',   trend: '+5%'  },
]

// ── Model Tracker ─────────────────────────────────────────────
const MODELS = [
  { name: 'GenomeFormer', params: '3.5B', stars: '1,988', desc: 'Variant calling',             tag: 'Genomics',        tagColor: '#14b8a6', org: 'Broad Institute', timeAgo: '1w ago' },
  { name: 'MedSAM-2',     params: '600M', stars: '5,460', desc: 'Universal segmentation',      tag: 'Medical Imaging', tagColor: '#0d9488', org: 'Meta AI',         timeAgo: '3d ago' },
  { name: 'RadioLM',      params: '1.2B', stars: '743',   desc: 'Radiology report generation', tag: 'Radiogenomics',   tagColor: '#4338ca', org: 'MSKCC',           timeAgo: '5d ago' },
]

// ── Research Hotspots ─────────────────────────────────────────
const HOTSPOTS = [
  { name: 'MIT CSAIL',          level: 'VERY HIGH', levelColor: '#ef4444', bar: 95, city: 'Cambridge, USA', topic: 'Foundation Models',        topicColor: '#2563eb', papers: 342 },
  { name: 'Stanford HAI',       level: 'VERY HIGH', levelColor: '#ef4444', bar: 90, city: 'Stanford, USA',  topic: 'AI Safety & Alignment',    topicColor: '#2563eb', papers: 289 },
  { name: 'DeepMind',           level: 'HIGH',      levelColor: '#f59e0b', bar: 72, city: 'London, UK',     topic: 'AlphaFold 3 Applications', topicColor: '#0d9488', papers: 198 },
  { name: 'MSKCC',              level: 'HIGH',      levelColor: '#f59e0b', bar: 60, city: 'New York, USA',  topic: 'Radiogenomics',            topicColor: '#0d9488', papers: 156 },
  { name: 'Broad Institute',    level: 'HIGH',      levelColor: '#f59e0b', bar: 75, city: 'Cambridge, USA', topic: 'Single-Cell Genomics',     topicColor: '#0d9488', papers: 234 },
  { name: 'Tsinghua University',level: 'MODERATE',  levelColor: '#3b82f6', bar: 48, city: 'Beijing, CN',    topic: 'Multimodal Learning',      topicColor: '#2563eb', papers: 178 },
]

// ── SVG helpers ───────────────────────────────────────────────
function MiniSpark({ data, color = '#9ca3af' }: { data: number[]; color?: string }) {
  const W = 50, H = 22
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1
  const step = W / (data.length - 1)
  const pts = data.map((v, i) =>
    `${(i * step).toFixed(1)},${(H - ((v - min) / range) * (H - 4) - 2).toFixed(1)}`
  ).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ flexShrink: 0 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WeeklyChart() {
  const W = 340, H = 120, maxV = 3200
  const xStep = W / (WEEKLY_VALUES.length - 1)
  const pts = WEEKLY_VALUES.map((v, i) => ({
    x: +(i * xStep).toFixed(2),
    y: +(H - (v / maxV) * (H - 10) - 4).toFixed(2),
  }))
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  return (
    <div className="sdm-weekchart">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: H }}>
        <defs>
          <linearGradient id="wk-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
          <line key={i} x1={0} y1={H * f} x2={W} y2={H * f} stroke="#f0f0f4" strokeWidth="1" />
        ))}
        <path d={`${line} L ${W} ${H} L 0 ${H} Z`} fill="url(#wk-grad)" />
        <path d={line} stroke="#2563eb" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill="#fff" stroke="#2563eb" strokeWidth="1.6" />)}
      </svg>
      <div className="sdm-weekchart-xaxis">
        {WEEKLY_LABELS.map(l => <span key={l}>{l}</span>)}
      </div>
    </div>
  )
}

function DonutChart() {
  const cx = 58, cy = 58, R = 46, r = 30
  let angle = -Math.PI / 2
  const total = DOMAIN_DATA.reduce((s, d) => s + d.pct, 0)
  const slices = DOMAIN_DATA.map(d => {
    const sweep = (d.pct / total) * Math.PI * 2
    const sa = angle, ea = angle + sweep
    angle = ea
    const f = (n: number) => n.toFixed(2)
    const lg = sweep > Math.PI ? 1 : 0
    const path = [
      `M ${f(cx + R * Math.cos(sa))} ${f(cy + R * Math.sin(sa))}`,
      `A ${R} ${R} 0 ${lg} 1 ${f(cx + R * Math.cos(ea))} ${f(cy + R * Math.sin(ea))}`,
      `L ${f(cx + r * Math.cos(ea))} ${f(cy + r * Math.sin(ea))}`,
      `A ${r} ${r} 0 ${lg} 0 ${f(cx + r * Math.cos(sa))} ${f(cy + r * Math.sin(sa))} Z`,
    ].join(' ')
    return { ...d, path }
  })
  return (
    <div className="sdm-donut-wrap">
      <svg viewBox="0 0 116 116" width="116" height="116" style={{ flexShrink: 0 }}>
        {slices.map(s => <path key={s.name} d={s.path} fill={s.color} />)}
      </svg>
      <div className="sdm-donut-legend">
        {DOMAIN_DATA.map(d => (
          <div key={d.name} className="sdm-donut-item">
            <span className="sdm-donut-dot" style={{ background: d.color }} />
            <span className="sdm-donut-name">{d.name}</span>
            <span className="sdm-donut-pct">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page Component ────────────────────────────────────────────
export function DashboardPage() {
  const [activeTopic, setActiveTopic] = useState<Topic>('ALL')
  const filtered = activeTopic === 'ALL'
    ? FEED_ITEMS
    : FEED_ITEMS.filter(item => item.topic === activeTopic)

  return (
    <section className="sdm-page sdm-page-dashboard">
      {/* Topic filter bar */}
      <div className="sdm-feed-filters">
        {TOPICS.map(t => (
          <button
            key={t}
            className={['sdm-feed-filter-btn', activeTopic === t ? 'sdm-feed-filter-active' : ''].filter(Boolean).join(' ')}
            onClick={() => setActiveTopic(t)}
          >{t}</button>
        ))}
      </div>

      <div className="sdm-dash-grid">
        {/* ── Col 1: Research Feed ─────────────────────────── */}
        <div className="sdm-dash-col">
          <div className="sdm-feed-header">
            <span className="sdm-feed-header-title">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <path d="M2 10L6 5l3 3 3-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
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
                      <circle cx="6" cy="4" r="2.3" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M1.5 10.5c0-2.5 9-2.5 9 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    {item.author}
                  </span>
                  <span className="sdm-feed-org">@ {item.org}</span>
                  <span className="sdm-feed-time">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <circle cx="5.5" cy="5.5" r="4.2" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M5.5 3v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {item.timeAgo}
                  </span>
                  <a href="#" className="sdm-feed-source" style={{ color: SOURCE_COLORS[item.sourceColor] }}>
                    {item.source}
                  </a>
                  <span className="sdm-feed-stars">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M5.5 1l1.1 3.3H10L7.2 6.4l1 3.1L5.5 7.8 2.8 9.5l1-3.1L1 4.3h3.4z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
                    </svg>
                    {item.stars}
                  </span>
                </div>
                <div className="sdm-feed-content">
                  <h3 className="sdm-feed-title">{item.title}</h3>
                  <div className="sdm-feed-insight">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                      <path d="M6.5 1.5l.9 2.7H10L7.8 5.8l.8 2.5-2.1-1.5-2.1 1.5.8-2.5L3 4.2h2.6z" stroke="#6366f1" strokeWidth="1.1" strokeLinejoin="round"/>
                    </svg>
                    <p>{item.insight}</p>
                  </div>
                  <div className="sdm-feed-footer">
                    <span className={['sdm-impact-badge', item.impact === 'HIGH' ? 'sdm-impact-high' : 'sdm-impact-med'].join(' ')}>
                      {item.impact}
                    </span>
                    {item.datasets.map(ds => (
                      <span key={ds} className="sdm-feed-dataset">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <ellipse cx="5.5" cy="3" rx="4" ry="1.5" stroke="currentColor" strokeWidth="1.1"/>
                          <path d="M1.5 3v2.5c0 .83 1.79 1.5 4 1.5s4-.67 4-1.5V3" stroke="currentColor" strokeWidth="1.1"/>
                          <path d="M1.5 5.5V8c0 .83 1.79 1.5 4 1.5S9.5 8.83 9.5 8V5.5" stroke="currentColor" strokeWidth="1.1"/>
                        </svg>
                        {ds}
                      </span>
                    ))}
                    {item.hasCode && (
                      <span className="sdm-feed-code-tag">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M3.5 3.5L1 5.5l2.5 2M7.5 3.5L10 5.5l-2.5 2M6 2l-1 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Code
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Col 2: Metrics / Charts / Breakthroughs ──────── */}
        <div className="sdm-dash-col">

          {/* KEY METRICS */}
          <div className="sdm-card">
            <div className="sdm-card-header">
              <h3 className="sdm-section-title sdm-section-title-upper">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1" y="7" width="2.5" height="5" rx="1" fill="currentColor"/>
                  <rect x="5.2" y="4" width="2.5" height="8" rx="1" fill="currentColor"/>
                  <rect x="9.5" y="1" width="2.5" height="11" rx="1" fill="currentColor"/>
                </svg>
                KEY METRICS
              </h3>
              <span className="sdm-badge-live">
                <span className="sdm-live-dot" /> LIVE
              </span>
            </div>
            <div className="sdm-metrics-grid">
              {KEY_METRICS.map(m => (
                <div key={m.label} className="sdm-metric-tile">
                  <div className="sdm-metric-tile-top">
                    <span className="sdm-metric-tile-label">{m.label}</span>
                    <MiniSpark data={m.spark} color="#22c55e" />
                  </div>
                  <div className="sdm-metric-tile-value">{m.value}</div>
                  <div className="sdm-metric-tile-bottom">
                    <span className="sdm-metric-tile-trend">↗ {m.trend}</span>
                    <span className="sdm-metric-tile-sub">{m.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WEEKLY ACTIVITY */}
          <div className="sdm-card">
            <div className="sdm-card-header">
              <h3 className="sdm-section-title sdm-section-title-upper">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1 10L4 6l3 3 5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                WEEKLY ACTIVITY
              </h3>
            </div>
            <WeeklyChart />
          </div>

          {/* CITATION VELOCITY */}
          <div className="sdm-card">
            <div className="sdm-card-header">
              <h3 className="sdm-section-title sdm-section-title-upper">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M6.5 3.5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                CITATION VELOCITY
              </h3>
            </div>
            <div className="sdm-cite-list">
              {CITE_VELOCITY.map((c, i) => (
                <div key={i} className="sdm-cite-item">
                  <div className="sdm-cite-info">
                    <p className="sdm-cite-title">{c.title}</p>
                    <p className="sdm-cite-meta">
                      {c.authors} · <span style={{ color: c.journalColor }}>{c.journal}</span>
                    </p>
                    <p className="sdm-cite-rate">
                      <span className="sdm-cite-rate-val">{c.rate}</span>
                      <span className="sdm-cite-sep">|</span>
                      <span>{c.total} total</span>
                    </p>
                  </div>
                  <MiniSpark data={c.spark} color="#f59e0b" />
                </div>
              ))}
            </div>
          </div>

          {/* BREAKTHROUGHS */}
          <div className="sdm-card">
            <div className="sdm-card-header">
              <h3 className="sdm-section-title sdm-section-title-upper">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1L8 5h4l-3.2 2.3 1.2 3.7L6.5 9 3 11l1.2-3.7L1 5h4z" stroke="#f59e0b" strokeWidth="1.1" strokeLinejoin="round" fill="#fef3c7"/>
                </svg>
                BREAKTHROUGHS
              </h3>
              <button className="sdm-link-button">View all →</button>
            </div>
            <ol className="sdm-bk-list">
              {BK_ITEMS.map((b, i) => {
                const tc = BK_TAG_COLORS[b.tagColor]
                return (
                  <li key={i} className="sdm-bk-item">
                    <span className="sdm-bk-dot" />
                    <div className="sdm-bk-body">
                      <span className="sdm-bk-date">{b.date}</span>
                      <p className="sdm-bk-title">{b.title}</p>
                      <span className="sdm-bk-tag" style={{ background: tc.bg, color: tc.color }}>{b.tag}</span>
                      <p className="sdm-bk-desc">{b.desc}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        {/* ── Col 3: Right panel ───────────────────────────── */}
        <div className="sdm-dash-col">

          {/* DOMAIN DISTRIBUTION */}
          <div className="sdm-card">
            <div className="sdm-card-header">
              <h3 className="sdm-section-title sdm-section-title-upper">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="6.5" r="5.2" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M6.5 1.3C9.1 1.3 11.3 3 11.9 5.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                DOMAIN DISTRIBUTION
              </h3>
            </div>
            <DonutChart />
          </div>

          {/* TRENDING TOPICS */}
          <div className="sdm-card">
            <div className="sdm-card-header">
              <h3 className="sdm-section-title sdm-section-title-upper">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1 10L4.5 5.5l3 2.5L12 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                TRENDING TOPICS
              </h3>
            </div>
            <ol className="sdm-trend-list">
              {TRENDING.map(t => (
                <li key={t.rank} className="sdm-trend-item">
                  <span className="sdm-trend-rank">{t.rank}</span>
                  <span className="sdm-trend-name">{t.name}</span>
                  <MiniSpark data={t.spark} color="#9ca3af" />
                  <span className="sdm-metric-trend-up">{t.pct}</span>
                  <span className="sdm-trend-count">{t.count}</span>
                  {t.isNew
                    ? <span className="sdm-trend-new">NEW</span>
                    : <span className="sdm-trend-arrow">↑</span>}
                </li>
              ))}
            </ol>
          </div>

          {/* DATASET ACTIVITY */}
          <div className="sdm-card">
            <div className="sdm-card-header">
              <h3 className="sdm-section-title sdm-section-title-upper">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <ellipse cx="6.5" cy="3.5" rx="5" ry="2" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M1.5 3.5v3c0 1.1 2.2 2 5 2s5-.9 5-2v-3" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M1.5 6.5v3c0 1.1 2.2 2 5 2s5-.9 5-2v-3" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
                DATASET ACTIVITY
              </h3>
            </div>
            <div className="sdm-dataset-list">
              {DATASETS.map((d, i) => (
                <div key={i} className="sdm-dataset-item">
                  <div className="sdm-dataset-left">
                    <span className="sdm-dataset-name">{d.name}</span>
                    <span className="sdm-dataset-org">{d.org} · {d.papers} papers</span>
                  </div>
                  <div className="sdm-dataset-right">
                    <span className="sdm-dataset-tag">{d.tag}</span>
                    <span className="sdm-metric-trend-up">{d.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MODEL TRACKER */}
          <div className="sdm-card">
            <div className="sdm-card-header">
              <h3 className="sdm-section-title sdm-section-title-upper">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1" y="1" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M4 6.5h5M6.5 4v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                MODEL TRACKER
              </h3>
            </div>
            <div className="sdm-model-list">
              {MODELS.map((m, i) => (
                <div key={i} className="sdm-model-item">
                  <div className="sdm-model-header-row">
                    <span className="sdm-model-name">{m.name}</span>
                    <span className="sdm-model-params">{m.params}</span>
                    <span className="sdm-model-stars">★ {m.stars}</span>
                  </div>
                  <p className="sdm-model-desc">{m.desc}</p>
                  <div className="sdm-model-footer">
                    <span className="sdm-model-tag" style={{ background: m.tagColor + '22', color: m.tagColor }}>{m.tag}</span>
                    <span className="sdm-model-org">{m.org}</span>
                    <span className="sdm-model-time">⏱ {m.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RESEARCH HOTSPOTS */}
          <div className="sdm-card">
            <div className="sdm-card-header">
              <h3 className="sdm-section-title sdm-section-title-upper">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M6.5 1C4 1 1.5 3 1.5 5.5c0 3.5 5 7 5 7s5-3.5 5-7C11.5 3 9 1 6.5 1z" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
                RESEARCH HOTSPOTS
              </h3>
            </div>
            <div className="sdm-hotspot-list">
              {HOTSPOTS.map((h, i) => (
                <div key={i} className="sdm-hotspot-item">
                  <div className="sdm-hotspot-top">
                    <span className="sdm-hotspot-name">{h.name}</span>
                    <span className="sdm-hotspot-level" style={{ color: h.levelColor }}>● {h.level}</span>
                  </div>
                  <div className="sdm-hotspot-bar-track">
                    <div className="sdm-hotspot-bar-fill" style={{ width: `${h.bar}%`, background: h.levelColor }} />
                  </div>
                  <div className="sdm-hotspot-bottom">
                    <span className="sdm-hotspot-city">📍 {h.city}</span>
                    <a href="#" className="sdm-hotspot-topic" style={{ color: h.topicColor }}>{h.topic}</a>
                    <span className="sdm-hotspot-papers">{h.papers} papers</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}


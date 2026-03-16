const DAYS = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Simple static data for two series (papers, models)
const SERIES_A = [68, 70, 78, 76, 69, 85]
const SERIES_B = [40, 42, 46, 45, 41, 52]

function buildPath(values: number[], height: number, width: number): string {
  const step = width / (values.length - 1)
  const max = 100
  return values
    .map((v, i) => {
      const x = i * step
      const y = height - (v / max) * height
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
}

export function ResearchActivityChart() {
  const width = 520
  const height = 160
  const pathA = buildPath(SERIES_A, height, width)
  const pathB = buildPath(SERIES_B, height, width)

  return (
    <div className="sdm-chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Research activity trend over the last 7 days"
      >
        <defs>
          <linearGradient id="sdm-activity-a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sdm-activity-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d={`${pathA} L ${width} ${height} L 0 ${height} Z`}
          fill="url(#sdm-activity-a)"
          className="sdm-chart-area-a"
        />
        <path
          d={`${pathB} L ${width} ${height} L 0 ${height} Z`}
          fill="url(#sdm-activity-b)"
          className="sdm-chart-area-b"
        />
        <path d={pathA} className="sdm-chart-line-a" fill="none" />
        <path d={pathB} className="sdm-chart-line-b" fill="none" />
      </svg>

      <div className="sdm-chart-xaxis">
        {DAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
    </div>
  )
}


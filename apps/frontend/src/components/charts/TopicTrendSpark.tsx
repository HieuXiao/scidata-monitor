type TopicTrendSparkProps = {
  value: number
}

export function TopicTrendSpark({ value }: TopicTrendSparkProps) {
  // value is percentage increase, map to bar height
  const clamped = Math.min(Math.max(value, 0), 200)
  const height = 26
  const barHeight = (clamped / 200) * height

  return (
    <svg
      className="sdm-topic-spark"
      viewBox="0 0 40 26"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="2"
        y={height - barHeight}
        width="12"
        height={barHeight}
        rx="3"
        className="sdm-topic-spark-bar"
      />
      <polyline
        points="18,18 26,12 36,6"
        className="sdm-topic-spark-line"
        fill="none"
      />
    </svg>
  )
}


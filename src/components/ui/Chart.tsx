import React, { useMemo } from 'react';

interface ChartProps {
  type?: 'area' | 'bar';
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
}

export const Chart: React.FC<ChartProps> = ({
  type = 'area',
  data,
  height = 160,
  color = '#0EA5E9',
}) => {
  const values = useMemo(() => data.map((d) => d.value), [data]);
  const labels = useMemo(() => data.map((d) => d.label), [data]);

  const maxVal = useMemo(() => Math.max(...values, 1), [values]);
  const minVal = useMemo(() => Math.min(...values, 0), [values]);
  const range = maxVal - minVal;

  // Layout positions
  const paddingLeft = 32;
  const paddingRight = 12;
  const paddingTop = 12;
  const paddingBottom = 28;

  const renderAreaChart = () => {
    const chartWidth = 400; // SVG coordinates are relative/scalable
    const chartHeight = height;

    const usableWidth = chartWidth - paddingLeft - paddingRight;
    const usableHeight = chartHeight - paddingTop - paddingBottom;

    const points = data.map((item, index) => {
      const x = paddingLeft + (index / (data.length - 1)) * usableWidth;
      const y = paddingTop + usableHeight - ((item.value - minVal) / range) * usableHeight;
      return { x, y };
    });

    const pathData = points
      .map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x},${p.y}`)
      .join(' ');

    const areaPathData = `
      ${pathData}
      L ${points[points.length - 1].x},${chartHeight - paddingBottom}
      L ${points[0].x},${chartHeight - paddingBottom}
      Z
    `;

    return (
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.00" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {Array.from({ length: 4 }).map((_, idx) => {
          const y = paddingTop + (idx / 3) * usableHeight;
          return (
            <line
              key={idx}
              x1={paddingLeft}
              y1={y}
              x2={chartWidth - paddingRight}
              y2={y}
              stroke="var(--border-light)"
              strokeWidth="0.75"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Fill Area */}
        <path d={areaPathData} fill="url(#chart-area-grad)" />

        {/* Line Stroke */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Tooltip dots */}
        {points.map((p, idx) => (
          <circle
            key={idx}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#FFFFFF"
            stroke={color}
            strokeWidth="1.75"
            style={{
              transition: 'all var(--transition-fast)',
              cursor: 'pointer',
            }}
          />
        ))}

        {/* X Axis Labels */}
        {points.map((p, idx) => {
          if (idx % 2 !== 0 && idx !== points.length - 1 && idx !== 0) return null; // Show sparse labels
          return (
            <text
              key={idx}
              x={p.x}
              y={chartHeight - 8}
              textAnchor="middle"
              fill="var(--text-tertiary)"
              style={{ fontSize: '9px', fontWeight: 500 }}
            >
              {labels[idx]}
            </text>
          );
        })}

        {/* Y Axis Max / Min */}
        <text
          x={paddingLeft - 8}
          y={paddingTop + 4}
          textAnchor="end"
          fill="var(--text-tertiary)"
          style={{ fontSize: '9px', fontWeight: 600 }}
        >
          {maxVal}
        </text>
        <text
          x={paddingLeft - 8}
          y={chartHeight - paddingBottom + 2}
          textAnchor="end"
          fill="var(--text-tertiary)"
          style={{ fontSize: '9px', fontWeight: 600 }}
        >
          {minVal}
        </text>
      </svg>
    );
  };

  const renderBarChart = () => {
    const chartWidth = 400;
    const chartHeight = height;

    const usableWidth = chartWidth - paddingLeft - paddingRight;
    const usableHeight = chartHeight - paddingTop - paddingBottom;
    const barWidth = (usableWidth / data.length) * 0.65;
    const barGap = (usableWidth / data.length) * 0.35;

    return (
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        {/* Grid lines */}
        {Array.from({ length: 4 }).map((_, idx) => {
          const y = paddingTop + (idx / 3) * usableHeight;
          return (
            <line
              key={idx}
              x1={paddingLeft}
              y1={y}
              x2={chartWidth - paddingRight}
              y2={y}
              stroke="var(--border-light)"
              strokeWidth="0.75"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Bars */}
        {data.map((item, index) => {
          const x = paddingLeft + index * (barWidth + barGap) + barGap / 2;
          const barHeight = ((item.value - minVal) / range) * usableHeight;
          const y = paddingTop + usableHeight - barHeight;

          return (
            <g key={index} style={{ cursor: 'pointer' }}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(2, barHeight)}
                fill={color}
                rx="3"
                ry="3"
                style={{
                  transition: 'all var(--transition-fast)',
                }}
              />
              <text
                x={x + barWidth / 2}
                y={chartHeight - 8}
                textAnchor="middle"
                fill="var(--text-tertiary)"
                style={{ fontSize: '9px', fontWeight: 500 }}
              >
                {item.label}
              </text>
            </g>
          );
        })}

        {/* Y Axis Max / Min */}
        <text
          x={paddingLeft - 8}
          y={paddingTop + 4}
          textAnchor="end"
          fill="var(--text-tertiary)"
          style={{ fontSize: '9px', fontWeight: 600 }}
        >
          {maxVal}
        </text>
        <text
          x={paddingLeft - 8}
          y={chartHeight - paddingBottom + 2}
          textAnchor="end"
          fill="var(--text-tertiary)"
          style={{ fontSize: '9px', fontWeight: 600 }}
        >
          {minVal}
        </text>
      </svg>
    );
  };

  return (
    <div style={{ width: '100%', height: `${height}px`, position: 'relative' }}>
      {type === 'area' ? renderAreaChart() : renderBarChart()}
    </div>
  );
};

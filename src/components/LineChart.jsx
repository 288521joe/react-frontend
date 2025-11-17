import React from "react";

/**
 * Simple SVG line chart placeholder.
 * Accepts strokeColor & gridColor props for theming.
 */
export default function LineChart({ strokeColor = "var(--accent)", gridColor = "var(--card-border)" }) {
  // generate a smooth sine-like path
  const width = 800;
  const height = 240;
  const points = [];
  for (let i = 0; i <= 40; i++) {
    const x = (i / 40) * width;
    const y = 80 + Math.sin((i / 40) * Math.PI * 2) * 60;
    points.push([x, y]);
  }
  const d = points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");

  return (
    <div className="w-full h-full">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full">
        {/* grid lines */}
        {[0,1,2,3,4].map(i => (
          <line key={i} x1="0" x2={width} y1={(i/4)*(height-40)+20} y2={(i/4)*(height-40)+20} stroke={gridColor} strokeWidth="1" opacity="0.6"/>
        ))}

        {/* area (filled faint) */}
        <path d={`${d} L ${width} ${height} L 0 ${height} Z`} fill={`${strokeColor}`} opacity="0.06" />

        {/* stroke */}
        <path d={d} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* small left margin label */}
        <text x="6" y="16" fill="var(--text-mid)" fontSize="12">6.0</text>
      </svg>
    </div>
  );
}

import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LineChart() {
  // Dummy data — replace with your live data
  const data = [
    { x: 1, y: 4 },
    { x: 2, y: 5 },
    { x: 3, y: 3 },
    { x: 4, y: 6 },
    { x: 5, y: 4 },
  ];

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <XAxis dataKey="x" hide />
          <YAxis hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}

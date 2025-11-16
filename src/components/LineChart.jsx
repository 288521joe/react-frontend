import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function LineChart({ label }) {
  const data = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label,
        data: [10, 12, 11, 14, 13],
        borderWidth: 2,
        borderColor: "rgba(0, 120, 255, 1)",
        tension: 0.3,
        pointRadius: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
}

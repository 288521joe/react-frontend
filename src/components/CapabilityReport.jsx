import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function CapabilityReport() {
  // sample histogram bins (replace later with backend values)
  const data = {
    labels: ["27.5", "27.7", "27.9", "28.1", "28.3", "28.5"],
    datasets: [
      {
        label: "Histogram",
        data: [5, 12, 25, 18, 10, 4],
        backgroundColor: "rgba(0, 120, 255, 0.5)",
        borderColor: "rgba(0, 120, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="space-y-4 w-[600px]">

      <h2 className="text-2xl font-bold mb-4">
        Capability Report
      </h2>

      {/* Capability values */}
      <div className="grid grid-cols-3 gap-4 bg-gray-100 p-4 rounded-xl">
        <div>
          <p className="font-bold">Mean:</p>
          <p>28.12</p>
        </div>
        <div>
          <p className="font-bold">Std Dev:</p>
          <p>0.11</p>
        </div>
        <div>
          <p className="font-bold">Cp:</p>
          <p>1.32</p>
        </div>
        <div>
          <p className="font-bold">Cpk:</p>
          <p>1.25</p>
        </div>
        <div>
          <p className="font-bold">LSL:</p>
          <p>27.50</p>
        </div>
        <div>
          <p className="font-bold">USL:</p>
          <p>28.50</p>
        </div>
      </div>

      {/* Histogram */}
      <div className="bg-white p-4 rounded-xl shadow h-[300px]">
        <Bar data={data} options={options} />
      </div>

    </div>
  );
}

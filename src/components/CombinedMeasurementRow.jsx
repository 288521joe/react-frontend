import React from "react";
import LineChart from "./LineChart";

export default function CombinedMeasurementRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

      {/* Card 1 */}
      <div className="border rounded-xl p-4 bg-white shadow-md flex flex-col">
        <h2 className="text-2xl font-semibold mb-3">Diameter 1</h2>

        <div className="w-full aspect-[2/1] mb-4">
          <LineChart />
        </div>

        <Stats />
      </div>

      {/* Card 2 */}
      <div className="border rounded-xl p-4 bg-white shadow-md flex flex-col">
        <h2 className="text-2xl font-semibold mb-3">Diameter 2</h2>

        <div className="w-full aspect-[2/1] mb-4">
          <LineChart />
        </div>

        <Stats />
      </div>

    </div>
  );
}

function Stats() {
  return (
    <div className="grid grid-cols-5 text-center items-center">
      <div><p className="text-sm text-gray-500">Min</p><p className="text-2xl font-bold">-9</p></div>
      <div><p className="text-sm text-gray-500">Max</p><p className="text-2xl font-bold">9</p></div>
      <div><p className="text-sm text-gray-500">Dia</p><p className="text-2xl font-bold">5</p></div>
      <div><p className="text-sm text-gray-500">Runout</p><p className="text-2xl font-bold">7</p></div>
      <div className="flex justify-center"><div className="w-10 h-10 bg-green-600 rounded"></div></div>
    </div>
  );
}

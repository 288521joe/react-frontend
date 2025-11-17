import React from "react";
import LineChart from "./LineChart";

export default function CombinedMeasurementRow({ mode = "two" }) {
  const showTwo = mode === "two";

  return (
    <div className={`grid gap-4 w-full ${showTwo ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
      <Card title="Diameter 1" />
      {showTwo && <Card title="Diameter 2" />}
    </div>
  );
}

function Card({ title }) {
  return (
    // fixed height, flex column, hide overflow so chart cannot spill out
    <div className="border rounded-xl p-4 bg-white shadow-md flex flex-col h-[370px] overflow-hidden">
      <div className="grid grid-cols-2 items-start">
        <h2 className="text-1xl font-semibold">{title}</h2>

        <div className="flex justify-end">
          <div className="w-8 h-8 bg-green-600 rounded-xl shadow-sm"></div>
        </div>
      </div>

      {/* Chart container: fixed height, doesn't grow past the card */}
      <div className="w-full h-[250px] mb-2">
        <LineChart />
      </div>

      {/* Push stats to bottom so layout is stable */}
      <div className="mt-auto">
        <Stats />
      </div>
    </div>
  );
}

function Stats() {
  return (
    <div className="grid grid-cols-8 text-center items-center">
      <div><p className="text-sm text-gray-500">Min</p></div>
      <div><p className="text-5xl font-bold">-9</p></div>

      <div><p className="text-sm text-gray-500">Max</p></div>
      <div><p className="text-5xl font-bold">9</p></div>

      <div><p className="text-sm text-gray-500">Dia</p></div>
      <div><p className="text-5xl text-red-700 font-bold">5</p></div>

      <div><p className="text-sm text-gray-500">Runout</p></div>
      <div><p className="text-5xl font-bold">7</p></div>
    </div>
  );
}

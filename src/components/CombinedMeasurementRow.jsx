import React from "react";
import LineChart from "./LineChart";

export default function CombinedMeasurementRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

      {/* Card 1 */}
      <div className="border rounded-xl p-4 bg-white shadow-md flex flex-col">

        <div className="grid grid-cols-2 items-center">
          <div>
            <h2 className="text-1xl font-semibold text-left mb-2">Diameter 1</h2>
            
          </div>

          <div className="flex justify-end">
            <div className="w-8 h-8 bg-green-600 rounded-xl shadow-sm"></div>
          </div>
        </div>

        <div className="w-full aspect-[2/1] mb-2">
          <LineChart />
        </div>

        <Stats />
      </div>

      {/* Card 2 */}
      <div className="border rounded-xl p-4 bg-white shadow-md flex flex-col">

        <div className="grid grid-cols-2 items-center">
          <div>
            <h2 className="text-1xl font-semibold text-left mb-2">Diameter 2</h2>
          </div>

          <div className="flex justify-end">
            <div className="w-8 h-8 bg-green-600 rounded-xl "></div>
          </div>
        </div>

        <div className="w-full aspect-[2/1] mb-2">
          <LineChart />
        </div>

        <Stats />
      </div>

    </div>
  );
}

function Stats() {
  return (
    <div className="grid grid-cols-8 text-center items-center">

      <div>
        <p className="text-sm text-gray-500">Min</p>
      </div>
      <div>
        <p className="text-5xl font-bold flex flex-left">-9</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Max</p>
      </div>
      <div>
        <p className="text-5xl font-bold flex flex-left">9</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Dia</p>
      </div>
      <div>
        <p className="text-5xl text-red-700 font-bold flex flex-left">5</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Runout</p>
      </div>
      <div>
        <p className="text-5xl font-bold flex flex-left">7</p>
      </div>

    </div>
  );
}

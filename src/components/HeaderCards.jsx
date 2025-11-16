import Card from "./Card";

export default function HeaderCards({ currentModel, plcSignal }) {
  return (
    <div className="grid grid-cols-5 gap-4">

      {/* Card 1: Machine */}
      <Card title="M/C">
        IDS-HT-80-2
      </Card>

      {/* Card 2: Running Model */}
      <Card title="Running Model">
        {currentModel || "None"}
      </Card>

      {/* Card 3: Date & Time — NO TITLE */}
      <div className="bg-white text-1xl p-4 rounded-xl shadow text-center">
        {new Date().toLocaleDateString()} <br />
        {new Date().toLocaleTimeString()}
      </div>

      {/* Card 4: PLC Connection — NO TITLE */}
      <div className="bg-white p-4 rounded-xl shadow text-center flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full ${
            plcSignal ? "bg-green-600" : "bg-red-600"
          }`}
        ></div>

        <p className="mt-1 text-sm font-semibold">
          {plcSignal ? "Connected" : "Disconnected"}
        </p>
      </div>

    </div>
  );
}

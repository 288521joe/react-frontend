import React from "react";
import Card from "./Card";

export default function HeaderCards({ currentModel, plcSignal }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card title="M/C">
        <div className="text-2xl font-semibold text-[var(--text-dark)]">IDS-HT-80-2</div>
      </Card>

      <Card title="Running Model">
        <div className="text-2xl font-semibold text-[var(--text-dark)]">{currentModel || "None"}</div>
      </Card>

      <div className="card-surface p-4 flex flex-col items-center justify-center">
        <div className="text-lg font-semibold text-[var(--text-mid)]">
          {new Date().toLocaleDateString()}
        </div>
        <div className="text-lg font-semibold text-[var(--text-dark)]">
          {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="card-surface p-4 flex flex-col items-center justify-center">
        <div className={`w-8 h-8 rounded-full ${plcSignal ? "bg-[var(--ok)]" : "bg-[var(--ng)]"}`}></div>
        <div className="mt-2 text-sm text-[var(--text-mid)]">
          {plcSignal ? "Connected" : "Disconnected"}
        </div>
      </div>
    </div>
  );
}

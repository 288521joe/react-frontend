import React from "react";
import LineChart from "./LineChart";

export default function CombinedMeasurementRow({ mode = "two" }) {
  const showTwo = mode === "two";

  return (
    <div className={`grid gap-4 w-full ${showTwo ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
      <CardStyled title="Diameter 1" />
      {showTwo && <CardStyled title="Diameter 2" />}
    </div>
  );
}

function CardStyled({ title }) {
  return (
    <div className="card-surface p-3 rounded-md flex flex-col h-[380px] overflow-hidden">
      <div className="flex items-start justify-between mb-2">
        <div className="text-sm font-semibold text-[var(--text-dark)]">{title}</div>
        <div className="w-8 h-8 rounded-sm bg-[var(--ok)]"></div>
      </div>

      <div className="w-full h-[220px] mb-2">
        <LineChart strokeColor="var(--accent)" gridColor="var(--card-border)" />
      </div>

      <div className="mt-auto">
        <div className="grid grid-cols-8 text-center items-center">
          <div><p className="text-xs text-[var(--text-mid)]">Min</p></div>
          <div><p className="text-3xl font-bold text-[var(--text-dark)]">-9</p></div>

          <div><p className="text-xs text-[var(--text-mid)]">Max</p></div>
          <div><p className="text-3xl font-bold text-[var(--text-dark)]">9</p></div>

          <div><p className="text-xs text-[var(--text-mid)]">Dia</p></div>
          <div><p className="text-3xl font-bold text-[var(--ng)]">5</p></div>

          <div><p className="text-xs text-[var(--text-mid)]">Runout</p></div>
          <div><p className="text-3xl font-bold text-[var(--text-dark)]">7</p></div>
        </div>
      </div>
    </div>
  );
}

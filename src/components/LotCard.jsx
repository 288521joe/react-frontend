import React from "react";

export default function LotCard() {
  return (
    <div className="card-surface p-4 rounded-md flex flex-col justify-between h-full">
      <div>
        <h4 className="text-lg font-semibold text-[var(--text-dark)]">LOT mark code</h4>

        <div className="mt-4 bg-white border border-[var(--card-border)] rounded-md h-56 flex items-center justify-center text-[var(--text-mid)]">
          QR code Image
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#f07f2a] rounded-sm"></div>
        <div className="text-sm text-[var(--text-dark)]">LOT mark Error</div>
      </div>
    </div>
  );
}

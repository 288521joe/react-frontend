import React from "react";
import FooterButton from "./FooterButton";

export default function Footer({ onModel, onCapability, onResult, onToggleMode }) {
  return (
    <div className="w-full py-6 border-t border-[var(--card-border)] bg-[var(--bg)] flex justify-center">
      <div className="w-full max-w-6xl px-6 flex items-center justify-between gap-6">
        <div className="flex gap-4">
          <FooterButton text="MODEL" onClick={onModel} />
          <FooterButton text="CAPABILITY" onClick={onCapability} />
          <FooterButton text="RESULT" onClick={onResult} />
        </div>

        <div className="flex gap-6 flex items-end">
          <FooterButton text="1 / 2 MODE" onClick={onToggleMode} />
          <FooterButton text="1 / 2 MODE" onClick={onToggleMode} />
        </div>
      </div>
    </div>
  );
}

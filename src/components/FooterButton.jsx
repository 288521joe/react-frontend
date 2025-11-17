import React from "react";

export default function FooterButton({ text, onClick, small = false }) {
  // square tile style
  return (
    <button
      onClick={onClick}
      className={`footer-tile flex items-center justify-center gap-2 w-36 h-20
        bg-[var(--card-bg)] border border-[var(--card-border)] rounded-md shadow-lg
        text-lg font-semibold text-[var(--text-dark)]
        hover:bg-white transition`}
      aria-label={text}
      title={text}
    >
      <span>{text}</span>
    </button>
  );
}

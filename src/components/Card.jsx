import React from "react";

export default function Card({ title, children, className = "" }) {
  return (
    <div className={`card-surface p-4 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-[var(--text-dark)]">{title}</h3>
          {/* small chevron placeholder */}
          <div className="w-7 h-7 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm flex items-center justify-center text-[var(--text-mid)]">
            ›
          </div>
        </div>
      )}

      <div>{children}</div>
    </div>
  );
}

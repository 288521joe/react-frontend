import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Gauge({ quality, total, ok, ng, qrError = 10 }) {
  // sanitize inputs
  quality = Number(quality) || 80;
  total   = Number(total)   || 100;
  ok      = Number(ok)      || 80;
  ng      = Number(ng)      || 20;
  qrError = Number(qrError);

  const radius = 120;
  const stroke = 18;
  const circumference = Math.PI * radius;

  const [anim, setAnim] = useState(0);
  const animRef = useRef(null);
  const navigate = useNavigate();

  // Smooth animation
  useEffect(() => {
    const duration = 600;
    const start = performance.now();
    const initial = anim;

    const animate = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const val = initial + (quality - initial) * p;
      setAnim(val);
      if (p < 1) animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [quality]);

  const progress = (anim / 100) * circumference;

  return (
    <div className="card-surface p-3 rounded-md h-full">

      {/* 3 columns layout */}
      <div className="grid grid-cols-3 gap-3 h-full">

        {/* LEFT — Gauge */}
        <div className="border border-[var(--card-border)] rounded-md p-2 bg-white flex flex-col items-center justify-center relative">
        </div>

        {/* CENTER — 2×2 MATRIX */}
        <div className="border border-[var(--card-border)] rounded-md p-4 bg-white flex items-center justify-center">
          <div className="grid grid-cols-2 gap-y-10 gap-x-20 text-center">

            {/* Total */}
            <div>
              <p className="text-sm text-[var(--text-mid)]">Total count</p>
              <p className="text-5xl font-semibold text-[var(--text-dark)]">{total}</p>
            </div>

            {/* OK */}
            <div>
              <p className="text-sm text-[var(--text-mid)] ">OK</p>
              <p className="text-5xl font-bold text-[var(--ok)] mt-1">{ok}</p>
            </div>

            {/* NG */}
            <div>
              <p className="text-sm text-[var(--text-mid)]">NG</p>
              <p className="text-5xl font-bold text-[var(--ng)]">{ng}</p>
            </div>

            {/* QR ERROR */}
            <div>
              <p className="text-sm text-[var(--text-mid)]">QR error</p>
              <p className="text-5xl font-bold text-[var(--ng)]">{qrError}</p>
            </div>

          </div>
        </div>

        {/* RIGHT — QR ERROR BLOCK */}
        <div className="border border-[var(--card-border)] rounded-md p-3 bg-white flex flex-col items-center justify-center">
          <div className="text-sm text-[var(--text-mid)]">QR Error Count</div>
          <div className="text-5xl font-bold text-[var(--accent)] mt-3">{qrError}</div>

          <button
            onClick={() => navigate("/error-list")}
            className="mt-4 px-6 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-md font-semibold text-[var(--text-dark)]"
          >
            Error list
          </button>
        </div>

      </div>
    </div>
  );
}

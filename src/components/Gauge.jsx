import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Gauge({ quality, total, ok, ng }) {
  // sanitize inputs
  quality = Number(quality) || 80;
  total = Number(total) || 100;
  ok = Number(ok) || 80;
  ng = Number(ng) || 20;

  const radius = 120;
  const stroke = 22;
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
    <div className="w-full h-full bg-white rounded-xl flex flex-col">

      {/* 3 sections aligned like other cards */}
      <div className="grid grid-cols-3 gap-4 h-full">

        {/* LEFT: Responsive Gauge */}
        <div className="relative rounded-xl bg-white p-2 flex flex-col  border border-gray-200 ">

          {/* Left–aligned text overlay */}
          <p className="absolute top-3 left-4 text-lg font-semibold text-gray-700 z-10">
            Quality
          </p>

          {/* Full-size gauge */}
          <div className="w-full h-full relative flex items-center justify-center">

            <svg
              className="w-full h-full"
              viewBox="0 0 330 200"
              preserveAspectRatio="none"
            >
              <g transform="translate(165,140)">
                {/* Background arc */}
                <path
                  d="M -120 0 A 120 120 0 0 1 120 0"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                />

                {/* Animated arc */}
                <path
                  d="M -120 0 A 120 120 0 0 1 120 0"
                  fill="none"
                  stroke="#facc15"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={`${progress} ${circumference}`}
                  style={{ transition: "stroke-dasharray 0.25s linear" }}
                />
              </g>
            </svg>

            {/* Labels 0–100 */}
            <p className="absolute bottom-1 left-8 text-gray-600 text-base font-semibold">0</p>
            <p className="absolute bottom-1 right-7 text-gray-600 text-base font-semibold">100</p>

            {/* Center animated value */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-5xl md:text-6xl font-bold">{Math.round(anim)}%</p>
            </div>
          </div>
        </div>

        {/* CENTER: Total Count */}
        <div className="rounded-xl bg-white p-3 flex flex-col justify-center items-center border border-gray-200 shadow-sm">
          <p className="text-lg font-semibold text-gray-700 mb-2">Total Count</p>
          <p className="text-6xl font-bold mb-6">{total}</p>

          <div className="w-full flex justify-center gap-20">
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-700">OK</p>
              <p className="text-6xl font-bold text-green-600">{ok}</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-700">NG</p>
              <p className="text-6xl font-bold text-red-600">{ng}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Error parts */}
        <div className="rounded-xl bg-white p-3 flex flex-col justify-center items-center border border-gray-200 shadow-sm">
          
          <div className="mb-4 text-center">
            <p className="text-lg font-semibold text-gray-700">QR Error Count</p>
            <p className="text-6xl font-bold text-yellow-600">{ok}</p>
          </div>

          <button
            onClick={() => navigate("/error-list")}
            className="text-2xl font-bold mt-4 px-20 py-4 bg-gray-300 text-white rounded-lg shadow hover:bg-slate-700 transition"
          >
            Error list
          </button>

        </div>



      </div>

    </div>
  );
}

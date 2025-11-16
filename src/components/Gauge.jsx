import { useEffect, useRef, useState } from "react";

export default function Gauge({ quality, total, ok, ng }) {
  // sanitize inputs
  quality = Number(quality) || 0;
  total = Number(total) || 0;
  ok = Number(ok) || 0;
  ng = Number(ng) || 0;

  const radius = 120;
  const stroke = 22;
  const circumference = Math.PI * radius;

  const [anim, setAnim] = useState(0);
  const animRef = useRef(null);

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
    <div className="grid grid-cols-3 gap-4 mt-4">

      {/* LEFT: Responsive Gauge */}
      <div className="border border-gray-300 rounded-xl bg-white p-6 flex flex-col">

        <p className="text-lg font-semibold text-gray-700 mb-2">Quality</p>

        <div className="w-full max-w-[350px] mx-auto relative aspect-[1.7/1]">

          <svg className="w-full h-full" viewBox="0 0 330 200" preserveAspectRatio="xMidYMid meet">
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

          {/* 0 and 100 labels */}
          <p className="absolute bottom-1 left-4 text-gray-600 text-base font-semibold">0</p>
          <p className="absolute bottom-1 right-4 text-gray-600 text-base font-semibold">100</p>

          {/* Center Value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-5xl md:text-6xl font-bold">{Math.round(anim)}%</p>
          </div>
        </div>
      </div>

      {/* CENTER: Total Count */}
      <div className="border border-gray-300 rounded-xl bg-white p-6 flex flex-col">
        <p className="text-lg font-semibold text-gray-700 mb-2">Total Count</p>

        <div className="flex-grow flex items-center justify-center">
          <p className="text-6xl font-bold">{total}</p>
        </div>
      </div>

      {/* RIGHT: OK/NG */}
      <div className="border border-gray-300 rounded-xl bg-white p-6 flex flex-col justify-start">

        <div className="mb-8">
          <p className="text-lg font-semibold text-gray-700">OK</p>
          <p className="text-5xl font-bold text-green-600">{ok}</p>
        </div>

        <div>
          <p className="text-lg font-semibold text-gray-700">NG</p>
          <p className="text-5xl font-bold text-red-600">{ng}</p>
        </div>
      </div>

    </div>
  );
}

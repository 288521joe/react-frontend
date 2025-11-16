import { useState, useEffect } from "react";

export default function PinInput({ onSubmit, onClose, error, clearError }) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [shake, setShake] = useState(false);

  const addDigit = (num) => {
    if (clearError) clearError(); // remove error when typing again

    const index = digits.findIndex((d) => d === "");
    if (index === -1) return;

    const next = [...digits];
    next[index] = num;
    setDigits(next);
  };

  const clearOne = () => {
    if (clearError) clearError();

    const index = digits.slice().reverse().findIndex((d) => d !== "");
    if (index === -1) return;

    const pos = 3 - index;
    const next = [...digits];
    next[pos] = "";
    setDigits(next);
  };

  const resetAll = () => {
    if (clearError) clearError();
    setDigits(["", "", "", ""]);
  };

  const handleSubmit = async () => {
    const pin = digits.join("");

    if (pin.length < 4) return;

    const ok = await onSubmit(pin);

    if (!ok) {
      // Shake animation for incorrect PIN
      setShake(true);
      setTimeout(() => setShake(false), 300);

      resetAll();
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (clearError) clearError();

      if (e.key >= "0" && e.key <= "9") addDigit(e.key);
      if (e.key === "Backspace") clearOne();
      if (e.key === "Enter") handleSubmit();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [digits]);

  return (
    <div className="space-y-5 w-full mx-auto">

      {/* Animated PIN circles */}
      <div className={`flex justify-center gap-4 ${shake ? "animate-shake" : ""}`}>
        {digits.map((d, i) => (
          <div
            key={i}
            className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center bg-white shadow text-4xl"
          >
            {d ? <div className="w-4 h-4 bg-black rounded-full"></div> : ""}
          </div>
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-center font-semibold -mt-3">
          {error}
        </p>
      )}

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-4">

        {[1,2,3,4,5,6,7,8,9].map((n) => (
          <button
            key={n}
            onClick={() => addDigit(String(n))}
            className="bg-gray-200 h-14 text-2xl rounded-xl shadow active:scale-95"
          >
            {n}
          </button>
        ))}

        <button
          onClick={resetAll}
          className="bg-red-300 h-14 text-lg rounded-xl shadow active:scale-95"
        >
          Reset
        </button>

        <button
          onClick={() => addDigit("0")}
          className="bg-gray-200 h-14 text-2xl rounded-xl shadow active:scale-95"
        >
          0
        </button>

        <button
          onClick={clearOne}
          className="bg-yellow-300 h-14 text-lg rounded-xl shadow active:scale-95"
        >
          Clear
        </button>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white text-lg py-3 rounded-xl font-bold active:scale-95"
      >
        Submit
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        className="w-full bg-red-500 text-white text-lg py-3 rounded-xl font-bold active:scale-95"
      >
        Close
      </button>

    </div>
  );
}

import { useState } from "react";
import PinInput from "./PinInput";

export default function PasswordPrompt({ onSuccess, onClose }) {
  const [error, setError] = useState("");

  const handleSubmit = async (pin) => {
    const ok = await onSuccess(pin);

    if (!ok) {
      setError("Incorrect PIN");
      return false;
    }

    return true;
  };

  const clearError = () => {
    setError("");
  };

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white rounded-2xl p-6 shadow-md w-[340px] mx-auto">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Enter PIN
        </h2>

        <PinInput
          onSubmit={handleSubmit}
          onClose={onClose}
          error={error}
          clearError={clearError}
        />

      </div>
    </div>
  );
}

import { useState } from "react";
import PinInput from "./PinInput";

export default function ChangePassword({ onClose }) {
  const [step, setStep] = useState("old");
  const [oldPinValid, setOldPinValid] = useState(false);
  const [error, setError] = useState("");

  const verifyOldPin = async (pin) => {
    const file = await fetch("/password.txt");
    const correct = (await file.text()).trim();

    if (pin === correct) {
      setOldPinValid(true);
      setStep("new");
    } else {
      setError("Incorrect Old PIN");
    }
  };

  const saveNewPin = async (pin) => {
    if (pin.length !== 4) {
      setError("PIN must be 4 digits");
      return;
    }

    // ⚠ Browser cannot write to files directly.
    // So we store new PIN in localStorage as override.
    localStorage.setItem("passwordOverride", pin);
    onClose();
  };

  return (
    <div className="w-[300px] space-y-4">
      {step === "old" && (
        <>
          <h2 className="text-xl font-bold text-center">Enter Old PIN</h2>
          <PinInput onSubmit={verifyOldPin} error={error} />
        </>
      )}

      {step === "new" && (
        <>
          <h2 className="text-xl font-bold text-center">Enter New PIN</h2>
          <PinInput onSubmit={saveNewPin} error={error} />
        </>
      )}
    </div>
  );
}

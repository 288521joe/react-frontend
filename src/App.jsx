import { useState, useEffect } from "react";
import Card from "./components/Card";
import HeaderCards from "./components/HeaderCards";
import Gauge from "./components/Gauge";
import StatusBlock from "./components/StatusBlock";
import MeasurementsRow from "./components/MeasurementsRow";
import LineChart from "./components/LineChart";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import ModelList from "./components/ModelList";
import ResultTable from "./components/ResultTable";
import CapabilityReport from "./components/CapabilityReport";
import PasswordPrompt from "./components/PasswordPrompt";
import { useNavigate } from "react-router-dom";
import CombinedMeasurementRow from "./components/CombinedMeasurementRow";
import LotCard from "./components/LotCard";

export default function App() {

  const [openModel, setOpenModel] = useState(false);
  const [openCapability, setOpenCapability] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [currentModel, setCurrentModel] = useState("None");

  const [diameter1, setDiameter1] = useState(0);
  const [diameter2, setDiameter2] = useState(0);
  const [runout1, setRunout1] = useState(0);
  const [runout2, setRunout2] = useState(0);
  const [status, setStatus] = useState("OK");

  const [plcSignal, setPlcSignal] = useState(0);
    useEffect(() => {
    const t = setInterval(() => {
      setPlcSignal((p) => (p ? 0 : 0)); // always 0 → always blinking
    }, 500);

    return () => clearInterval(t);
  }, []);

  const navigate = useNavigate();

  const [askPasswordFor, setAskPasswordFor] = useState(null);

  // Validate pin
  const checkPassword = async (pin) => {
    const override = localStorage.getItem("passwordOverride");
    if (override && pin === override) return true;

    const file = await fetch("/password.txt");
    const filePass = (await file.text()).trim();
    return pin === filePass;
  };

  // Simulated live measurement feed
  useEffect(() => {
    const interval = setInterval(() => {
      const d1 = (28 + Math.random() * 0.3).toFixed(2);
      const d2 = (28 + Math.random() * 0.3).toFixed(2);
      const r1 = (0.10 + Math.random() * 0.05).toFixed(3);
      const r2 = (0.10 + Math.random() * 0.05).toFixed(3);

      setDiameter1(d1);
      setDiameter2(d2);
      setRunout1(r1);
      setRunout2(r2);

      if (d1 > 28.25 || d2 > 28.25) setStatus("NG");
      else setStatus("OK");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-4">

      {/* First Row */}
      <HeaderCards currentModel={currentModel} plcSignal={plcSignal} />

      <div className="flex gap-4 mt-4">
        <div className="flex-[3] bg-white rounded-xl p-5 border border-gray-300">
          <Gauge value={status === "OK" ? 80 : 20} />
        </div>

        <div className="flex-[1] flex">
          <StatusBlock status={status} />
        </div>
      </div>



      {/* Third Row — combined measurement */}
      <div className="flex gap-4 mt-4">

        {/* CombinedMeasurementRow — takes 3/4 width */}
        <div className="flex-[3] bg-white rounded-xl shadow p-2 flex flex-col">
          <CombinedMeasurementRow />
        </div>

        {/* LotCard — takes 1/4 width, same height because parent is flex */}
        <div className="flex-[1] flex">
          <LotCard />
        </div>

      </div>



      {/* Footer */}
      <Footer
        onModel={() => setAskPasswordFor("model")}
        onCapability={() => setAskPasswordFor("capability")}
        onResult={() => setAskPasswordFor("result")}
      />

      {/* Password Modal */}
      <Modal
        open={
          askPasswordFor === "model" ||
          askPasswordFor === "capability" ||
          askPasswordFor === "result"
        }
        onClose={() => setAskPasswordFor(null)}
      >

        <PasswordPrompt
          onSuccess={() => {
            if (askPasswordFor === "model") navigate("/models");
            if (askPasswordFor === "capability") navigate("/capability");
            if (askPasswordFor === "result") navigate("/results");

            setAskPasswordFor(null);
          }}
          onClose={() => setAskPasswordFor(null)}
        />
      </Modal>

      {/* Model Modal */}
      <Modal open={openModel} onClose={() => setOpenModel(false)}>
        <ModelList
          onSelect={(model) => {
            setCurrentModel(model);
            setOpenModel(false);
          }}
        />
      </Modal>

      {/* Capability Modal */}
      <Modal open={openCapability} onClose={() => setOpenCapability(false)}>
        <CapabilityReport />
      </Modal>

      {/* Result Modal */}
      <Modal open={openResult} onClose={() => setOpenResult(false)}>
        <ResultTable />
      </Modal>

    </div>
  );
}

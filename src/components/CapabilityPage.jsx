import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CapabilityPage() {
  const navigate = useNavigate();

  // default date = today in YYYY-MM-DD
  const [date, setDate] = useState(() => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  });

  const [feature, setFeature] = useState("diameter1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // capability results
  const [cp, setCp] = useState(null);
  const [cpk, setCpk] = useState(null);
  const [chart1, setChart1] = useState(null);
  const [chart2, setChart2] = useState(null);

  const fetchCapability = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        date,
        feature,
      });

      const res = await fetch(`/capability_analysis?${params.toString()}`);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setCp(data.cp ?? null);
      setCpk(data.cpk ?? null);
      setChart1(data.chart1 ?? null);
      setChart2(data.chart2 ?? null);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load capability data");
    } finally {
      setLoading(false);
    }
  };

  // Load whenever date or feature changes
  useEffect(() => {
    fetchCapability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, feature]);

  // Export PDF
  const exportPDF = () => {
    const params = new URLSearchParams({ date, feature });
    window.open(`/export_capability_pdf?${params.toString()}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Capability Analysis</h1>
            <p className="text-sm text-gray-500 mt-1">
              CP / CPK evaluation for the selected feature & date
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
            >
              ← Dashboard
            </button>

            <button
              onClick={exportPDF}
              className="bg-white border px-4 py-2 rounded-lg hover:shadow"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row md:items-center gap-4">

          {/* Date */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            />
          </div>

          {/* Feature */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Feature</label>
            <select
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="diameter1">Diameter 1</option>
              <option value="diameter2">Diameter 2</option>
              <option value="runout1">Runout 1</option>
              <option value="runout2">Runout 2</option>
            </select>
          </div>

        </div>

        {/* Data Section */}
        <div className="bg-white p-6 rounded-xl shadow relative">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <>
              {/* CP / CPK */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex-1">
                  <p className="text-gray-500 text-sm">Cp</p>
                  <p className="text-3xl font-bold text-blue-700">{cp ?? "--"}</p>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex-1">
                  <p className="text-gray-500 text-sm">Cpk</p>
                  <p className="text-3xl font-bold text-green-700">{cpk ?? "--"}</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Chart 1 */}
                <div className="border rounded-xl p-4 bg-gray-50">
                  <h2 className="text-lg font-semibold mb-3 text-gray-700">
                    Distribution Chart
                  </h2>
                  {chart1 ? (
                    <img
                      src={`data:image/png;base64,${chart1}`}
                      alt="Chart 1"
                      className="w-full rounded-lg shadow"
                    />
                  ) : (
                    <p className="text-center text-gray-400 py-12">No chart available</p>
                  )}
                </div>

                {/* Chart 2 */}
                <div className="border rounded-xl p-4 bg-gray-50">
                  <h2 className="text-lg font-semibold mb-3 text-gray-700">
                    Capability Chart
                  </h2>
                  {chart2 ? (
                    <img
                      src={`data:image/png;base64,${chart2}`}
                      alt="Chart 2"
                      className="w-full rounded-lg shadow"
                    />
                  ) : (
                    <p className="text-center text-gray-400 py-12">No chart available</p>
                  )}
                </div>

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

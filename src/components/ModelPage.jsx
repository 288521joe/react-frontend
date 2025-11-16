import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ModelPage.jsx
 * Matches actual DB structure:
 * model_id, model_name, lower_limit_1, upper_limit_1, lower_limit_2, upper_limit_2
 */

export default function ModelPage() {
  const navigate = useNavigate();

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingModel, setEditingModel] = useState(null);
  const [error, setError] = useState(null);

  const fetchModels = async () => {
    setLoading(true);

    try {
      const res = await fetch("/models");
      const data = await res.json();

      if (data.columns && data.rows) {
        const formatted = data.rows.map(row => {
          const obj = {};
          data.columns.forEach((col, i) => (obj[col] = row[i]));
          return obj;
        });
        setModels(formatted);
      } else {
        setError("Invalid backend response");
      }

    } catch (err) {
      setError("Failed to load models");
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchModels();
  }, []);


  const startEdit = (model) => {
    setEditingModel({ ...model });
  };

  const cancelEdit = () => {
    setEditingModel(null);
  };

  const saveEdit = async () => {
    try {
      const res = await fetch("/models/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingModel),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Update failed");

      await fetchModels();
      setEditingModel(null);
    } catch (err) {
      alert("Error saving model: " + err.message);
    }
  };

  const handleInput = (field, value) => {
    setEditingModel((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Model List</h1>
            <p className="text-sm text-gray-500">Edit tolerance limits for each model</p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
          >
            ← Dashboard
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

          {loading ? (
            <p className="text-center py-6 text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center py-6 text-red-600">{error}</p>
          ) : models.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No models found</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-2 text-left">Model</th>
                  <th className="px-4 py-2 text-left">Lower limit 1</th>
                  <th className="px-4 py-2 text-left">Upper limit 1</th>
                  <th className="px-4 py-2 text-left">Lower limit 2</th>
                  <th className="px-4 py-2 text-left">Upper limit 2</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {models.map((m, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{m.model_name}</td>
                    <td className="px-4 py-2">{m.lower_limit_1}</td>
                    <td className="px-4 py-2">{m.upper_limit_1}</td>
                    <td className="px-4 py-2">{m.lower_limit_2}</td>
                    <td className="px-4 py-2">{m.upper_limit_2}</td>

                    <td className="px-4 py-2">
                      <button
                        onClick={() => startEdit(m)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}

        </div>

        {/* Edit Panel */}
        {editingModel && (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold">Edit: {editingModel.model_name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {[
                ["lower_limit_1", "Dia 1 Min"],
                ["upper_limit_1", "Dia 1 Max"],
                ["lower_limit_2", "Dia 2 Min"],
                ["upper_limit_2", "Dia 2 Max"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label className="block text-sm text-gray-600">{label}</label>
                  <input
                    type="number"
                    value={editingModel[field]}
                    onChange={(e) => handleInput(field, e.target.value)}
                    className="border px-3 py-2 rounded-lg w-full"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={saveEdit}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="bg-red-500 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

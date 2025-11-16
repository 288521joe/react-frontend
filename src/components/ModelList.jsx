export default function ModelList({ onSelect }) {
  const models = [
    "MODEL-A1",
    "MODEL-A2",
    "MODEL-B5",
    "MODEL-C2",
    "MODEL-X9"
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select a Model</h2>

      <div className="space-y-3">
        {models.map((m) => (
          <button
            key={m}
            onClick={() => onSelect(m)}
            className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg border"
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}

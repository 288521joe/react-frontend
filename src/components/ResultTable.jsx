export default function ResultTable() {
  const rows = [
    { id: 1, diameter: "28.22", limit: "28.00", time: "10:22:31", status: "NG" },
    { id: 2, diameter: "28.45", limit: "28.00", time: "10:30:02", status: "NG" },
    { id: 3, diameter: "27.12", limit: "27.00", time: "11:01:42", status: "NG" },
  ];

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">NG Result List</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">#</th>
            <th className="border p-2">Diameter</th>
            <th className="border p-2">Limit</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="text-center">
              <td className="border p-2">{r.id}</td>
              <td className="border p-2">{r.diameter}</td>
              <td className="border p-2">{r.limit}</td>
              <td className="border p-2">{r.time}</td>
              <td className="border p-2 font-bold text-red-600">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

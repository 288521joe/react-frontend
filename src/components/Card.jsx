export default function Card({ title, children }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}

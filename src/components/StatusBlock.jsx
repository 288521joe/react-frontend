export default function StatusBlock({ status }) {
  const isOK = status === "OK";

  return (
    <div className="bg-white rounded-xl shadow p-2 w-full h-full flex">
      <div
        className={`flex items-center justify-center text-9xl font-semibold rounded-xl w-full h-full
          ${isOK ? "bg-green-500 text-white" : "bg-red-600 animate-pulse text-white"}`}
      >
        {status}
      </div>
    </div>
  );
}

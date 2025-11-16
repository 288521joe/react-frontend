export default function StatusBlock({ status }) {
  const isOK = status === "OK";

  return (
    <div
      className={`flex items-center justify-center text-7xl font-bold rounded-xl h-full 
        ${isOK ? "bg-green-500" : "bg-red-600 animate-pulse text-white"}`}
    >
      {status}
    </div>
  );
}

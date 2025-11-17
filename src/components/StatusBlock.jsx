export default function StatusBlock({ status }) {
  const isOK = status === "OK";

  return (
    <div className="bg-white rounded-xl shadow p-2 w-full h-full flex">
      <div
        className={`
          flex items-center justify-center text-9xl font-semibold rounded-xl w-full h-full
          ${isOK 
            ? "text-[var(--ok)]" 
            : "text-[var(--ng)]"
          }
        `}
        style={{
          backgroundColor: isOK 
            ? "rgba(31,168,61,0.25)"   // transparent industrial green
            : "rgba(211,47,47,0.25)"  // transparent industrial red
        }}
      >
        {status}
      </div>
    </div>
  );
}

export default function FooterButton({ text, color = "blue", onClick }) {
  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    orange: "bg-orange-500 hover:bg-orange-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} text-white font-bold px-10 py-3 rounded-xl shadow`}
    >
      {text}
    </button>
  );
}

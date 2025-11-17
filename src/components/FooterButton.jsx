export default function FooterButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-32 h-20 
        bg-[var(--card-bg)]
        border border-[var(--card-border)]
        shadow 
        rounded-md
        text-[var(--accent-gray)]
        font-semibold
        hover:bg-white
        hover:shadow-md
        transition
      "
    >
      {text}
    </button>
  );
}

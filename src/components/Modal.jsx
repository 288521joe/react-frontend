export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

      {/* Overlay for click-outside close */}
      <div 
        className="absolute inset-0"
        onClick={onClose}
      ></div>

      {/* Modal content wrapper */}
      <div 
        className="relative bg-white rounded-xl shadow-xl p-0"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>

    </div>
  );
}

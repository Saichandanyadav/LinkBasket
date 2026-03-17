"use client";

export default function ConfirmModal({ 
  open, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm", 
  type = "danger" 
}) {
  if (!open) return null;

  const isDanger = type === "danger";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
      <div className="bg-white p-8 rounded-3xl w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        
        {message && (
          <p className="text-gray-500 mb-6 leading-relaxed">
            {message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 order-2 sm:order-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-2xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 order-1 sm:order-2 font-bold py-3 rounded-2xl transition-all active:scale-95 shadow-lg ${
              isDanger 
                ? "bg-red-500 hover:bg-red-600 text-white shadow-red-100" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
interface Props {
  reason: string;
  onChange: (val: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function RejectModal({ reason, onChange, onConfirm, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Reject Loan</h2>
        <label className="text-sm font-medium text-gray-600 mb-1 block">
          Rejection Reason
        </label>
        <textarea
          value={reason}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter reason for rejection..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary text-sm resize-none"
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:opacity-90 transition-all"
          >
            Confirm Reject
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
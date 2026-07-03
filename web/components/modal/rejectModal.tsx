"use client";

interface RejectModalProps {
  reason: string;
  onChange: (val: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function RejectModal({ reason, onChange, onConfirm, onClose }: RejectModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F2C4C]/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-[#0F2C4C] mb-4">Reject loan</h2>
        <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Rejection reason</label>
        <textarea
          value={reason}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter reason for rejection..."
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0F2C4C]/15 focus:border-[#0F2C4C]/40 transition-colors duration-150"
        />
        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 text-[#0F2C4C] rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors duration-150 cursor-pointer"
          >
            Confirm reject
          </button>
        </div>
      </div>
    </div>
  );
}
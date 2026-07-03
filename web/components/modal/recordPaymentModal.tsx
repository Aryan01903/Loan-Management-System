"use client";

import { useState } from "react";

interface RecordPaymentModalProps {
  loanId: string;
  outstanding: number;
  onConfirm: (loanId: string, data: { utrNumber: string; amount: number; paymentDate: Date }) => void;
  onClose: () => void;
}

export default function RecordPaymentModal({ loanId, outstanding, onConfirm, onClose }: RecordPaymentModalProps) {
  const [utrNumber, setUtrNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (!utrNumber.trim()) return setError("UTR number is required");
    const amountNum = Number(amount);
    if (!amount || amountNum <= 0) return setError("Enter a valid amount");
    if (amountNum > outstanding) return setError("Amount cannot exceed the outstanding balance");

    setError("");
    onConfirm(loanId, { utrNumber: utrNumber.trim(), amount: amountNum, paymentDate: new Date() });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F2C4C]/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-[#0F2C4C] mb-1">Record payment</h2>
        <p className="text-sm text-slate-500 mb-5">
          Outstanding: <span className="font-semibold text-red-600">₹{outstanding.toLocaleString("en-IN")}</span>
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">UTR number</label>
            <input
              placeholder="Enter UTR number"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C4C]/15 focus:border-[#0F2C4C]/40 transition-colors duration-150"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">₹</span>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C4C]/15 focus:border-[#0F2C4C]/40 transition-colors duration-150"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-4">{error}</p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 text-[#0F2C4C] rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 bg-[#0F2C4C] text-white rounded-lg text-sm font-semibold hover:bg-[#0c2340] transition-colors duration-150 cursor-pointer"
          >
            Confirm payment
          </button>
        </div>
      </div>
    </div>
  );
}
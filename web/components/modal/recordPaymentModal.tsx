"use client"
import { useState } from "react";

interface Props {
  loanId: string;
  outstanding: number;
  onConfirm: (loanId: string, data: { utrNumber: string; amount: number; paymentDate: Date }) => void;
  onClose: () => void;
}

export default function RecordPaymentModal({ loanId, outstanding, onConfirm, onClose }: Props) {
  const [utrNumber, setUtrNumber] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    if (!utrNumber.trim() || !amount) return alert("Fill all fields");
    onConfirm(loanId, {
      utrNumber,
      amount: Number(amount),
      paymentDate: new Date(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Record Payment</h2>

        <p className="text-sm text-gray-600 mb-4">
          Outstanding: <span className="text-red-500 font-semibold">₹{outstanding}</span>
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">UTR Number</label>
            <input
              placeholder="Enter UTR number"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary text-sm"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all"
          >
            Confirm Payment
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
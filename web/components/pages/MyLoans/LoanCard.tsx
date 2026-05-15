"use client";

import { ILoan, LoanStatus } from "@/types/api-response/loan";

const steps: LoanStatus[] = ["pending", "applied", "sanctioned", "disbursed", "closed"];

const dotColor = (step: LoanStatus) => {
  switch (step) {
    case "pending":     return "bg-yellow-400";
    case "applied":     return "bg-blue-400";
    case "sanctioned":  return "bg-green-500";
    case "disbursed":   return "bg-purple-500";
    case "closed":      return "bg-gray-800";
    default:            return "bg-gray-300";
  }
};

const statusBadgeColor = (status: LoanStatus) => {
  switch (status) {
    case "pending":     return "bg-yellow-400";
    case "applied":     return "bg-blue-400";
    case "sanctioned":  return "bg-green-500";
    case "disbursed":   return "bg-purple-500";
    case "closed":      return "bg-gray-800";
    case "rejected":    return "bg-red-500";
    default:            return "bg-gray-300";
  }
};

export default function LoanCard({ loan }: { loan: ILoan }) {
  const currentStep = steps.indexOf(loan.status as LoanStatus);

  return (
    <div className="border rounded-xl p-5 shadow-sm bg-white">

      <div className="flex flex-wrap justify-between mb-6 text-sm">
        <p><b>Amount:</b> ₹{loan.amount.toLocaleString()}</p>
        <p><b>Tenure:</b> {loan.tenure} days</p>
        <p><b>Total:</b> ₹{loan.totalRepayment.toFixed(2)}</p>
        <span className={`px-3 py-1 text-white text-xs rounded-full ${statusBadgeColor(loan.status)}`}>
          {loan.status}
        </span>
      </div>

      <div className="relative flex items-center justify-between">

        <div className="absolute top-2 left-0 right-0 h-1 bg-gray-200 z-0" />

        <div
          className="absolute top-2 left-0 h-1 bg-green-400 z-0 transition-all duration-500"
          style={{
            width: currentStep === 0
              ? "0%"
              : `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step} className="relative z-10 flex flex-col items-center gap-1">
            <div
              className={`w-4 h-4 rounded-full border-2 border-white shadow ${
                index <= currentStep ? dotColor(step) : "bg-gray-300"
              }`}
            />
            <p className="text-xs capitalize text-gray-500">{step}</p>
          </div>
        ))}

      </div>

      {loan.status === "rejected" && loan.rejectionReason && (
        <p className="mt-4 text-sm text-red-500">
          ❌ Rejected: {loan.rejectionReason}
        </p>
      )}

    </div>
  );
}
"use client";

import { ILoan, LoanStatus } from "@/types/api-response/loan";

const steps: LoanStatus[] = ["pending", "applied", "sanctioned", "disbursed", "closed"];

interface StatusStyle {
  label: string;
  badge: string;
  dot: string;
}

const STATUS_STYLES: Record<LoanStatus, StatusStyle> = {
  pending: { label: "Pending", badge: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-400" },
  applied: { label: "Applied", badge: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-400" },
  sanctioned: { label: "Sanctioned", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  disbursed: { label: "Disbursed", badge: "bg-indigo-50 text-indigo-700 border-indigo-200", dot: "bg-indigo-500" },
  closed: { label: "Closed", badge: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-[#0F2C4C]" },
  rejected: { label: "Rejected", badge: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500" },
};

export default function LoanCard({ loan }: { loan: ILoan }) {
  const currentStep = steps.indexOf(loan.status as LoanStatus);
  const isRejected = loan.status === "rejected";
  const style = STATUS_STYLES[loan.status as LoanStatus];

  return (
    <div className="border border-slate-200 rounded-2xl p-5 md:p-6 bg-white shadow-[0_2px_20px_-4px_rgba(15,23,42,0.06)]">
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div className="flex gap-6">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Amount</p>
            <p className="text-sm font-semibold text-[#0F2C4C]">
              ₹{loan.amount.toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Tenure</p>
            <p className="text-sm font-semibold text-[#0F2C4C]">{loan.tenure} days</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Total repayment</p>
            <p className="text-sm font-semibold text-[#0F2C4C]">
              ₹{loan.totalRepayment.toFixed(2)}
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full border shrink-0 ${style.badge}`}
        >
          {style.label}
        </span>
      </div>

      {/* Progress tracker — hidden for rejected loans, since they don't follow the happy path */}
      {!isRejected && (
        <div className="relative flex items-center justify-between px-1">
          <div className="absolute top-1.5 left-1 right-1 h-[3px] bg-slate-100 rounded-full z-0" />
          <div
            className="absolute top-1.5 left-1 h-[3px] bg-[#0F2C4C] rounded-full z-0 transition-all duration-500"
            style={{
              width: currentStep <= 0 ? "0%" : `calc(${(currentStep / (steps.length - 1)) * 100}% - 4px)`,
            }}
          />

          {steps.map((step, index) => {
            const isDone = index <= currentStep;
            return (
              <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm transition-colors duration-300 ${
                    isDone ? STATUS_STYLES[step].dot : "bg-slate-200"
                  }`}
                />
                <p
                  className={`text-[11px] capitalize whitespace-nowrap ${
                    isDone ? "text-[#0F2C4C] font-medium" : "text-slate-400"
                  }`}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {isRejected && loan.rejectionReason && (
        <div className="flex items-start gap-2.5 mt-2 p-3 rounded-lg bg-red-50 border border-red-100">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-0.5 shrink-0"
          >
            <circle cx="8" cy="8" r="7" stroke="#DC2626" strokeWidth="1.4" />
            <path d="M8 5V8.5" stroke="#DC2626" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8" cy="11" r="0.8" fill="#DC2626" />
          </svg>
          <p className="text-sm text-red-700">
            <span className="font-semibold">Rejected:</span> {loan.rejectionReason}
          </p>
        </div>
      )}
    </div>
  );
}
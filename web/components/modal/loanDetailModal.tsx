"use client";

import { ILoan } from "@/types/api-response/loan";
import type { IUser } from "@/types/api-response/user";
import { STATUS_STYLES } from "@/utils/loanStatus";

interface LoanDetailModalProps {
  loan: ILoan;
  onClose: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDisburse?: (id: string) => void;
}

export default function LoanDetailModal({ loan, onClose, onApprove, onReject, onDisburse }: LoanDetailModalProps) {
  const borrower = loan.borrowerId as Partial<IUser>;
  const style = STATUS_STYLES[loan.status];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F2C4C]/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#0F2C4C]">Loan details</h2>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${style.badge}`}>
            {style.label}
          </span>
        </div>

        <div className="space-y-5 text-sm">
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase mb-2">Borrower</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-slate-400">Name</p>
                <p className="font-medium text-slate-700">{borrower?.name || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="font-medium text-slate-700 break-all">{borrower?.email || "—"}</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase mb-2">Loan</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-slate-400">Amount</p>
                <p className="font-medium text-slate-700">₹{loan.amount.toLocaleString("en-IN")}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Tenure</p>
                <p className="font-medium text-slate-700">{loan.tenure} days</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Interest rate</p>
                <p className="font-medium text-slate-700">{loan.interestRate}% p.a.</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Total interest</p>
                <p className="font-medium text-slate-700">₹{loan.totalInterest.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Total repayment</p>
                <p className="font-medium text-slate-700">₹{loan.totalRepayment.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Applied on</p>
                <p className="font-medium text-slate-700">{new Date(loan.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase mb-2">Salary slip</p>
            <a
              href={loan.salarySlipUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0F2C4C] hover:underline"
            >
              View document
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.5 1.5H10.5V7.5M10.5 1.5L1.5 10.5"
                  stroke="#0F2C4C"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {loan.status === "rejected" && loan.rejectionReason && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-100">
              <p className="text-sm text-red-700">
                <span className="font-semibold">Rejection reason:</span> {loan.rejectionReason}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-7">
          {onApprove && (
            <button
              onClick={() => onApprove(loan._id)}
              className="flex-1 py-2.5 bg-[#0F2C4C] text-white rounded-lg text-sm font-semibold hover:bg-[#0c2340] transition-colors duration-150 cursor-pointer"
            >
              Approve
            </button>
          )}
          {onReject && (
            <button
              onClick={() => onReject(loan._id)}
              className="flex-1 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors duration-150 cursor-pointer"
            >
              Reject
            </button>
          )}
          {onDisburse && (
            <button
              onClick={() => onDisburse(loan._id)}
              className="flex-1 py-2.5 bg-[#0F2C4C] text-white rounded-lg text-sm font-semibold hover:bg-[#0c2340] transition-colors duration-150 cursor-pointer"
            >
              Mark disbursed
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 text-[#0F2C4C] rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
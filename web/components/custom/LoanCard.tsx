import { ILoan } from "@/types/api-response/loan";

interface Props {
  loan: ILoan;
  onViewDetails: (loan: ILoan) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDisburse?: (id: string) => void;
  onRecordPayment?: (id: string) => void;
}

export default function LoanCard({
  loan,
  onViewDetails,
  onApprove,
  onReject,
  onDisburse,
  onRecordPayment,
}: Props) {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p>👤 <b>Name:</b> {(loan.borrowerId as any)?.name}</p>
          <p>📧 <b>Email:</b> {(loan.borrowerId as any)?.email}</p>
          <p>💰 <b>Amount:</b> ₹{loan.amount.toLocaleString()}</p>
          <p>📅 <b>Tenure:</b> {loan.tenure} days</p>
          <p>📊 <b>Interest:</b> ₹{loan.totalInterest.toFixed(2)}</p>
          <p>💳 <b>Total Repayment:</b> ₹{loan.totalRepayment.toFixed(2)}</p>
          <p>🏷️ <b>Status:</b> <span className="capitalize">{loan.status}</span></p>
          {loan.rejectionReason && (
            <p>❌ <b>Rejection Reason:</b> {loan.rejectionReason}</p>
          )}
          {loan.disbursedAt && (
            <p>📤 <b>Disbursed On:</b> {new Date(loan.disbursedAt).toLocaleDateString()}</p>
          )}
          {loan.closedAt && (
            <p>✅ <b>Closed On:</b> {new Date(loan.closedAt).toLocaleDateString()}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-4 flex-wrap">
        <button onClick={() => onViewDetails(loan)} className="btn-outline">
          View Details
        </button>
        {onApprove && (
          <button onClick={() => onApprove(loan._id)} className="btn">
            Approve
          </button>
        )}
        {onReject && (
          <button onClick={() => onReject(loan._id)} className="btn-outline">
            Reject
          </button>
        )}
        {onDisburse && (
          <button onClick={() => onDisburse(loan._id)} className="btn">
            Mark Disbursed
          </button>
        )}
        {onRecordPayment && (
          <button onClick={() => onRecordPayment(loan._id)} className="btn">
            Record Payment
          </button>
        )}
      </div>
    </div>
  );
}
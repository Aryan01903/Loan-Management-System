import { ILoan } from "@/types/api-response/loan";
interface Props {
    loan: ILoan;
    onClose: () => void;
    onApprove?: (id: string) => void;
    onReject?: (id: string) => void;
    onDisburse?: (id: string) => void;
}

export default function LoanDetailModal({ loan, onClose, onApprove, onReject, onDisburse }: Props) {
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold text-gray-800 mb-6">Loan Details</h2>

                <div className="space-y-3 text-sm text-gray-700">
                    <p className="font-semibold text-base text-gray-800">👤 Borrower Info</p>
                    <p>Name: <span className="font-medium">{(loan.borrowerId as any)?.name}</span></p>
                    <p>Email: <span className="font-medium">{(loan.borrowerId as any)?.email}</span></p>

                    <hr className="my-3" />

                    <p className="font-semibold text-base text-gray-800">💰 Loan Info</p>
                    <p>Amount: <span className="font-medium">₹{loan.amount}</span></p>
                    <p>Tenure: <span className="font-medium">{loan.tenure} days</span></p>
                    <p>Interest Rate: <span className="font-medium">{loan.interestRate}% p.a.</span></p>
                    <p>Total Interest: <span className="font-medium">₹{loan.totalInterest.toFixed(2)}</span></p>
                    <p>Total Repayment: <span className="font-medium">₹{loan.totalRepayment.toFixed(2)}</span></p>
                    <p>Status: <span className="font-medium capitalize">{loan.status}</span></p>
                    <p>Applied On: <span className="font-medium">{new Date(loan.createdAt).toLocaleDateString()}</span></p>

                    <hr className="my-3" />

                    <p className="font-semibold text-base text-gray-800">📄 Salary Slip</p>
                    <a
                        href={loan.salarySlipUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline break-all"
                    >
                        View Salary Slip
                    </a>
                </div>

                <div className="flex gap-3 mt-6">
                    {onApprove && (
                        <button
                            onClick={() => onApprove(loan._id)}
                            className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all"
                        >
                            Approve
                        </button>
                    )}
                    {onReject && (
                        <button
                            onClick={() => onReject(loan._id)}
                            className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium hover:opacity-90 transition-all"
                        >
                            Reject
                        </button>
                    )}
                    {onDisburse && (
                        <button
                            onClick={() => onDisburse(loan._id)}
                            className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-all"
                        >
                            Mark Disbursed
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
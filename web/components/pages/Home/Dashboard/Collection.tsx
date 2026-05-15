"use client";

import { useEffect, useState } from "react";
import { ILoan } from "@/types/api-response/loan";
import { getLoansByStatus } from "@/api/loan";
import { getOutstanding, recordPayment } from "@/api/payment";
import LoanCard from "@/components/custom/LoanCard";
import LoanDetailModal from "@/components/modal/loanDetailModal";
import RecordPaymentModal from "@/components/modal/recordPaymentModal";

export default function CollectionDashboard() {
  const [loans, setLoans] = useState<ILoan[]>([]);
  const [loading, setLoading] = useState(false);
  const [outstanding, setOutstanding] = useState<Record<string, number>>({});
  const [detailModal, setDetailModal] = useState<ILoan | null>(null);
  const [paymentModal, setPaymentModal] = useState<{ loanId: string; outstanding: number } | null>(null);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const res = await getLoansByStatus("disbursed");
      setLoans(res);

      const temp: Record<string, number> = {};
      for (let loan of res) {
        const data = await getOutstanding(loan._id);
        temp[loan._id] = data.outstanding;
      }
      setOutstanding(temp);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLoans(); }, []);

  const handleRecordPayment = async (
    loanId: string,
    data: { utrNumber: string; amount: number; paymentDate: Date }
  ) => {
    try {
      await recordPayment(loanId, data);
      alert("Payment Recorded");
      setPaymentModal(null);
      fetchLoans();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const openPaymentModal = (loanId: string) => {
    setPaymentModal({ loanId, outstanding: outstanding[loanId] || 0 });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🟣 Collection Dashboard</h1>

      {loans.length === 0 ? (
        <p className="text-gray-500">No active loans</p>
      ) : (
        <div className="grid gap-4">
          {loans.map((loan) => (
            <div key={loan._id}>
              <LoanCard
                loan={loan}
                onViewDetails={setDetailModal}
                onRecordPayment={openPaymentModal}
              />
              <p className="text-sm mt-1 ml-1">
                Outstanding: <span className="text-red-500 font-semibold">₹{outstanding[loan._id] || 0}</span>
              </p>
            </div>
          ))}
        </div>
      )}

      {detailModal && (
        <LoanDetailModal
          loan={detailModal}
          onClose={() => setDetailModal(null)}
        />
      )}

      {paymentModal && (
        <RecordPaymentModal
          loanId={paymentModal.loanId}
          outstanding={paymentModal.outstanding}
          onConfirm={handleRecordPayment}
          onClose={() => setPaymentModal(null)}
        />
      )}
    </div>
  );
}
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
  const [loading, setLoading] = useState<boolean>(true);
  const [outstanding, setOutstanding] = useState<Record<string, number>>({});
  const [detailModal, setDetailModal] = useState<ILoan | null>(null);
  const [paymentModal, setPaymentModal] = useState<{ loanId: string; outstanding: number } | null>(null);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const res = await getLoansByStatus("disbursed");
      setLoans(res);

      const entries = await Promise.all(
        res.map(async (loan) => {
          const data = await getOutstanding(loan._id);
          return [loan._id, data.outstanding] as const;
        })
      );
      setOutstanding(Object.fromEntries(entries));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleRecordPayment = async (
    loanId: string,
    data: { utrNumber: string; amount: number; paymentDate: Date }
  ) => {
    try {
      await recordPayment(loanId, data);
      setPaymentModal(null);
      fetchLoans();
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const openPaymentModal = (loanId: string) => {
    setPaymentModal({ loanId, outstanding: outstanding[loanId] || 0 });
  };

  if (loading) {
    return (
      <div className="grid gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-24 rounded-2xl border border-slate-200 bg-slate-50 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#0F2C4C]">Collection</h1>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
          {loans.length} active
        </span>
      </div>

      {loans.length === 0 ? (
        <p className="text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl px-4 py-8 text-center">
          No active loans to collect on right now
        </p>
      ) : (
        <div className="grid gap-4">
          {loans.map((loan) => (
            <div key={loan._id}>
              <LoanCard loan={loan} onViewDetails={setDetailModal} onRecordPayment={openPaymentModal} />
              <p className="text-xs mt-2 ml-1 text-slate-500">
                Outstanding:{" "}
                <span className="text-red-600 font-semibold">
                  ₹{(outstanding[loan._id] || 0).toLocaleString("en-IN")}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      {detailModal && <LoanDetailModal loan={detailModal} onClose={() => setDetailModal(null)} />}

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
"use client";

import { useEffect, useState } from "react";
import { ILoan } from "@/types/api-response/loan";
import { getLoansByStatus, updateLoanStatus } from "@/api/loan";
import LoanCard from "@/components/custom/LoanCard";
import LoanDetailModal from "@/components/modal/loanDetailModal";

export default function DisbursementDashboard() {
  const [loans, setLoans] = useState<ILoan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [detailModal, setDetailModal] = useState<ILoan | null>(null);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const res = await getLoansByStatus("sanctioned");
      setLoans(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleDisburse = async (id: string) => {
    try {
      await updateLoanStatus(id, { status: "disbursed" });
      setDetailModal(null);
      fetchLoans();
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
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
        <h1 className="text-xl md:text-2xl font-bold text-[#0F2C4C]">Disbursement</h1>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
          {loans.length} pending
        </span>
      </div>

      {loans.length === 0 ? (
        <p className="text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl px-4 py-8 text-center">
          No sanctioned loans waiting for disbursement
        </p>
      ) : (
        <div className="grid gap-4">
          {loans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} onViewDetails={setDetailModal} onDisburse={handleDisburse} />
          ))}
        </div>
      )}

      {detailModal && (
        <LoanDetailModal loan={detailModal} onClose={() => setDetailModal(null)} onDisburse={handleDisburse} />
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { ILoan } from "@/types/api-response/loan";
import { getLoansByStatus, updateLoanStatus } from "@/api/loan";
import LoanCard from "@/components/custom/LoanCard";
import LoanDetailModal from "@/components/modal/loanDetailModal";
import RejectModal from "@/components/modal/rejectModal";

export default function SanctionDashboard() {
  const [loans, setLoans] = useState<ILoan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [rejectModal, setRejectModal] = useState<{ loanId: string } | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [detailModal, setDetailModal] = useState<ILoan | null>(null);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const res = await getLoansByStatus("applied");
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

  const handleApprove = async (id: string) => {
    try {
      await updateLoanStatus(id, { status: "sanctioned" });
      setDetailModal(null);
      fetchLoans();
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    if (!rejectionReason.trim()) return alert("Rejection reason is required");
    try {
      await updateLoanStatus(rejectModal.loanId, { status: "rejected", rejectionReason });
      setRejectModal(null);
      setRejectionReason("");
      setDetailModal(null);
      fetchLoans();
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const openReject = (id: string) => {
    setDetailModal(null);
    setRejectModal({ loanId: id });
    setRejectionReason("");
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
        <h1 className="text-xl md:text-2xl font-bold text-[#0F2C4C]">Sanction</h1>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
          {loans.length} pending
        </span>
      </div>

      {loans.length === 0 ? (
        <p className="text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl px-4 py-8 text-center">
          No applications waiting for review
        </p>
      ) : (
        <div className="grid gap-4">
          {loans.map((loan) => (
            <LoanCard
              key={loan._id}
              loan={loan}
              onViewDetails={setDetailModal}
              onApprove={handleApprove}
              onReject={openReject}
            />
          ))}
        </div>
      )}

      {detailModal && (
        <LoanDetailModal
          loan={detailModal}
          onClose={() => setDetailModal(null)}
          onApprove={handleApprove}
          onReject={openReject}
        />
      )}

      {rejectModal && (
        <RejectModal
          reason={rejectionReason}
          onChange={setRejectionReason}
          onConfirm={handleReject}
          onClose={() => setRejectModal(null)}
        />
      )}
    </div>
  );
}
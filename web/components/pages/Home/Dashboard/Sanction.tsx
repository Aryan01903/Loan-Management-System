"use client";

import { useEffect, useState } from "react";
import { ILoan } from "@/types/api-response/loan";
import { getLoansByStatus, updateLoanStatus } from "@/api/loan";
import LoanCard from "@/components/custom/LoanCard";
import LoanDetailModal from "@/components/modal/loanDetailModal";
import RejectModal from "@/components/modal/rejectModal";

export default function SanctionDashboard() {
  const [loans, setLoans] = useState<ILoan[]>([]);
  const [loading, setLoading] = useState(false);
  const [rejectModal, setRejectModal] = useState<{ loanId: string } | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
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

  useEffect(() => { fetchLoans(); }, []);

  const handleApprove = async (id: string) => {
    try {
      await updateLoanStatus(id, { status: "sanctioned" });
      alert("Loan Approved");
      setDetailModal(null);
      fetchLoans();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    if (!rejectionReason.trim()) return alert("Rejection reason is required!");
    try {
      await updateLoanStatus(rejectModal.loanId, { status: "rejected", rejectionReason });
      alert("Loan Rejected");
      setRejectModal(null);
      setRejectionReason("");
      setDetailModal(null);
      fetchLoans();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const openReject = (id: string) => {
    setDetailModal(null);
    setRejectModal({ loanId: id });
    setRejectionReason("");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🟡 Sanction Dashboard</h1>

      {loans.length === 0 ? (
        <p className="text-gray-500">No applied loans</p>
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
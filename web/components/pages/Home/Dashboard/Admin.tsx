"use client";

import { useEffect, useState } from "react";
import { ILoan } from "@/types/api-response/loan";
import { getLoansByStatus, updateLoanStatus } from "@/api/loan";
import LoanCard from "@/components/custom/LoanCard";
import LoanDetailModal from "@/components/modal/loanDetailModal";
import RejectModal from "@/components/modal/rejectModal";

export default function AdminDashboard() {
  const [appliedLoans, setAppliedLoans] = useState<ILoan[]>([]);
  const [sanctionedLoans, setSanctionedLoans] = useState<ILoan[]>([]);
  const [disbursedLoans, setDisbursedLoans] = useState<ILoan[]>([]);
  const [loading, setLoading] = useState(false);
  const [rejectModal, setRejectModal] = useState<{ loanId: string } | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [detailModal, setDetailModal] = useState<ILoan | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [applied, sanctioned, disbursed] = await Promise.all([
        getLoansByStatus("applied"),
        getLoansByStatus("sanctioned"),
        getLoansByStatus("disbursed"),
      ]);
      setAppliedLoans(applied);
      setSanctionedLoans(sanctioned);
      setDisbursedLoans(disbursed);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleApprove = async (id: string) => {
    try {
      await updateLoanStatus(id, { status: "sanctioned" });
      alert("Loan Approved");
      setDetailModal(null);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleDisburse = async (id: string) => {
    try {
      await updateLoanStatus(id, { status: "disbursed" });
      alert("Loan Disbursed");
      setDetailModal(null);
      fetchData();
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
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const openReject = (id: string) => {
    setDetailModal(null);
    setRejectModal({ loanId: id });
    setRejectionReason("");
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="space-y-10">

      <section>
        <h2 className="text-xl font-bold mb-4">🟡 Sanction (Applied Loans)</h2>
        {appliedLoans.length === 0 ? (
          <p className="text-gray-500">No applied loans</p>
        ) : (
          <div className="grid gap-4">
            {appliedLoans.map((loan) => (
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
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">🟢 Disbursement</h2>
        {sanctionedLoans.length === 0 ? (
          <p className="text-gray-500">No sanctioned loans</p>
        ) : (
          <div className="grid gap-4">
            {sanctionedLoans.map((loan) => (
              <LoanCard
                key={loan._id}
                loan={loan}
                onViewDetails={setDetailModal}
                onDisburse={handleDisburse}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">🟣 Collection</h2>
        {disbursedLoans.length === 0 ? (
          <p className="text-gray-500">No active loans</p>
        ) : (
          <div className="grid gap-4">
            {disbursedLoans.map((loan) => (
              <LoanCard
                key={loan._id}
                loan={loan}
                onViewDetails={setDetailModal}
              />
            ))}
          </div>
        )}
      </section>

      {detailModal && (
        <LoanDetailModal
          loan={detailModal}
          onClose={() => setDetailModal(null)}
          onApprove={detailModal.status === "applied" ? handleApprove : undefined}
          onReject={detailModal.status === "applied" ? openReject : undefined}
          onDisburse={detailModal.status === "sanctioned" ? handleDisburse : undefined}
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
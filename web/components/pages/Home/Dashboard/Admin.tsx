"use client";

import { useEffect, useState } from "react";
import { ILoan } from "@/types/api-response/loan";
import { getLoansByStatus, updateLoanStatus } from "@/api/loan";
import LoanCard from "@/components/custom/LoanCard";
import LoanDetailModal from "@/components/modal/loanDetailModal";
import RejectModal from "@/components/modal/rejectModal";

interface LoanSection {
  key: "applied" | "sanctioned" | "disbursed";
  title: string;
  emptyText: string;
}

const sections: LoanSection[] = [
  { key: "applied", title: "Sanction queue", emptyText: "No applications waiting for sanction" },
  { key: "sanctioned", title: "Disbursement queue", emptyText: "No loans waiting for disbursement" },
  { key: "disbursed", title: "Collection", emptyText: "No active loans in collection" },
];

export default function AdminDashboard() {
  const [appliedLoans, setAppliedLoans] = useState<ILoan[]>([]);
  const [sanctionedLoans, setSanctionedLoans] = useState<ILoan[]>([]);
  const [disbursedLoans, setDisbursedLoans] = useState<ILoan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [rejectModal, setRejectModal] = useState<{ loanId: string } | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("");
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await updateLoanStatus(id, { status: "sanctioned" });
      setDetailModal(null);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDisburse = async (id: string) => {
    try {
      await updateLoanStatus(id, { status: "disbursed" });
      setDetailModal(null);
      fetchData();
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
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const openReject = (id: string) => {
    setDetailModal(null);
    setRejectModal({ loanId: id });
    setRejectionReason("");
  };

  const dataByKey: Record<LoanSection["key"], ILoan[]> = {
    applied: appliedLoans,
    sanctioned: sanctionedLoans,
    disbursed: disbursedLoans,
  };

  if (loading) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-2xl border border-slate-200 bg-slate-50 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {sections.map((section) => {
        const loans = dataByKey[section.key];
        return (
          <section key={section.key}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#0F2C4C]">{section.title}</h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                {loans.length}
              </span>
            </div>

            {loans.length === 0 ? (
              <p className="text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl px-4 py-6 text-center">
                {section.emptyText}
              </p>
            ) : (
              <div className="grid gap-4">
                {loans.map((loan) => (
                  <LoanCard
                    key={loan._id}
                    loan={loan}
                    onViewDetails={setDetailModal}
                    onApprove={section.key === "applied" ? handleApprove : undefined}
                    onReject={section.key === "applied" ? openReject : undefined}
                    onDisburse={section.key === "sanctioned" ? handleDisburse : undefined}
                  />
                ))}
              </div>
            )}
          </section>
        );
      })}

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
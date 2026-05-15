"use client";

import { useEffect, useState } from "react";
import { ILoan } from "@/types/api-response/loan";
import { getLoansByStatus, updateLoanStatus } from "@/api/loan";
import LoanCard from "@/components/custom/LoanCard";
import LoanDetailModal from "@/components/modal/loanDetailModal";

export default function DisbursementDashboard() {
  const [loans, setLoans] = useState<ILoan[]>([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => { fetchLoans(); }, []);

  const handleDisburse = async (id: string) => {
    try {
      await updateLoanStatus(id, { status: "disbursed" });
      alert("Loan Disbursed Successfully");
      setDetailModal(null);
      fetchLoans();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🟢 Disbursement Dashboard</h1>

      {loans.length === 0 ? (
        <p className="text-gray-500">No sanctioned loans</p>
      ) : (
        <div className="grid gap-4">
          {loans.map((loan) => (
            <LoanCard
              key={loan._id}
              loan={loan}
              onViewDetails={setDetailModal}
              onDisburse={handleDisburse}
            />
          ))}
        </div>
      )}

      {detailModal && (
        <LoanDetailModal
          loan={detailModal}
          onClose={() => setDetailModal(null)}
          onDisburse={handleDisburse}
        />
      )}
    </div>
  );
}
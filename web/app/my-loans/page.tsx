"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/utils/store/authStore";
import { ILoan } from "@/types/api-response/loan";
import { getMyLoans } from "@/api/loan";
import LoanCard from "@/components/pages/MyLoans/LoanCard";

export default function MyLoansPage() {
  const { user } = useAuth();
  const [loans, setLoans] = useState<ILoan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!user?._id) return;

    const fetchLoans = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getMyLoans(user._id);
        setLoans(data);
      } catch (err) {
        console.error(err);
        setError("Couldn't load your loans, please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user]);

  return (
    <div className="pt-32 px-[6%]">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#E8A33D] uppercase mb-2">
          Dashboard
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F2C4C]">
          My loans
        </h1>
      </div>

      {loading ? (
        <div className="grid gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl border border-slate-200 bg-slate-50 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center text-center border border-red-100 bg-red-50 rounded-2xl py-14 px-6">
          <p className="text-sm font-medium text-red-600 mb-1">{error}</p>
          <p className="text-xs text-red-400">Refresh the page to try again</p>
        </div>
      ) : loans.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center border border-dashed border-slate-200 rounded-2xl py-16 px-6">
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E8A33D]/15 mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="5" width="14" height="11" rx="2" stroke="#0F2C4C" strokeWidth="1.6" />
              <path d="M3 8H17" stroke="#0F2C4C" strokeWidth="1.6" />
            </svg>
          </span>
          <p className="text-sm font-semibold text-[#0F2C4C] mb-1">No loans yet</p>
          <p className="text-sm text-slate-400 max-w-xs">
            Once you apply for a loan, it&apos; ll show up here so you can track its status.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {loans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} />
          ))}
        </div>
      )}
    </div>
  );
}
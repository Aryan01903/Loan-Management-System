"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/utils/store/authStore";
import { createLoan, updateLoanStatus } from "@/api/loan";
import type { StepProps } from "@/types/loan-form";

interface LoanConfigProps extends StepProps {
  back: () => void;
}

interface CreateLoanPayload {
  borrowerId: string;
  amount: number;
  tenure: number;
  interestRate: number;
  totalInterest: number;
  totalRepayment: number;
  salarySlipUrl: string;
  salarySlipOriginalName: string;
}

export default function LoanConfig({ data, setData, back }: LoanConfigProps) {
  const { user } = useAuth();

  const [interest, setInterest] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const P = data.amount;
    const R = 12;
    const T = data.tenure;
    const SI = (P * R * T) / (365 * 100);
    setInterest(Math.round(SI));
    setTotal(Math.round(P + SI));
  }, [data.amount, data.tenure]);

  const handleApply = async () => {
    try {
      setLoading(true);
      setError("");

      if (!user?._id) throw new Error("User not found, please log in again");

      const payload: CreateLoanPayload = {
        borrowerId: user._id,
        amount: data.amount,
        tenure: data.tenure,
        interestRate: 12,
        totalInterest: interest,
        totalRepayment: total,
        salarySlipUrl: data.salarySlipUrl,
        salarySlipOriginalName: data.salarySlipOriginalName,
      };

      const loan = await createLoan(payload);
      await updateLoanStatus(loan._id, { status: "applied" });

      window.location.replace("/my-loans");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-[0_2px_20px_-4px_rgba(15,23,42,0.08)]">
      <h2 className="text-lg font-bold text-[#0F2C4C] mb-1">Loan configuration</h2>
      <p className="text-sm text-slate-400 mb-6">Adjust the sliders to see your repayment update live.</p>

      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <label className="text-sm font-semibold text-slate-600">Loan amount</label>
          <span className="text-sm font-bold text-[#0F2C4C]">₹{data.amount.toLocaleString("en-IN")}</span>
        </div>
        <input
          type="range"
          min={50000}
          max={500000}
          step={5000}
          value={data.amount}
          onChange={(e) => setData({ ...data, amount: Number(e.target.value) })}
          className="w-full accent-[#0F2C4C]"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>₹50K</span>
          <span>₹5L</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <label className="text-sm font-semibold text-slate-600">Tenure</label>
          <span className="text-sm font-bold text-[#0F2C4C]">{data.tenure} days</span>
        </div>
        <input
          type="range"
          min={30}
          max={365}
          step={5}
          value={data.tenure}
          onChange={(e) => setData({ ...data, tenure: Number(e.target.value) })}
          className="w-full accent-[#0F2C4C]"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>30 days</span>
          <span>365 days</span>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Principal</span>
          <span className="font-medium text-slate-700">₹{data.amount.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Interest (12% p.a.)</span>
          <span className="font-medium text-slate-700">₹{interest.toLocaleString("en-IN")}</span>
        </div>
        <div className="h-px bg-slate-200 my-1" />
        <div className="flex justify-between">
          <span className="text-sm font-semibold text-[#0F2C4C]">Total repayment</span>
          <span className="text-base font-extrabold text-[#0F2C4C]">₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={back}
          disabled={loading}
          className="px-5 py-2.5 text-sm font-semibold text-[#0F2C4C] rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors duration-150 cursor-pointer disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={handleApply}
          disabled={loading}
          className="px-6 py-2.5 text-sm font-semibold text-white rounded-lg bg-[#0F2C4C] hover:bg-[#0c2340] disabled:opacity-60 transition-colors duration-150 cursor-pointer"
        >
          {loading ? "Applying..." : "Apply for loan"}
        </button>
      </div>
    </div>
  );
}
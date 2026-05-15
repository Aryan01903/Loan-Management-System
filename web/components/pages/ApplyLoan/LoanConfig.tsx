"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/utils/store/authStore";
import { useRouter } from "next/router";
import { createLoan, updateLoanStatus } from "@/api/loan";

export default function LoanConfig({ data, setData, back }: any) {
    const { user } = useAuth();

    const [interest, setInterest] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

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

            if (!user?._id) throw new Error("User not found!");

            const payload = {
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

            alert("🎉 Loan Applied Successfully!");
            window.location.replace("/");

        } catch (err: any) {
            alert(err.response?.data?.message || err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-white p-6 rounded-xl border">
            <h2 className="text-lg font-semibold mb-6">
                Loan Configuration
            </h2>

            <div className="mb-6">
                <label className="text-sm font-medium">
                    Loan Amount: ₹{data.amount}
                </label>

                <input
                    type="range"
                    min={50000}
                    max={500000}
                    step={5000}
                    value={data.amount}
                    onChange={(e) =>
                        setData({ ...data, amount: Number(e.target.value) })
                    }
                    className="w-full"
                />
            </div>

            <div className="mb-6">
                <label className="text-sm font-medium">
                    Tenure: {data.tenure} days
                </label>

                <input
                    type="range"
                    min={30}
                    max={365}
                    step={5}
                    value={data.tenure}
                    onChange={(e) =>
                        setData({ ...data, tenure: Number(e.target.value) })
                    }
                    className="w-full"
                />
            </div>

            <div className="bg-gray-100 p-4 rounded-xl mb-6 text-sm">
                <p>Interest (12%): ₹{interest}</p>
                <p className="font-semibold text-gray-800">
                    Total Repayment: ₹{total}
                </p>
            </div>

            <div className="flex gap-3">
                <button onClick={back} className="btn-outline">
                    Back
                </button>

                <button
                    onClick={handleApply}
                    disabled={loading}
                    className="btn"
                >
                    {loading ? "Applying..." : "Apply Loan"}
                </button>
            </div>
        </div>
    );
}
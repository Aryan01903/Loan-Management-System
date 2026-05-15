"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/utils/store/authStore";
import { ILoan } from "@/types/api-response/loan";
import { getMyLoans } from "@/api/loan";
import LoanCard from "@/components/pages/MyLoans/LoanCard";

export default function MyLoansPage() {
  const { user } = useAuth();
  const [loans, setLoans] = useState<ILoan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchLoans = async () => {
      try {
        const data = await getMyLoans(user._id);
        setLoans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user]);


  return (
    <div className="pt-32 px-[6%] pb-10">
      <h1 className="text-2xl font-bold mb-6">My Loans</h1>

      {loading ? (
        <p>Loading...</p>
      ) : loans.length === 0 ? (
        <p className="text-gray-500">No loans found</p>
      ) : (
        <div className="grid gap-6">
          {loans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} />
          ))}
        </div>
      )}
    </div>
  );
}
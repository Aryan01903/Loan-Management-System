"use client";

import Link from "next/link";

export default function BorrowerDashboard() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h1 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">
        📄 Borrower Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        <Link
          href="/apply-loan"
          className="p-5 rounded-xl border hover:border-primary hover:shadow-md transition-all group"
        >
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-primary">
            Apply for Loan
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Submit a new loan application with salary slip
          </p>
        </Link>

        <Link
          href="/my-loans"
          className="p-5 rounded-xl border hover:border-primary hover:shadow-md transition-all group"
        >
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-primary">
            My Loans
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track status of your loan applications
          </p>
        </Link>

      </div>
    </div>
  );
}
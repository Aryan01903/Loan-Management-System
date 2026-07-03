"use client";

import Link from "next/link";

export default function BorrowerDashboard() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-[0_2px_20px_-4px_rgba(15,23,42,0.08)]">
      <div className="flex items-center gap-3 mb-7">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0F2C4C] text-[#E8A33D] font-black text-sm leading-none shrink-0">
          C
        </span>
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#0F2C4C]">
            Borrower dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Apply for a loan or track your existing applications
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/apply-loan"
          className="group relative p-5 rounded-xl border border-slate-200 hover:border-[#0F2C4C]/30 hover:bg-slate-50 transition-colors duration-150"
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E8A33D]/15 mb-4">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4V16M4 10H16" stroke="#0F2C4C" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <h2 className="text-base font-semibold text-[#0F2C4C]">
            Apply for a loan
          </h2>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
            Submit a new application with your salary slip
          </p>
          <span className="absolute top-5 right-5 text-slate-300 group-hover:text-[#0F2C4C] group-hover:translate-x-0.5 transition-all duration-150">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>

        <Link
          href="/my-loans"
          className="group relative p-5 rounded-xl border border-slate-200 hover:border-[#0F2C4C]/30 hover:bg-slate-50 transition-colors duration-150"
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E8A33D]/15 mb-4">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H16M4 10H16M4 14H11" stroke="#0F2C4C" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <h2 className="text-base font-semibold text-[#0F2C4C]">
            My loans
          </h2>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
            Track the status of your loan applications
          </p>
          <span className="absolute top-5 right-5 text-slate-300 group-hover:text-[#0F2C4C] group-hover:translate-x-0.5 transition-all duration-150">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
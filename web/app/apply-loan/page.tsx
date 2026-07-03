"use client";

import LoanConfig from "@/components/pages/ApplyLoan/LoanConfig";
import PersonalDetails from "@/components/pages/ApplyLoan/PersonalDetails";
import SalaryUpload from "@/components/pages/ApplyLoan/SalarySlipUpload";
import { useState } from "react";
import type { LoanFormData } from "@/types/loan-form";

interface Step {
  id: number;
  label: string;
}

const steps: Step[] = [
  { id: 1, label: "Personal details" },
  { id: 2, label: "Salary slip" },
  { id: 3, label: "Loan configuration" },
];

export default function ApplyLoanPage() {
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<LoanFormData>({
    name: "",
    pan: "",
    dob: "",
    monthlySalary: "",
    employmentMode: "",
    salarySlipUrl: "",
    salarySlipOriginalName: "",
    amount: 50000,
    tenure: 30,
  });

  return (
    <div className="pt-32 pb-16 px-[6%]">
      <div className="mb-2">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#E8A33D] uppercase mb-2">
          Loan application
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F2C4C]">
          Apply for a loan
        </h1>
      </div>

      <div className="flex items-center mt-8 mb-10">
        {steps.map((s, i) => {
          const isCompleted = step > s.id;
          const isActive = step === s.id;
          return (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold shrink-0 transition-colors duration-200 ${
                    isCompleted
                      ? "bg-[#0F2C4C] text-white"
                      : isActive
                      ? "bg-[#0F2C4C] text-white ring-4 ring-[#0F2C4C]/15"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    s.id
                  )}
                </div>
                <span
                  className={`hidden sm:block text-xs font-medium text-center max-w-[90px] ${
                    isActive ? "text-[#0F2C4C]" : "text-slate-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-[2px] flex-1 mx-2 mb-6 rounded-full transition-colors duration-200 ${
                    isCompleted ? "bg-[#0F2C4C]" : "bg-slate-100"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <PersonalDetails data={formData} setData={setFormData} next={() => setStep(2)} />
      )}

      {step === 2 && (
        <SalaryUpload
          data={formData}
          setData={setFormData}
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <LoanConfig data={formData} setData={setFormData} back={() => setStep(2)} />
      )}
    </div>
  );
}
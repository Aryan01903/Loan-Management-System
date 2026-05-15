"use client";

import LoanConfig from "@/components/pages/ApplyLoan/LoanConfig";
import PersonalDetails from "@/components/pages/ApplyLoan/PersonalDetails";
import SalaryUpload from "@/components/pages/ApplyLoan/SalarySlipUpload";
import { useState } from "react";

export default function ApplyLoanPage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<any>({
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
    <div className="pt-32 px-[6%]">
      <h1 className="text-2xl font-bold mb-6">Apply for Loan</h1>

      <div className="flex gap-4 mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`px-4 py-2 rounded-lg text-sm ${
              step === s ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            Step {s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <PersonalDetails
          data={formData}
          setData={setFormData}
          next={() => setStep(2)}
        />
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
        <LoanConfig
          data={formData}
          setData={setFormData}
          back={() => setStep(2)}
        />
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import type { StepProps } from "@/types/loan-form";

interface PersonalDetailsProps extends StepProps {
  next: () => void;
}

export default function PersonalDetails({ data, setData, next }: PersonalDetailsProps) {
  const [error, setError] = useState<string>("");

  const validate = (): string => {
    if (!data.name.trim()) return "Full name is required";
    if (!data.dob) return "Date of birth is required";

    const dob = new Date(data.dob);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
    if (!hasHadBirthdayThisYear) age -= 1;

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (age < 23 || age > 50) return "Age must be between 23 and 50";
    if (!data.monthlySalary || data.monthlySalary < 25000) return "Salary must be at least ₹25,000";
    if (!panRegex.test(data.pan)) return "Invalid PAN format (e.g. ABCDE1234F)";
    if (!data.employmentMode) return "Select an employment mode";
    if (data.employmentMode === "unemployed") return "Unemployed applicants aren't eligible";

    return "";
  };

  const handleNext = () => {
    const err = validate();
    if (err) return setError(err);
    setError("");
    next();
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-[0_2px_20px_-4px_rgba(15,23,42,0.08)]">
      <h2 className="text-lg font-bold text-[#0F2C4C] mb-1">Personal details</h2>
      <p className="text-sm text-slate-400 mb-6">
        We use this to check your eligibility instantly.
      </p>

      <div className="grid gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Full name</label>
          <input
            placeholder="Aryan Kumar Shrivastav"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C4C]/15 focus:border-[#0F2C4C]/40 transition-colors duration-150"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">PAN</label>
            <input
              placeholder="ABCDE1234F"
              value={data.pan}
              maxLength={10}
              onChange={(e) => setData({ ...data, pan: e.target.value.toUpperCase() })}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#0F2C4C]/15 focus:border-[#0F2C4C]/40 transition-colors duration-150"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Date of birth</label>
            <input
              type="date"
              value={data.dob}
              onChange={(e) => setData({ ...data, dob: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C4C]/15 focus:border-[#0F2C4C]/40 transition-colors duration-150"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Monthly salary</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">₹</span>
              <input
                type="number"
                placeholder="30000"
                value={data.monthlySalary}
                onChange={(e) =>
                  setData({ ...data, monthlySalary: e.target.value === "" ? "" : Number(e.target.value) })
                }
                className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C4C]/15 focus:border-[#0F2C4C]/40 transition-colors duration-150"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 mb-1.5 block">Employment mode</label>
            <select
              value={data.employmentMode}
              onChange={(e) =>
                setData({ ...data, employmentMode: e.target.value as typeof data.employmentMode })
              }
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2C4C]/15 focus:border-[#0F2C4C]/40 transition-colors duration-150"
            >
              <option value="">Select</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self-employed</option>
              <option value="unemployed">Unemployed</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-4">
          {error}
        </p>
      )}

      <button
        onClick={handleNext}
        className="mt-6 px-6 py-2.5 text-sm font-semibold text-white rounded-lg bg-[#0F2C4C] hover:bg-[#0c2340] transition-colors duration-150 cursor-pointer"
      >
        Continue
      </button>
    </div>
  );
}
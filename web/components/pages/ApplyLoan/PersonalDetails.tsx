"use client";

import { useState } from "react";

export default function PersonalDetails({ data, setData, next }: any) {
  const [error, setError] = useState("");

  const validate = () => {
    const age =
      new Date().getFullYear() - new Date(data.dob).getFullYear();

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (age < 23 || age > 50) return "Age must be between 23-50";
    if (data.monthlySalary < 25000)
      return "Salary must be ≥ ₹25,000";
    if (!panRegex.test(data.pan))
      return "Invalid PAN format";
    if (data.employmentMode === "unemployed")
      return "Unemployed not allowed";

    return "";
  };

  const handleNext = () => {
    const err = validate();
    if (err) return setError(err);

    setError("");
    next();
  };

  return (
    <div className="bg-white p-6 rounded-xl border">
      <h2 className="text-lg font-semibold mb-4">
        Personal Details
      </h2>

      <div className="grid gap-4">
        <input
          placeholder="Full Name"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
          className="input"
        />

        <input
          placeholder="PAN"
          value={data.pan}
          onChange={(e) =>
            setData({ ...data, pan: e.target.value.toUpperCase() })
          }
          className="input"
        />

        <input
          type="date"
          onChange={(e) =>
            setData({ ...data, dob: e.target.value })
          }
          className="input"
        />

        <input
          type="number"
          placeholder="Monthly Salary"
          onChange={(e) =>
            setData({
              ...data,
              monthlySalary: Number(e.target.value),
            })
          }
          className="input"
        />

        <select
          onChange={(e) =>
            setData({
              ...data,
              employmentMode: e.target.value,
            })
          }
          className="input"
        >
          <option value="">Select Employment</option>
          <option value="salaried">Salaried</option>
          <option value="self-employed">Self-employed</option>
          <option value="unemployed">Unemployed</option>
        </select>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      <button onClick={handleNext} className="btn mt-4">
        Next
      </button>
    </div>
  );
}
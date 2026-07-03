"use client";

import { useRef, useState } from "react";
import { uploadSalarySlip } from "@/api/upload";
import type { StepProps } from "@/types/loan-form";

interface SalaryUploadProps extends StepProps {
  next: () => void;
  back: () => void;
}

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE = 5 * 1024 * 1024;

export default function SalaryUpload({ data, setData, next, back }: SalaryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fileName, setFileName] = useState<string>(data.salarySlipOriginalName || "");

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only PDF, JPG, or PNG files are allowed");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("File must be under 5 MB");
      return;
    }

    try {
      setUploading(true);
      const res = await uploadSalarySlip(file);
      setData({
        ...data,
        salarySlipUrl: res.url,
        salarySlipOriginalName: file.name,
      });
      setFileName(file.name);
    } catch (err: any) {
      setError(err.response?.data?.message || "Upload failed, please try again");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-[0_2px_20px_-4px_rgba(15,23,42,0.08)]">
      <h2 className="text-lg font-bold text-[#0F2C4C] mb-1">Upload salary slip</h2>
      <p className="text-sm text-slate-400 mb-6">PDF, JPG, or PNG — up to 5 MB.</p>

      <div
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl px-6 py-10 text-center cursor-pointer transition-colors duration-150 ${
          data.salarySlipUrl
            ? "border-[#0F2C4C]/30 bg-slate-50"
            : "border-slate-200 hover:border-[#0F2C4C]/30 hover:bg-slate-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E8A33D]/15">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13V3M10 3L6 7M10 3L14 7" stroke="#0F2C4C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 13V15.5C3 16.3284 3.67157 17 4.5 17H15.5C16.3284 17 17 16.3284 17 15.5V13" stroke="#0F2C4C" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>

        {uploading ? (
          <p className="text-sm font-medium text-[#0F2C4C]">Uploading...</p>
        ) : fileName ? (
          <div>
            <p className="text-sm font-semibold text-[#0F2C4C]">{fileName}</p>
            <p className="text-xs text-slate-400 mt-0.5">Click to replace</p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium text-slate-600">
              Click to upload, or drag a file here
            </p>
            <p className="text-xs text-slate-400 mt-0.5">PDF, JPG or PNG · Max 5 MB</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mt-4">
          {error}
        </p>
      )}

      <div className="flex gap-3 mt-6">
        <button
          onClick={back}
          className="px-5 py-2.5 text-sm font-semibold text-[#0F2C4C] rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={next}
          disabled={!data.salarySlipUrl || uploading}
          className="px-6 py-2.5 text-sm font-semibold text-white rounded-lg bg-[#0F2C4C] hover:bg-[#0c2340] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
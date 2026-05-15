"use client";

import PdfUpload from "@/utils/file";


export default function SalaryUpload({ data, setData, next, back }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <h2 className="text-lg font-semibold mb-4">
        Upload Salary Slip
      </h2>

      <PdfUpload
        onUpload={(res) => {
          setData({
            ...data,
            salarySlipUrl: res.url,
            salarySlipOriginalName: res.originalName,
          });
        }}
      />

      <div className="flex gap-3 mt-4">
        <button onClick={back} className="btn-outline">
          Back
        </button>

        <button
          onClick={next}
          disabled={!data.salarySlipUrl}
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}
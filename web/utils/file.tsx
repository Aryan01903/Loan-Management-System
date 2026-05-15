"use client";

import { useState } from "react";

interface Props {
  onUpload: (data: { url: string; originalName: string }) => void;
}

const CLOUD_NAME = "dhcxjfbzk";
const UPLOAD_PRESET = "credaxis";

export default function PdfUpload({ onUpload }: Props) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET); 

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) {
        throw new Error("Upload failed");
      }

      const result = {
        url: data.secure_url,
        originalName: file.name,
      };

      setFileName(file.name);

      onUpload(result);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-400">
        Upload Salary Slip (PDF)
      </label>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleUpload(e.target.files[0]);
          }
        }}
        className="border rounded-lg p-2 text-sm"
      />

      {loading && (
        <p className="text-primary/70 text-sm">Uploading...</p>
      )}

      {fileName && (
        <p className="text-green-600 text-sm">
          Uploaded: {fileName}
        </p>
      )}
    </div>
  );
}
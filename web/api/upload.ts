import axios from "@/lib/axios";
import { TResponse } from "@/types/common";

export interface UploadResponse {
  url: string;
  publicId: string;
}

export const uploadSalarySlip = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post<TResponse<UploadResponse>>(
    "/upload/salary-slip",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data.data;
};
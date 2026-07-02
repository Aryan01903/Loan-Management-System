import UploadService from "../../services/upload";
import type { Request, Response } from "express";

class UploadController {
  static async uploadSalarySlip(req: Request, res: Response) {
    const response = {
      data: null as any,
      message: "Internal Server Error",
      code: 500,
    };
    try {
      const file = (req as any).file;
      if (!file) {
        return res.status(400).json({ message: "file is required", code: 400 });
      }

      const srvRes = await UploadService.uploadFile(file.buffer, "salary-slips");
      if (srvRes.status) {
        response.data = srvRes.data;
        response.message = "file uploaded successfully";
        response.code = 201;
      }
      return res.status(response.code).json({
        data: response.data,
        message: response.message,
        code: response.code,
      });
    } catch (err: any) {
      return res.status(500).json({
        message: err.message || "Internal Server Error",
        code: 500,
      });
    }
  }
}

export default UploadController;
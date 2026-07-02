import { Router } from "express";
import UploadController from "./controller";
import { validateToken } from "../../middleware/ValidateToken";
import { upload } from "../../middleware/MulterMiddleware";

const UploadRoutes = Router();

UploadRoutes.post(
  "/salary-slip",
  validateToken,
  upload.single("file"),
  UploadController.uploadSalarySlip
);

export default UploadRoutes;
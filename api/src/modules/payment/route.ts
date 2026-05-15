import { Router } from "express";
import PaymentController from "./controller";
import { validateToken } from "../../middleware/ValidateToken";
import { roleMiddleware } from "../../middleware/RoleMiddleware";

const PaymentRoutes = Router();

PaymentRoutes.post(
  "/:loanId/record",
  validateToken,
  roleMiddleware("collection", "admin"),
  PaymentController.recordPayment
);

PaymentRoutes.get(
  "/:loanId/all",
  validateToken,
  roleMiddleware("collection", "admin", "sanction", "disbursement"),
  PaymentController.getPaymentsByLoan
);

PaymentRoutes.get(
  "/:loanId/outstanding",
  validateToken,
  roleMiddleware("collection", "admin", "sanction", "disbursement"),
  PaymentController.getOutstandingBalance
);

export default PaymentRoutes;
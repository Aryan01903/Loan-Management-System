import { Router } from "express";
import PaymentController from "./controller";

const PaymentRoutes = Router();

PaymentRoutes.post("/:loanId/record", PaymentController.recordPayment)
PaymentRoutes.get("/:loanId/all", PaymentController.getPaymentsByLoan)
PaymentRoutes.get("/:loanId/outstanding", PaymentController.getOutstandingBalance)

export default PaymentRoutes;
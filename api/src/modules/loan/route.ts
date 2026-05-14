import { Router } from "express";
import LoanController from "./controller";

const LoanRoutes = Router();

LoanRoutes.post("/create", LoanController.createLoan)
LoanRoutes.get("/status/:status", LoanController.getLoansByStatus)
LoanRoutes.get("/borrower/:borrowerId", LoanController.getLoansByBorrower)
LoanRoutes.get("/:id", LoanController.getLoanById)
LoanRoutes.patch("/:id/status", LoanController.updateLoanStatus)

export default LoanRoutes;
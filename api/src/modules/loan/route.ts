import { Router } from "express";
import LoanController from "./controller";
import { validateToken } from "../../middleware/ValidateToken";
import { roleMiddleware } from "../../middleware/RoleMiddleware";

const LoanRoutes = Router();

LoanRoutes.post(
    "/create",
    validateToken,
    roleMiddleware("borrower"),
    LoanController.createLoan
);

LoanRoutes.get(
    "/status/:status",
    validateToken,
    roleMiddleware("admin", "sanction", "disbursement", "collection", "sales"),
    LoanController.getLoansByStatus
);

LoanRoutes.get(
    "/borrower/:borrowerId",
    validateToken,
    roleMiddleware("borrower"),
    LoanController.getLoansByBorrower
);

LoanRoutes.get(
    "/:id",
    validateToken,
    LoanController.getLoanById
);

LoanRoutes.patch(
    "/:id/status",
    validateToken,
    roleMiddleware("sanction", "disbursement", "admin"),
    LoanController.updateLoanStatus
);

export default LoanRoutes;
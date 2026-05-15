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
    "/leads", 
    validateToken,
    roleMiddleware("admin", "sales"),
    LoanController.getSalesLeads
)

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
    roleMiddleware("sanction", "disbursement", "admin", "borrower"),
    LoanController.updateLoanStatus
);


export default LoanRoutes;
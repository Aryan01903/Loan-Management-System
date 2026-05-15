import LoanService from "../../services/loan"
import type { Request, Response } from "express"
import type { ILoan, LoanStatus } from "../../types/loan"

class LoanController {

    static async createLoan(req: Request, res: Response) {
        const response = {
            data: null as any,
            message: "Internal Server Error",
            code: 500
        }
        try {
            const srvRes = await LoanService.createLoan(req.body as ILoan);
            if (srvRes.status) {
                response.data = srvRes.data;
                response.message = "loan created successfully";
                response.code = 201;
            }
            return res.status(response.code).json({
                data: response.data,
                message: response.message,
                code: response.code
            })

        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Internal Server Error",
                code: 500
            })
        }
    }

    static async getLoanById(req: Request, res: Response) {
        const response = {
            data: null as any,
            message: "Internal Server Error",
            code: 500
        }
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ message: "loan id is required", code: 400 })

            const srvRes = await LoanService.getLoanById(id as string);
            if (srvRes.status) {
                response.data = srvRes.data;
                response.message = "loan fetched successfully";
                response.code = 200;
            }
            return res.status(response.code).json({
                data: response.data,
                message: response.message,
                code: response.code
            })

        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Internal Server Error",
                code: 500
            })
        }
    }

    static async getLoansByStatus(req: Request, res: Response) {
        const response = {
            data: null as any,
            message: "Internal Server Error",
            code: 500
        }
        try {
            const { status } = req.params;
            if (!status) return res.status(400).json({ message: "status is required", code: 400 })

            const srvRes = await LoanService.getLoansByStatus(status as LoanStatus);
            if (srvRes.status) {
                response.data = srvRes.data;
                response.message = "loans fetched successfully";
                response.code = 200;
            }
            return res.status(response.code).json({
                data: response.data,
                message: response.message,
                code: response.code
            })

        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Internal Server Error",
                code: 500
            })
        }
    }

    static async getLoansByBorrower(req: Request, res: Response) {
        const response = {
            data: null as any,
            message: "Internal Server Error",
            code: 500
        }
        try {
            const { borrowerId } = req.params;
            if (!borrowerId) return res.status(400).json({ message: "borrower id is required", code: 400 })

            const srvRes = await LoanService.getLoansByBorrower(borrowerId as string);
            if (srvRes.status) {
                response.data = srvRes.data;
                response.message = "loans fetched successfully";
                response.code = 200;
            }
            return res.status(response.code).json({
                data: response.data,
                message: response.message,
                code: response.code
            })

        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Internal Server Error",
                code: 500
            })
        }
    }

    static async updateLoanStatus(req: Request, res: Response) {
        const response = {
            data: null as any,
            message: "Internal Server Error",
            code: 500
        }
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ message: "loan id is required", code: 400 })

            const { status, rejectionReason } = req.body;
            const executiveId = (req as any).user.id;

            const srvRes = await LoanService.updateLoanStatus(id as string, status as LoanStatus, executiveId, rejectionReason);
            if (srvRes.status) {
                response.data = srvRes.data;
                response.message = "loan status updated successfully";
                response.code = 200;
            }
            return res.status(response.code).json({
                data: response.data,
                message: response.message,
                code: response.code
            })

        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Internal Server Error",
                code: 500
            })
        }
    }
    static async getSalesLeads(req: Request, res: Response) {
        const response = {
            data: null as any,
            message: "Internal Server Error",
            code: 500
        }
        try {
            const srvRes = await LoanService.getSalesLeads();
            if (srvRes.status) {
                response.data = srvRes.data;
                response.message = "leads fetched successfully";
                response.code = 200;
            }
            return res.status(response.code).json({
                data: response.data,
                message: response.message,
                code: response.code
            })

        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Internal Server Error",
                code: 500
            })
        }
    }
}

export default LoanController
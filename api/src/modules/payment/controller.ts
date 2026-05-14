import PaymentService from "../../services/payment"
import type { Request, Response } from "express"

class PaymentController {

    static async recordPayment(req: Request, res: Response) {
        const response = {
            data: null as any,
            message: "Internal Server Error",
            code: 500
        }
        try {
            const { loanId } = req.params;
            if (!loanId) return res.status(400).json({ message: "loan id is required", code: 400 })

            const { utrNumber, amount, paymentDate } = req.body;
            const executiveId = (req as any).user.id;

            const srvRes = await PaymentService.recordPayment(loanId as string, executiveId, utrNumber, amount, paymentDate);
            if (srvRes.status) {
                response.data = srvRes.data;
                response.message = "payment recorded successfully";
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

    static async getPaymentsByLoan(req: Request, res: Response) {
        const response = {
            data: null as any,
            message: "Internal Server Error",
            code: 500
        }
        try {
            const { loanId } = req.params;
            if (!loanId) return res.status(400).json({ message: "loan id is required", code: 400 })

            const srvRes = await PaymentService.getPaymentsByLoan(loanId as string);
            if (srvRes.status) {
                response.data = srvRes.data;
                response.message = "payments fetched successfully";
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

    static async getOutstandingBalance(req: Request, res: Response) {
        const response = {
            data: null as any,
            message: "Internal Server Error",
            code: 500
        }
        try {
            const { loanId } = req.params;
            if (!loanId) return res.status(400).json({ message: "loan id is required", code: 400 })

            const srvRes = await PaymentService.getOutstandingBalance(loanId as string);
            if (srvRes.status) {
                response.data = srvRes.data;
                response.message = "outstanding balance fetched successfully";
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

export default PaymentController
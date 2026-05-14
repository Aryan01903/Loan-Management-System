import PaymentModel from "../models/payment";
import LoanModel from "../models/loan";
import type mongoose from "mongoose";

class PaymentService {
  static async recordPayment(
    loanId: string,
    executiveId: mongoose.Types.ObjectId,
    utrNumber: string,
    amount: number,
    paymentDate: Date,
  ) {
    const response = {
      data: null as any,
      status: false,
    };
    try {
      const loan = await LoanModel.findById(loanId);
      if (!loan) throw new Error("loan not found!");
      if (loan.status !== "disbursed") throw new Error("loan is not active!");

      const existingUtr = await PaymentModel.findOne({ utrNumber });
      if (existingUtr) throw new Error("utr number already exists!");

      const payments = await PaymentModel.find({ loanId });
      const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
      const outstandingBefore = loan.totalRepayment - totalPaid;

      if (amount > outstandingBefore)
        throw new Error("amount exceeds outstanding balance!");

      const outstandingAfter = outstandingBefore - amount;

      const docData = await PaymentModel.create({
        loanId,
        recordedBy: executiveId,
        utrNumber,
        amount,
        paymentDate,
        outstandingBefore,
        outstandingAfter,
      });

      if (outstandingAfter === 0) {
        loan.status = "closed";
        loan.closedAt = new Date();
        await loan.save();
      }

      response.data = { payment: docData, outstandingAfter };
      response.status = true;
    } catch (err) {
      throw err;
    }
    return response;
  }

  static async getPaymentsByLoan(loanId: string) {
    const response = {
      data: null as any,
      status: false,
    };
    try {
      const docData = await PaymentModel.find({ loanId }).sort({
        createdAt: -1,
      });

      response.data = docData;
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }

  static async getOutstandingBalance(loanId: string) {
    const response = {
      data: null as any,
      status: false,
    };
    try {
      const loan = await LoanModel.findById(loanId);
      if (!loan) throw new Error("loan not found!");

      const payments = await PaymentModel.find({ loanId });
      const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
      const outstanding = loan.totalRepayment - totalPaid;

      response.data = {
        totalRepayment: loan.totalRepayment,
        totalPaid,
        outstanding,
      };
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default PaymentService;

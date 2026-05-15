import LoanModel from "../models/loan";
import PaymentModel from "../models/payment";
import UserModel from "../models/user";
import { isValidTransition } from "../types/loan";
import type { ILoan, LoanStatus } from "../types/loan";
import type mongoose from "mongoose";
import { IUser } from "../types/user";

class LoanServices {
  static async createLoan(data: ILoan) {
    const response = {
      data: null as any,
      status: false,
    };
    try {
      const totalInterest = (data.amount * 12 * data.tenure) / (365 * 100);
      const totalRepayment = data.amount + totalInterest;

      const docData = await LoanModel.create({
        ...data,
        interestRate: 12,
        totalInterest,
        totalRepayment,
        status: "pending",
      });

      response.data = docData;
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }

  static async getLoanById(loanId: string) {
    const response = {
      data: null as any,
      status: false,
    };
    try {
      const docData = await LoanModel.findById(loanId).populate(
        "borrowerId",
        "-password",
      );
      if (!docData) {
        throw new Error("loan not found!");
      }

      response.data = docData;
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }

  static async getLoansByStatus(status: LoanStatus) {
    const response = {
      data: null as any,
      status: false,
    };
    try {
      const docData = await LoanModel.find({ status }).populate(
        "borrowerId",
        "-password",
      );

      response.data = docData;
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }

  static async getLoansByBorrower(borrowerId: string) {
    const response = {
      data: null as any,
      status: false,
    };
    try {
      const docData = await LoanModel.find({ borrowerId });

      response.data = docData;
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }

  static async updateLoanStatus(
    loanId: string,
    toStatus: LoanStatus,
    executiveId: mongoose.Types.ObjectId,
    rejectionReason?: string,
  ) {
    const response = {
      data: null as any,
      status: false,
    };
    try {
      const loan = await LoanModel.findById(loanId);
      if (!loan) {
        throw new Error("loan not found!");
      }
      if (!isValidTransition(loan.status, toStatus)) {
        throw new Error(`cannot move from '${loan.status}' to '${toStatus}'`);
      }

      if (toStatus === "sanctioned") {
        loan.sanctionedBy = executiveId;
        loan.sanctionedAt = new Date();
      }
      if (toStatus === "rejected") {
        if (!rejectionReason) throw new Error("rejection reason is required!");
        loan.rejectedBy = executiveId;
        loan.rejectedAt = new Date();
        loan.rejectionReason = rejectionReason;
      }
      if (toStatus === "disbursed") {
        loan.disbursedBy = executiveId;
        loan.disbursedAt = new Date();
      }
      if (toStatus === "closed") {
        loan.closedAt = new Date();
      }

      loan.status = toStatus;
      await loan.save();

      response.data = loan;
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }


  static async getSalesLeads() {
    const response = {
      data: [] as any[],
      status: false,
    };

    try {
      const borrowers = await UserModel.find(
        { role: "borrower" },
        "-password"
      ).lean();

      const borrowerIds = borrowers.map((b) => b._id);

      const loans = await LoanModel.find({
        borrowerId: { $in: borrowerIds },
      }).lean();

      const loanUserIds = new Set(
        loans.map((l) => l.borrowerId.toString())
      );

      const leads = borrowers.filter(
        (b) => !loanUserIds.has(b._id.toString())
      );

      response.data = leads;
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }

}

export default LoanServices;

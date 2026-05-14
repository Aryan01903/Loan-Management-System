import { model, Schema } from "mongoose";
import type { ILoan } from "../types/loan";

const LoanSchema = new Schema<ILoan>(
    {
        borrowerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 50000,
            max: 500000,
        },
        tenure: {
            type: Number,
            required: true,
            min: 30,
            max: 365,
        },
        interestRate: {
            type: Number,
            required: true,
            default: 12,
        },

        totalInterest: {
            type: Number,
            required: true,
        },
        totalRepayment: {
            type: Number,
            required: true,
        },

        salarySlipUrl: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "applied", "sanctioned", "rejected", "disbursed", "closed"],
            default: "pending",
            index: true,
        },

        sanctionedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        sanctionedAt: Date,
        rejectedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        rejectedAt: Date,
        rejectionReason: {
            type: String,
            trim: true,
        },

        disbursedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        disbursedAt: Date,

        closedAt: Date,
    },
    {
        timestamps: true,
    }
);

const LoanModel = model<ILoan>("Loan", LoanSchema)

export default LoanModel;
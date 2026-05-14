import { model, Schema } from "mongoose";
import type { IPayment } from "../types/payment";

const PaymentSchema = new Schema<IPayment>(
  {
    loanId: {
      type: Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
      index: true,
    },
    recordedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
 
    utrNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
 
    amount: {
      type: Number,
      required: true,
      min: [1, "Payment amount must be at least ₹1"],
    },
 
    paymentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
 
    outstandingBefore: {
      type: Number,
      required: true,
    },
    outstandingAfter: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
 
PaymentSchema.index({ loanId: 1, createdAt: -1 });

const PaymentModel = model<IPayment>("Payment", PaymentSchema)
export default PaymentModel
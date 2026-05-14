import mongoose, { Document } from "mongoose";

export interface IPayment extends Document {
  loanId: mongoose.Types.ObjectId;
  recordedBy: mongoose.Types.ObjectId;  
 
  utrNumber: string;  
  amount: number;
  paymentDate: Date;
  outstandingBefore: number;
  outstandingAfter: number;
}
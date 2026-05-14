import type mongoose from "mongoose";

export type LoanStatus =
  | "pending"     
  | "applied"     
  | "sanctioned"    
  | "rejected"    
  | "disbursed"    
  | "closed";      
 
export interface ILoan extends Document {
  borrowerId: mongoose.Types.ObjectId;
  amount: number;          
  tenure: number;        
  interestRate: number;  
  totalInterest: number;   
  totalRepayment: number;  
  salarySlipUrl: string;
  salarySlipOriginalName: string;
  status: LoanStatus;
  sanctionedBy?: mongoose.Types.ObjectId;
  sanctionedAt?: Date;
  rejectedBy?: mongoose.Types.ObjectId;
  rejectedAt?: Date;
  rejectionReason?: string;
  disbursedBy?: mongoose.Types.ObjectId;
  disbursedAt?: Date;
  closedAt?: Date;
  totalPaid?: number;
}

export const VALID_TRANSITIONS: Record<LoanStatus, LoanStatus[]> = {
  pending:     ["applied"],
  applied:     ["sanctioned", "rejected"],
  sanctioned:  ["disbursed"],
  rejected:    [],
  disbursed:   ["closed"],
  closed:      [],
};
 
export function isValidTransition(from: LoanStatus, to: LoanStatus): boolean {  // it is healper function added to check if a transition is valid or not
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}
import { IUser } from "./user";

export type LoanStatus =
  | "pending"
  | "applied"
  | "sanctioned"
  | "rejected"
  | "disbursed"
  | "closed";

export interface ILoan {
  _id: string;

  borrowerId: IUser;

  amount: number;
  tenure: number;
  interestRate: number;

  totalInterest: number;
  totalRepayment: number;

  salarySlipUrl: string;

  status: LoanStatus;

  sanctionedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  disbursedAt?: string;
  closedAt?: string;

  createdAt: string;
}
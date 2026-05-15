export interface IPayment {
  _id: string;

  loanId: string;
  recordedBy: string;

  utrNumber: string;
  amount: number;

  paymentDate: string;

  outstandingBefore: number;
  outstandingAfter: number;

  createdAt: string;
}

export interface RecordPaymentResponse {
  payment: IPayment;
  outstandingAfter: number;
}

export interface OutstandingResponse {
  totalRepayment: number;
  totalPaid: number;
  outstanding: number;
}
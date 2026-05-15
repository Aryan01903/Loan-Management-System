import { IPayment } from "./api-response/payment";

export interface TResponse<T> {
  data: T;
  message: string;
  code: number;
}

export interface RecordPaymentResponse {
  payment: IPayment;
  outstandingAfter: number;
}
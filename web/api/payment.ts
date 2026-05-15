import axios from "@/lib/axios";
import { IPayment, OutstandingResponse } from "@/types/api-response/payment";
import { RecordPaymentResponse, TResponse } from "@/types/common";

export const recordPayment = async (
  loanId: string,
  data: {
    utrNumber: string;
    amount: number;
    paymentDate: Date;
  }
) => {
  const res = await axios.post<TResponse<RecordPaymentResponse>>(
    `/payment/${loanId}/record`,
    data
  );
  return res.data.data;
};

export const getPayments = async (loanId: string) => {
  const res = await axios.get<TResponse<IPayment[]>>(
    `/payment/${loanId}/all`
  );
  return res.data.data;
};

export const getOutstanding = async (loanId: string) => {
  const res = await axios.get<TResponse<OutstandingResponse>>(
    `/payment/${loanId}/outstanding`
  );
  return res.data.data;
};
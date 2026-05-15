import axios from "@/lib/axios";
import { ILoan, LoanStatus } from "@/types/api-response/loan";
import { IUser } from "@/types/api-response/user";
import { TResponse } from "@/types/common";

export const createLoan = async (data: {
  borrowerId: string;
  amount: number;
  tenure: number;
  salarySlipUrl: string;
}) => {
  const res = await axios.post<TResponse<ILoan>>(
    "/loan/create",
    data
  );
  return res.data.data;
};

export const getLoansByStatus = async (status: LoanStatus) => {
  const res = await axios.get<TResponse<ILoan[]>>(
    `/loan/status/${status}`
  );
  return res.data.data;
};

export const getMyLoans = async (borrowerId: string) => {
  const res = await axios.get<TResponse<ILoan[]>>(
    `/loan/borrower/${borrowerId}`
  );
  return res.data.data;
};

export const getLoanById = async (id: string) => {
  const res = await axios.get<TResponse<ILoan>>(
    `/loan/${id}`
  );
  return res.data.data;
};

export const updateLoanStatus = async (
  id: string,
  data: {
    status: LoanStatus;
    rejectionReason?: string;
  }
) => {
  const res = await axios.patch<TResponse<ILoan>>(
    `/loan/${id}/status`,
    data
  );
  return res.data.data;
};

export const getSalesLeads = async () => {
  const res = await axios.get<TResponse<IUser[]>>(
    `/loan/leads`
  );
  return res.data.data;
};
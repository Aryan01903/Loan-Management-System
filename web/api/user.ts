import axios from "@/lib/axios";
import { IUser, LoginResponse } from "@/types/api-response/user";
import { TResponse } from "@/types/common";

export const registerUser = async (data: Partial<IUser>) => {
  const res = await axios.post<TResponse<LoginResponse>>(
    "/user/register",
    data
  );
  return res.data.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axios.post<TResponse<LoginResponse>>(
    "/user/login",
    data
  );
  return res.data.data;
};
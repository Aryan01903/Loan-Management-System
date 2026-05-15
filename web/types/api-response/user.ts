export type UserRole =
  | "borrower"
  | "admin"
  | "sales"
  | "sanction"
  | "disbursement"
  | "collection";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;

  pan?: string;
  dob?: string;
  monthlySalary?: number;
  employmentMode?: "salaried" | "self-employed" | "unemployed";

  isEligible?: boolean;
  breChecked?: boolean;
}

export interface LoginResponse extends IUser {
  token: string;
}
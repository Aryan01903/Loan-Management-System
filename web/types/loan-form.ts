export type EmploymentMode = "salaried" | "self-employed" | "unemployed" | "";

export interface LoanFormData {
  name: string;
  pan: string;
  dob: string;
  monthlySalary: number | "";
  employmentMode: EmploymentMode;
  salarySlipUrl: string;
  salarySlipOriginalName: string;
  amount: number;
  tenure: number;
}

export interface StepProps {
  data: LoanFormData;
  setData: React.Dispatch<React.SetStateAction<LoanFormData>>;
}
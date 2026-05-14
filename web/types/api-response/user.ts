export interface IUser {
    name: string;
    email: string
    password: string
    role: "borrower" | "admin" | "sales" | "sanction" | "disbursement" | "collection";
    pan: string
    dob: Date
    monthlySalary: number
    employmentMode: "salaried" | "self-employed" | "unemployed";
    isEligible: boolean
    breChecked: boolean
}
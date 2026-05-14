import { Schema, model } from "mongoose";
import type { IUser } from "../types/user";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: [
        "borrower",
        "admin",
        "sales",
        "sanction",
        "disbursement",
        "collection",
      ],
      default: "borrower",
    },

    pan: {
      type: String,
      uppercase: true,
      match: [/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format"],
    },

    dob: {
      type: Date,
    },

    monthlySalary: {
      type: Number,
      min: 0,
    },

    employmentMode: {
      type: String,
      enum: ["salaried", "self-employed", "unemployed"],
    },

    isEligible: {
      type: Boolean,
      default: false,
    },

    breChecked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
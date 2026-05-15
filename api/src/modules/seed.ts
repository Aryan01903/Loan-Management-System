import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import UserModel from "../models/user";

dotenv.config();
export type UserRole = "borrower" | "admin" | "sales" | "sanction" | "disbursement" | "collection";

const seeds: { name: string; email: string; password: string; role: UserRole }[] = [
  { name: "Admin User",        email: "admin@credaxis.com",        password: "Admin@123",    role: "admin" },
  { name: "Sales User",        email: "sales@credaxis.com",        password: "Sales@123",    role: "sales" },
  { name: "Sanction User",     email: "sanction@credaxis.com",     password: "Sanction@123", role: "sanction" },
  { name: "Disbursement User", email: "disbursement@credaxis.com", password: "Disburse@123", role: "disbursement" },
  { name: "Collection User",   email: "collection@credaxis.com",   password: "Collect@123",  role: "collection" },
  { name: "Borrower User",     email: "borrower@credaxis.com",     password: "Borrower@123", role: "borrower" },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("Database connected");

    for (const user of seeds) {
      const existing = await UserModel.findOne({ email: user.email });
      if (existing) {
        console.log(`Already exists: ${user.email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      await UserModel.create({ ...user, password: hashedPassword });
      console.log(`Created: ${user.role} → ${user.email}`);
    }

    console.log("Seed completed!");
    console.log("Login Credentials:");
    seeds.forEach((u) => {
      console.log(`${u.role.padEnd(15)} ${u.email.padEnd(35)} ${u.password}`);
    });

  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected");
    process.exit(0);
  }
};

seed();
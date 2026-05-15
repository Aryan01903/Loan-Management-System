import UserModel from "../models/user";
import type { IUser } from "../types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  static async register(data: IUser) {
    const response = {
      data: null as any,
      status: false,
    };
    try {
      if (await UserModel.findOne({ email: data.email })) {
        throw new Error("user already present!");
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const docData = await UserModel.create({
        ...data,
        password: hashedPassword,
      });
      const token = jwt.sign(
        { id: docData._id, role: docData.role },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" },
      );
      
      const { password, ...rest } = docData.toObject();
      response.data = {
        ...rest,
        token,
      };
      response.status = true;

      return response;
    } catch (err) {
      throw err;
    }
  }

  static async login(data: Pick<IUser, "email" | "password">) {
  const response = {
    data: null as any,
    status: false,
  };
  try{
    const docData = await UserModel.findOne({ email: data.email });
    if (!docData) throw new Error("user not found!");

    const isMatch = await bcrypt.compare(data.password, docData.password);
    if (!isMatch) throw new Error("invalid credentials!");

    const token = jwt.sign(
      { id: docData._id, role: docData.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const { password, ...rest } = docData.toObject();
    response.data = {
      ...rest,
      token,
    };

    response.status = true;
    return response;
    } catch(err){
      throw err
    }
  }
}

export default UserService;

import UserModel from "../models/user";
import type { IUser } from "../types/user";

class services{
    static async register(data:IUser){
        const response = {
            data: null,
            status: false
        }
        try{
            const docData = await UserModel.findById({email: data.email})
            if(docData){
                throw new Error("user already present!")
            }
            // docData.name = data.name

        }
    }
}
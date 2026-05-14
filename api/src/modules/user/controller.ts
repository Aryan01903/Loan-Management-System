import UserService from "../../services/user"
import type { Request, Response } from "express"
import type { IUser } from "../../types/user"

class UserController {
    static async register(req: Request, res: Response) {
        const response = {
            data: null as any,
            message: "Internal Server Error",
            code: 500
        }
        try {
            const srvRes = await UserService.register(req.body as IUser);
            if (srvRes.status) {
                response.data = srvRes.data;
                response.message = "registered successfully";
                response.code = 201;
            }
            return res.status(response.code).json({
                data: response.data,
                message: response.message,
                code: response.code
            })

        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Internal Server Error",
                code: 500
            })
        }
    }

    static async login(req: Request, res: Response) {
        const response = {
            data: null as any,
            message: "Internal Server Error",
            code: 500
        }
        try {
            const srvRes = await UserService.login(req.body as Pick<IUser, "email" | "password">);
            if (srvRes.status) {
                response.data = srvRes.data;
                response.message = "login successful";
                response.code = 200;
            }
            return res.status(response.code).json({
                data: response.data,
                message: response.message,
                code: response.code
            })

        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Internal Server Error",
                code: 500
            })
        }
    }
}

export default UserController
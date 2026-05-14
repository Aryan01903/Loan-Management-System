import { Router } from "express";
import UserController from "./controller";

const UserRoutes = Router();

UserRoutes.post("/register", UserController.register)
UserRoutes.get("/login", UserController.login)

export default UserRoutes;

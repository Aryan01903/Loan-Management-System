import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors";
import UserRoutes from "./modules/user/route";
import PaymentRoutes from "./modules/payment/route";
import LoanRoutes from "./modules/loan/route";
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use("/user", UserRoutes);
app.use("/loan", LoanRoutes);
app.use("/payment", PaymentRoutes)

const PORT = process.env.PORT || 5050;
mongoose.connect(process.env.DB_URL!).then(() => {
    console.log("Database connected")
    app.listen(PORT, () => {
        console.log("Server started at: ", PORT)
    })
}).catch((err: any) => {
    console.log("Database Disconnected", err)
})
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5050;

mongoose.connect(process.env.DB_URL!).then(() => {
    console.log("Database connected")
    app.listen(PORT, () => {
        console.log("Server started at: ", PORT)
    })
}).catch((err: any) => {
    console.log("Database Disconnected", err)
})

import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import dataModelResultsRouter from "./routes/dataModelResults.js"
import "dotenv/config.js"

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))

app.use("/api/user", userRouter)
app.use("/api/model", dataModelResultsRouter)

app.get("/", (req, res) => {
    res.send("API is Working")
})

app.listen(port, () => {
    console.log("Server is running suceesfully!!")
})
connectDB()
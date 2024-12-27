import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import dataModelResultsRouter from "./routes/dataModelResults.js"
import "dotenv/config.js"
// import serverless from 'serverless-http'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors({
    // origin: ["http://localhost:5173"],
    origin: ["https://hanelytics-solution-visionsoft-1.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


app.use("/api/user", userRouter)
app.use("/api/model", dataModelResultsRouter)

app.get("/start", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>HANElytics server</title>
          <style>
            div{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: black;
            }
            h1{
                color: white;
            }
          </style>
        </head>
        <body>
            <div>
                <h1>You are Successfully started HANElytics Server</h1>
            </div>
        </body>
        </html>
      `);
})


app.listen(port, () => {
    console.log("Server is running suceesfully!!")
})
connectDB()
// module.exports.handler = serverless(app)

// export const handler = serverless(app)
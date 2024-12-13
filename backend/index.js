import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import dataModelResultsRouter from "./routes/dataModelResults.js"
import "dotenv/config.js"

import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors({
    // origin: ["http://localhost:5173"],
    origin: ["https://hanelytics-solution-visionsoft-1.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(
    '/odata', // Match all requests starting with /odata
    createProxyMiddleware({
        target: 'http://52.38.202.58:8080', // SAP OData HTTP endpoint
        changeOrigin: true,
        pathRewrite: {
            '^/odata': '/sap/opu/odata/VSHANEYA/HANELYTICS_SRV/AutomationSet', // Rewrite the path for SAP OData service
        },
        onProxyReq: (proxyReq, req) => {
            // Add basic authentication headers
            const auth = 'Basic ' + Buffer.from('Hanelytics:Hanelytics@24').toString('base64');
            proxyReq.setHeader('Authorization', auth);
        },
    })
);

app.use("/api/user", userRouter)
app.use("/api/model", dataModelResultsRouter)

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Hello from Node.js</title>
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
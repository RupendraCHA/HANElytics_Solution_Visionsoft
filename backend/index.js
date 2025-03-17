import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import dataModelResultsRouter from "./routes/dataModelResults.js";
import "dotenv/config.js";
// import serverless from 'serverless-http'

const app = express();
const port = process.env.PORT;

 
app.use(express.json());
app.use(
  cors({
    // origin: ["http://localhost:5175"],
    origin: ["https://hanelytics-solution-visionsoft-1.onrender.com"], // origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/model", dataModelResultsRouter);

app.get("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html>
        <head>
        <link
      rel="icon"
      type="image/svg+xml"
      href="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1727239316/vs_syjood.jpg"
    />
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
});
//Hanelytics
app.listen(port, () => {
  console.log("Server is running suceesfully!!");
});
connectDB();
// module.exports.handler = serverless(app)

// export const handler = serverless(app)

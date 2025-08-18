import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import dataModelResultsRouter from "./routes/dataModelResults.js";
import "dotenv/config.js";
import salesRouter from "./routes/salesTableDataRoute.js";
import procurementRouter from "./routes/procurementTableDataRoute.js";
// import serverless from 'serverless-http'
import multer from "multer";
import dashboardUploadRouter from "./routes/DashboardUploadRoute.js";

import bodyParser from "body-parser";
import embedPowerbiRouter from "./routes/EmbedPowerBIRoute.js";


const app = express();

const port = process.env.PORT;


app.use(express.json());
app.use(bodyParser.json());



app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/model", dataModelResultsRouter);
app.use("/api/sales", salesRouter);
app.use("/api/procurement", procurementRouter);
app.use("/api/dashboard", dashboardUploadRouter)
app.use("/powerbi/embed", embedPowerbiRouter)

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const { fileName } = req.body;
  try {
    if (!req.file) {
      console.error("File is missing");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File received:", fileName);
    const newFile = new File({
      name: req.file.originalname,
      file: req.file.buffer,
      mimetype: req.file.mimetype,
      contentType: req.file.mimetype,
      fileName: fileName,
    });

    await newFile.save();
    console.log("File saved to MongoDB");
    res
      .status(200)
      .json({ message: "File uploaded successfully!", fileId: newFile._id });
  } catch (error) {
    console.error("Error in file uploading:", error);
    res.status(500).json({ error: "Error in file uploading" });
  }
});

app.get("/file/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ success: false, error: "File Not Found" });
    }

    const newFile = await File.findOne({ _id: req.params.id });

    res.setHeader("Content-Type", file.contentType);
    res.send(file.file);
  } catch (error) {
    res.status(500).json({ error: "Error in file uploading" });
  }
});




// app.get("/", (req, res) => {
//   res.send(`
//         <!DOCTYPE html>
//         <html>
//         <head>
//         <link
//       rel="icon"
//       type="image/svg+xml"
//       href="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1727239316/vs_syjood.jpg"
//     />
//           <title>HANElytics server</title>
//           <style>
//             div{
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 height: 100vh;
//                 background-color: black;
//             }
//             h1{
//                 color: white;
//             }
//           </style>
//         </head>
//         <body>
//             <div>
//                 <h1>You are Successfully started HANElytics Server</h1>
//             </div>
//         </body>
//         </html>
//       `);
// });

app.get("/", (req, res) => {
  // if (req.headers.accept && req.headers.accept.includes("application/json")) {
  //   res.json({ message: "HANElytics Server is Running Successfully!" });
  // } else {
  //   res.send(`
  //     <!DOCTYPE html>
  //     <html>
  //     <head>
  //       <link rel="icon" type="image/svg+xml" href="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1727239316/vs_syjood.jpg" />
  //       <title>HANElytics server</title>
  //       <style>
  //         div {
  //             display: flex;
  //             justify-content: center;
  //             align-items: center;
  //             height: 100vh;
  //             background-color: black;
  //         }
  //         h1 {
  //             color: white;
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       <div>
  //         <h1>You are Successfully started HANElytics Server</h1>
  //       </div>
  //     </body>
  //     </html>
  //   `);
  // }
  res.status(200).json({message: "Backend is Active"})
});

//Hanelytics
app.listen(port, () => {
  console.log("Server is running suceesfully!!");
});
connectDB();
// module.exports.handler = serverless(app)

// export const handler = serverless(app)

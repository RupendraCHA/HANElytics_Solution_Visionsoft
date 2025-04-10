import express from "express";
import {
  createUserDashboardAccess,
  deleteTheDashboard,
  getAllDashboards,
  getUserDashboardData,
  updateTheDashboard,
  uploadDashboard,
} from "../controllers/dashboardUploadController.js";

const dashboardUploadRouter = express.Router();

dashboardUploadRouter.post("/upload", uploadDashboard);
dashboardUploadRouter.get("/getAll", getAllDashboards);
dashboardUploadRouter.put("/update/:id", updateTheDashboard);
dashboardUploadRouter.delete("/delete/:id", deleteTheDashboard);
dashboardUploadRouter.post("/permissions", createUserDashboardAccess);
dashboardUploadRouter.post("/getUserDashboard", getUserDashboardData);

export default dashboardUploadRouter;

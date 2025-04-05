import express from "express"
import { getAllDashboards, uploadDashboard } from "../controllers/dashboardUploadController.js"

const dashboardUploadRouter = express.Router()

dashboardUploadRouter.post('/upload', uploadDashboard)
dashboardUploadRouter.get('/getAll', getAllDashboards)

export default dashboardUploadRouter
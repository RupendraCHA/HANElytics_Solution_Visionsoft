import express from "express"
import { deleteTheDashboard, getAllDashboards, updateTheDashboard, uploadDashboard } from "../controllers/dashboardUploadController.js"

const dashboardUploadRouter = express.Router()

dashboardUploadRouter.post('/upload', uploadDashboard)
dashboardUploadRouter.get('/getAll', getAllDashboards)
dashboardUploadRouter.put('/update/:id', updateTheDashboard)
dashboardUploadRouter.delete('/delete/:id', deleteTheDashboard)

export default dashboardUploadRouter
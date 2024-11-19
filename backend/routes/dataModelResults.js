import express from "express"

import {
    InventoryModelResults,
    RevenueModelResults,
    EquipmentModelResults,
    ClinicalModelresults
} from "../controllers/modelResultsController.js"

import authMiddleware from "../middlewares/auth.js"

const dataModelResultsRouter = express.Router()

dataModelResultsRouter.get("/inventory",authMiddleware, InventoryModelResults)
dataModelResultsRouter.get("/revenue", RevenueModelResults)
dataModelResultsRouter.get("/equipment", EquipmentModelResults)
dataModelResultsRouter.get("/clinical", ClinicalModelresults)


export default dataModelResultsRouter

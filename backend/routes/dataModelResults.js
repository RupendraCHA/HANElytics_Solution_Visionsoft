import express from "express"

import {
    InventoryModelResults,
    RevenueModelResults,
    EquipmentModelResults,
    ClinicalModelresults,
    // AutomationToSAP,
    getOdata,
    transferDataToSAP
} from "../controllers/modelResultsController.js"

import authMiddleware from "../middlewares/auth.js"

const dataModelResultsRouter = express.Router()

dataModelResultsRouter.get("/inventory",authMiddleware, InventoryModelResults)
dataModelResultsRouter.get("/revenue", authMiddleware, RevenueModelResults)
dataModelResultsRouter.get("/equipment", authMiddleware, EquipmentModelResults)
dataModelResultsRouter.get("/clinical",authMiddleware, ClinicalModelresults)
// dataModelResultsRouter.post("/odata",authMiddleware, AutomationToSAP)
dataModelResultsRouter.post("/dataToSap",authMiddleware, transferDataToSAP)
dataModelResultsRouter.get("/odataResults", getOdata)


export default dataModelResultsRouter

import express from "express"

import {
    InventoryModelResults,
    RevenueModelResults,
    EquipmentModelResults,
    ClinicalModelresults,
    // AutomationToSAP,
    getOdata,
    transferDataToSAP,
    transferDataToSAP1
} from "../controllers/modelResultsController.js"

import authMiddleware from "../middlewares/auth.js"

const dataModelResultsRouter = express.Router()

dataModelResultsRouter.get("/inventory",authMiddleware, InventoryModelResults)
dataModelResultsRouter.get("/revenue", authMiddleware, RevenueModelResults)
dataModelResultsRouter.get("/equipment", authMiddleware, EquipmentModelResults)
dataModelResultsRouter.get("/clinical",authMiddleware, ClinicalModelresults)
// dataModelResultsRouter.post("/odata",authMiddleware, AutomationToSAP)
dataModelResultsRouter.post("/dataToSap",authMiddleware, transferDataToSAP)
dataModelResultsRouter.post("/dataToSap1",authMiddleware, transferDataToSAP1)
dataModelResultsRouter.get("/odataResults", getOdata)


export default dataModelResultsRouter

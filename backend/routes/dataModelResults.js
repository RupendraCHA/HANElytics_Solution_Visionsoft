import express from "express"

import {
    InventoryModelResults,
    RevenueModelResults,
    EquipmentModelResults,
    ClinicalModelresults
} from "../controllers/modelResultsController.js"

const dataModelResultsRouter = express.Router()

dataModelResultsRouter.get("/inventory", InventoryModelResults)
dataModelResultsRouter.get("/revenue", RevenueModelResults)
dataModelResultsRouter.get("/equipment", EquipmentModelResults)
dataModelResultsRouter.get("/clinical", ClinicalModelresults)


export default dataModelResultsRouter

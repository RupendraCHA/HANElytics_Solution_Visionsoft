import express from "express";
import authMiddleware from "../middlewares/auth.js";

import {
  getProcurementItemData,
  getProcurementItemEKPOData,
  getProcurementTableDataFromEKKO,
  getProcurementTableDataFromEKPO,
} from "../controllers/procurementTableDataController.js";

const procurementRouter = express.Router();

procurementRouter.get("/ekko", getProcurementTableDataFromEKKO);
procurementRouter.get("/ekpo", getProcurementTableDataFromEKPO);
procurementRouter.get("/:purchaseOrderNumber/ekko", getProcurementItemData);
procurementRouter.get("/:purchaseOrderNumber/ekpo", getProcurementItemEKPOData);

export default procurementRouter;

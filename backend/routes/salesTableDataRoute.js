import express from "express";
import authMiddleware from "../middlewares/auth.js";

import {
  getSalesTableDataFromVBAK,
  getSalesTableDataFromVBAP,
  getSalesDocumentOrderItemData,
  getSalesTableDataFromLIKP,
  getSalesDocumenDeliverytItemData,
  getSalesTableDataFromLIPS,
  getSalesTableDataFromVBRK,
  getSalesDocumenBillingtItemData,
  getSalesTableDataFromVBRP,
  getFilesDataFromEKKO,
  getFilesDataFromEKPO,
  getFilesDataFromSRGBTBREL,
} from "../controllers/salesTableDataController.js";
const salesRouter = express.Router();

salesRouter.get("/vbak", getSalesTableDataFromVBAK);
salesRouter.get("/vbap", getSalesTableDataFromVBAP);
salesRouter.get("/likp", getSalesTableDataFromLIKP);
salesRouter.get("/lips", getSalesTableDataFromLIPS);
salesRouter.get("/vbrk", getSalesTableDataFromVBRK);
salesRouter.get("/vbrp", getSalesTableDataFromVBRP);
salesRouter.get("/ekko", getFilesDataFromEKKO);
salesRouter.get("/ekpo", getFilesDataFromEKPO);
salesRouter.get("/srgbtbrel", getFilesDataFromSRGBTBREL);
salesRouter.get(
  "/:documentNumber/orderItemData",
  getSalesDocumentOrderItemData
);
salesRouter.get(
  "/:documentNumber/deliveryItemData",
  getSalesDocumenDeliverytItemData
);
salesRouter.get(
  "/:documentNumber/billingItemData",
  getSalesDocumenBillingtItemData
);

export default salesRouter;

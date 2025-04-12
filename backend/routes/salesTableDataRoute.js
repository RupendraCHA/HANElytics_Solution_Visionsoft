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
  getFilesDataFromEBAN,
  getFilesDataFromMATDOC,
  getFilesDataFromACDOCAGeneralLedger,
  getFilesDataFromACDOCAPaybles,
  getFilesDataFromACDOCAReceivables,
  getFilesDataFromPLPO,
  getFilesDataFromAFVC,
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
salesRouter.get("/eban", getFilesDataFromEBAN);
salesRouter.get("/matdoc", getFilesDataFromMATDOC);
salesRouter.get("/acdoca1", getFilesDataFromACDOCAGeneralLedger);
salesRouter.get("/acdoca2", getFilesDataFromACDOCAPaybles);
salesRouter.get("/acdoca3", getFilesDataFromACDOCAReceivables);
salesRouter.get("/plpo", getFilesDataFromPLPO);
salesRouter.get("/afvc", getFilesDataFromAFVC);

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

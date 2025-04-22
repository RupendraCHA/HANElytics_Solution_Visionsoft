import express from "express";

import { EmbedPowerBIDashboards } from "../controllers/embedPowerbiController.js";

const embedPowerbiRouter = express.Router()

embedPowerbiRouter.post("/getDashboard", EmbedPowerBIDashboards)

export default embedPowerbiRouter
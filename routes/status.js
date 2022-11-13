import express from "express";

import { postStatus } from "../controllers/status.js";

const statusRouter = express.Router();

statusRouter.post("/", postStatus);

export default statusRouter;
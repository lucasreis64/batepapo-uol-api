import express from "express";

import { postStatus } from "../controllers/status/post.js";

const statusRouter = express.Router();

statusRouter.post("/", postStatus);

export default statusRouter;

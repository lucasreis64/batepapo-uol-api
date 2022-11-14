import express from "express";

import { getParticipants } from "../controllers/participants/get.js";
import { postParticipant } from "../controllers/participants/post.js";

const participantsRouter = express.Router();

participantsRouter.get("/", getParticipants);
participantsRouter.post("/", postParticipant);

export default participantsRouter;

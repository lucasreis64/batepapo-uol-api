import express from "express";

import { getParticipants, postParticipant } from "../controllers/participants.js";

const participantsRouter = express.Router();

participantsRouter.get("/", getParticipants);
participantsRouter.post("/", postParticipant);

export default participantsRouter;
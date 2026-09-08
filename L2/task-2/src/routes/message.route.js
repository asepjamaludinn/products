import express from "express";
import {
  getConversations,
  startDirectConversation,
  startSupportConversation,
  getMessages,
} from "../controllers/message.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);
router.get("/", getConversations);
router.post("/", startDirectConversation);
router.post("/support", startSupportConversation);
router.get("/:conversationId/messages", getMessages);

export default router;

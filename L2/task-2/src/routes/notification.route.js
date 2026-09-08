import express from "express";
import {
  getNotifications,
  readNotification,
  readAllNotifications,
} from "../controllers/notification.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticate);
router.get("/", getNotifications);
router.patch("/read-all", readAllNotifications);
router.patch("/:id/read", readNotification);

export default router;

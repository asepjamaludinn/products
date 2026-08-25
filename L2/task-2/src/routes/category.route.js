import express from "express";

import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

import {
  createCategorySchema,
  categoryIdSchema,
} from "../schemas/category.schema.js";

const router = express.Router();

router.get("/", getCategories);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createCategorySchema),
  createCategory,
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(categoryIdSchema, "params"),
  deleteCategory,
);

export default router;

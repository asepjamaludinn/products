import express from "express";

import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { requireApiKey } from "../middlewares/auth.middleware.js";

import {
  createCategorySchema,
  categoryIdSchema,
} from "../schemas/category.schema.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/", requireApiKey, validate(createCategorySchema), createCategory);

router.delete(
  "/:id",
  requireApiKey,
  validate(categoryIdSchema, "params"),
  deleteCategory,
);

export default router;

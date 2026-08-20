import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { requireApiKey } from "../middlewares/auth.middleware.js";

import {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
} from "../schemas/product.schema.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", validate(productIdSchema, "params"), getProductById);

router.post("/", requireApiKey, validate(createProductSchema), createProduct);

router.put(
  "/:id",
  requireApiKey,
  validate(productIdSchema, "params"),
  validate(updateProductSchema),
  updateProduct,
);

router.delete(
  "/:id",
  requireApiKey,
  validate(productIdSchema, "params"),
  deleteProduct,
);

export default router;

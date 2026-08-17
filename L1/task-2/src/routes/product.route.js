import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { validate } from "../middlewares/validate.middleware.js";

import {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
} from "../schemas/product.schema.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", validate(productIdSchema, "params"), getProductById);

router.post("/", validate(createProductSchema), createProduct);

router.put(
  "/:id",
  validate(productIdSchema, "params"),
  validate(updateProductSchema),
  updateProduct,
);

router.delete("/:id", validate(productIdSchema, "params"), deleteProduct);

export default router;

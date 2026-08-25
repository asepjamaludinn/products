import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

import {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
  listProductsQuerySchema,
} from "../schemas/product.schema.js";

const router = express.Router();

router.get("/", validate(listProductsQuerySchema, "query"), getProducts);

router.get("/:id", validate(productIdSchema, "params"), getProductById);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createProductSchema),
  createProduct,
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(productIdSchema, "params"),
  validate(updateProductSchema),
  updateProduct,
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validate(productIdSchema, "params"),
  deleteProduct,
);

export default router;

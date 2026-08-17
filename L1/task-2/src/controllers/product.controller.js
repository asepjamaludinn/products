import * as productService from "../services/product.service.js";

export const getProducts = (req, res) => {
  const products = productService.getProducts();

  res.status(200).json({
    success: true,
    data: products,
  });
};

export const getProductById = (req, res) => {
  const product = productService.getProductById(Number(req.params.id));

  res.status(200).json({
    success: true,
    data: product,
  });
};

export const createProduct = (req, res) => {
  const product = productService.createProduct(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

export const updateProduct = (req, res) => {
  const product = productService.updateProduct(Number(req.params.id), req.body);

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

export const deleteProduct = (req, res) => {
  const product = productService.deleteProduct(Number(req.params.id));

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: product,
  });
};

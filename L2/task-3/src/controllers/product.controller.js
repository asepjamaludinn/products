import * as productService from "../services/product.service.js";

export const getProducts = async (req, res) => {
  const products = await productService.getProducts();

  res.status(200).json({
    success: true,
    data: products,
  });
};

export const getProductById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  res.status(200).json({
    success: true,
    data: product,
  });
};

export const createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

export const updateProduct = async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

export const deleteProduct = async (req, res) => {
  const product = await productService.deleteProduct(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: product,
  });
};

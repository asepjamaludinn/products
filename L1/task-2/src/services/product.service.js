import * as productRepository from "../repositories/product.repository.js";

export const getProducts = () => {
  return productRepository.findAll();
};

export const getProductById = (id) => {
  const product = productRepository.findById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

export const createProduct = (productData) => {
  return productRepository.create(productData);
};

export const updateProduct = (id, productData) => {
  const product = productRepository.update(id, productData);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

export const deleteProduct = (id) => {
  const product = productRepository.remove(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

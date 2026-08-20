import * as productRepository from "../repositories/product.repository.js";

export const getProducts = async () => {
  return productRepository.findAll();
};

export const getProductById = async (id) => {
  const product = await productRepository.findById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

export const createProduct = async (productData) => {
  return productRepository.create(productData);
};

export const updateProduct = async (id, productData) => {
  return productRepository.update(id, productData);
};

export const deleteProduct = async (id) => {
  return productRepository.remove(id);
};

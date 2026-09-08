import * as productRepository from "../repositories/product.repository.js";

export const getProducts = async ({ page, limit, categoryId, search }) => {
  const [products, total] = await Promise.all([
    productRepository.findAll({ page, limit, categoryId, search }),
    productRepository.count({ categoryId, search }),
  ]);

  return {
    products,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
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

export const createProduct = async (productData) =>
  productRepository.create(productData);
export const updateProduct = async (id, productData) =>
  productRepository.update(id, productData);
export const deleteProduct = async (id) => productRepository.remove(id);

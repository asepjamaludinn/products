import * as productRepository from "../repositories/product.repository.js";

export const getProducts = async ({ page, limit, categoryId }) => {
  const [products, total] = await Promise.all([
    productRepository.findAll({ page, limit, categoryId }),
    productRepository.count({ categoryId }),
  ]);

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
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

export const createProduct = async (productData) => {
  return productRepository.create(productData);
};

export const updateProduct = async (id, productData) => {
  return productRepository.update(id, productData);
};

export const deleteProduct = async (id) => {
  return productRepository.remove(id);
};

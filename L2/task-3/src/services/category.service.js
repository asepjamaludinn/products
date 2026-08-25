import * as categoryRepository from "../repositories/category.repository.js";

export const getCategories = async () => {
  return categoryRepository.findAll();
};

export const createCategory = async (categoryData) => {
  return categoryRepository.create(categoryData);
};

export const deleteCategory = async (id) => {
  return categoryRepository.remove(id);
};

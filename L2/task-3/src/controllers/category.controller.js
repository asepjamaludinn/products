import * as categoryService from "../services/category.service.js";

export const getCategories = async (req, res) => {
  const categories = await categoryService.getCategories();

  res.status(200).json({
    success: true,
    data: categories,
  });
};

export const createCategory = async (req, res) => {
  const category = await categoryService.createCategory(req.body);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
};

export const deleteCategory = async (req, res) => {
  await categoryService.deleteCategory(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
};

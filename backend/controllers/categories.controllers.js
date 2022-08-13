const Category = require("../models/Category");

//create category
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await new Category({
      name,
    });
    const savedCat = await newCategory.save();
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all categories
exports.getAllCategories =  async (req, res) => {
    try {
     const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  };

const express= require("express");
const { createCategory, getAllCategories } = require("../controllers/categories.controllers");
const router = express.Router();


//create category
router.post('/create',createCategory);
//get all categories
router.get('/',getAllCategories);

module.exports=router;
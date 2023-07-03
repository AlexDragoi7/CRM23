const express = require('express');
const categoryController = require("../controllers/categoryController");
const {createCategory, getAllCategories} = categoryController;

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories)

module.exports = router;
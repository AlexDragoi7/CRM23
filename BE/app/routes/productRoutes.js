const express = require('express');
const prodController = require('../controllers/productController');
const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct} = prodController;
const userAuth = require('../middleware/userAuth');

const router = express.Router();

router.post('/', userAuth.isAuthenticated, createProduct);
router.get('/', userAuth.isAuthenticated, getAllProducts);
router.get('/:id', userAuth.isAuthenticated, getProductById);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
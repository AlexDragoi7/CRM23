const express = require('express');
const prodController = require('../controllers/productController');
const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, searchProduct, getUserProducts} = prodController;
const userAuth = require('../middleware/userAuth');

const router = express.Router();

router.post('/', userAuth.isAuthenticated, createProduct);
router.get('/', userAuth.isAuthenticated, getAllProducts);
router.get('/myproducts',userAuth.isAuthenticated,getUserProducts);
router.get("/search", searchProduct);
router.get('/:id', userAuth.isAuthenticated, getProductById);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;
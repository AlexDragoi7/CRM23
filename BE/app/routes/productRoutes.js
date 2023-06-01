const express = require('express');
const prodController = require('../controllers/productController');
const {createProduct, getAllProducts} = prodController;
const userAuth = require('../middleware/userAuth');

const router = express.Router();

router.post('/', userAuth.isAuthenticated, createProduct);
router.get('/', userAuth.isAuthenticated, getAllProducts);

module.exports = router;
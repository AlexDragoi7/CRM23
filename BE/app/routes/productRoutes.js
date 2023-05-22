const express = require('express');
const prodController = require('../controllers/productController');
const {createProduct} = prodController;
const userAuth = require('../middleware/userAuth');

const router = express.Router();

router.post('/', userAuth.isAuthenticated, createProduct);

module.exports = router;
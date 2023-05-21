const express = require('express');
const userController = require("../controllers/userController");
const {signup, login, getAllUsers} = userController;
const userAuth = require('../middleware/userAuth');


const router = express.Router();

router.post("/signup", userAuth.saveUser, signup);
router.get("/", userAuth.isAuthenticated, getAllUsers)

router.post("/login", login);

module.exports = router;
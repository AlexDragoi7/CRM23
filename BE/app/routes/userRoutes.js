const express = require('express');
const userController = require("../controllers/userController");
const {signup, login, getAllUsers, resetPassword} = userController;
const userAuth = require('../middleware/userAuth');


const router = express.Router();

router.post("/signup", userAuth.saveUser, signup);
router.get("/", userAuth.isAuthenticated, getAllUsers)
router.patch("/resetpassword", resetPassword)

router.post("/login", login);

module.exports = router;
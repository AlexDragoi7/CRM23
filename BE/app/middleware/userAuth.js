const express = require('express');
const database = require('../models');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const users = database.users;

const saveUser = async (req, res, next) => {
    try{
        const username = await users.findOne({
            where: {
                user_name: req.body.user_name
            },
        });

        if(username){
            return res.json(409).send("Username already taken!");
        }

        const emailcheck = await users.findOne({
            where: {
                email: req.body.email
            },
        });

        if(emailcheck){
            return res.json(409).send("Email authentication failed!")
        }

        next();
    }
   catch(error){
    console.log(error);
    }
};

const isAuthenticated = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            return next("Please login to access the data");
        }
        
        const verify = await jwt.verify(token, process.env.SECRETKEY);
        req.user = await usersModel.findById(verify.id);
        next();
    }catch(error){
        return next(error);
    }
};


module.exports = {saveUser, isAuthenticated};
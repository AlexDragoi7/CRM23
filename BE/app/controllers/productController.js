const express = require('express');
const userAuth = require('../middleware/userAuth');
const database = require('../models');
const jwt = require('jsonwebtoken')


const prodDB = database.products;

const createProduct = async (req, res, next) => {
    try{
        const {product_name, product_description, product_quantity} = req.body;

        const {token} = req.cookies;
        const verify = await jwt.verify(token, process.env.SECRETKEY);
        console.log(verify);

        const data1 = {
            user_id: verify.id,
            product_name,
            product_description,
            product_quantity,
        }
    
        const prod = await prodDB.create(data1);

        if(prod){
            res.status(201).json(prod)
        }else{
            res.status(404).send(`Incorrect data inserted`)
        }



    }catch(error){
        return next(error);
    }
    
}

module.exports = {createProduct};
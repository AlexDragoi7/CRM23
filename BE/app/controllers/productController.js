const express = require('express');
const userAuth = require('../middleware/userAuth');
const database = require('../models');
const jwt = require('jsonwebtoken');



const prodDB = database.products;

const createProduct = async (req, res, next) => {
    try{
        const {product_name, product_description, product_quantity, category_id} = req.body;

        const {token} = req.cookies;
        const verify = await jwt.verify(token, process.env.SECRETKEY);
        console.log(verify);

        const data1 = {
            user_id: verify.id,
            category_id,
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

//Get all products - done

const getAllProducts = async (req, res, next) => {
    try{
        const allProds = await prodDB.findAll({
            order: database.sequelize.col('id')
        });
        if(allProds){
            res.status(200).json(allProds)
        }else{
            res.status(400).send(`No data available!`);
        }
    }catch(error){
        res.send(error);
    }
}

const getProductById = async (req, res, next) => {
    try{
        const prodById = await prodDB.findOne({
            where: {
                id: req.params.id
            }
        })

        if(prodById){
            res.status(200).json(prodById)
        }else{
            res.status(404).send("Product unavailable")
        }
    }catch(err){
        console.error(err)
    }
}

const getUserProducts = async (req, res) => {
    try{
        const {token} = req.cookies;
        const verify = jwt.verify(token, process.env.SECRETKEY);
    
        const userProducts = await prodDB.findAll({
            where: {
                user_id: verify.id
            }
        })
    
        if(userProducts){
            res.status(200).json(userProducts)
        }else{
            res.status(404).send("User does not have any products available")
        }
    }catch(err){
        console.error(err)
    }
}

const updateProduct = async (req, res) => {
    try{

        const {product_name, product_description, product_quantity} = req.body;
        const idIdentifier = req.params

        

        const updatedProd = await prodDB.update({
            product_name: product_name,
            product_description: product_description,
            product_quantity: product_quantity
        }, {
            where: {
                id:idIdentifier.id
            }
        })
        
       
        

        if(updatedProd[0] != 0){
            res.status(200).json({
                message: `Product updated`
            })
        }else{
            res.status(404).send("Product cannot be updated")
        }

    }catch(err){
        console.error(err)
    }
}

const deleteProduct = async (req, res) => {
    try{

        const deletedProd = await prodDB.destroy({
            where: {
                id: req.params.id
            }
        })

        if(deletedProd){
            res.status(200).json({
                message: "Product removed"
            })
        }else{
            res.status(404).send("Deleting error")
        }

    }catch(err){
        console.error(err)
    }
}

// Search product 

const searchProduct = async (req, res) => {
    try{
        const searchProdLowerCase = await req.query.product_name.toLowerCase();

        const filteredProd = await prodDB.findAndCountAll({
            where: {
                product_name: database.sequelize.where(database.sequelize.fn('LOWER', database.sequelize.col('product_name')), 'LIKE', `%${searchProdLowerCase}%`)
            }
        })

        if(filteredProd){
            res.status(200).json(filteredProd)
        }else{
            res.status(404).send("Error")
        }

    }catch(err){
        console.error(err)
    }
}

// 

module.exports = {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, searchProduct, getUserProducts};
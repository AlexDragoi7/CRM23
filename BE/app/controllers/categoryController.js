const express = require('express');

const database = require("../models");



const catDB = database.categories;

const createCategory = async (req, res, next) => {
    try{
        const {category_name} = req.body;


        const data = {category_name};

        const category = await catDB.create(data);

        if(category){
            res.status(201).json(category);
        }else{
            res.status(404).send(`Incorrect category name`);
        }
    }catch(error){
        res.send(error);
    }
}

const getAllCategories = async (req, res, next) => {
    try{
        const allCategories = await catDB.findAll();

        if(allCategories){
            res.status(200).json(allCategories);
        }else{
            res.status(404).send(`Incorrect data`);
        }
    }catch(error){
        res.send(error);
    }
}

module.exports = {createCategory, getAllCategories};
const bcrypt = require('bcrypt');
const database = require("../models");
const jwt = require('jsonwebtoken');

const users = database.users;

const signup = async (req, res) => {
    try{
        const { user_name, email, password} = req.body;
        const data = {
            
            user_name,
            email,
            password: await bcrypt.hash(password, 10)
        };

        const user = await users.create(data, {fields: ['user_name', 'email', 'password']});

        if(user){
            let token = jwt.sign({id: user.id}, process.env.SECRETKEY, {
                expiresIn: 1 * 24 * 60 * 60 * 1000
            });

            res.cookie("token", token, {maxAge: 1*24*60*60, httpOnly: true});
            console.log('user', JSON.stringify(user, null, 2));
            console.log(token);
            return res.status(201).send(user);
        }else{
            return res.status(409).send("Details are not correct");
        }
    } catch(error){
        console.error(error);
    }
};

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await users.findOne({
            where: {
                email: email
            }
        });

        if(user){
            const isSame = await bcrypt.compare(password, user.password);
            if(isSame){
                let token = jwt.sign({id: user.user_id}, process.env.SECRETKEY, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000
                });

                res.cookie('token', token, {maxAge: 1*24*60*60, httpOnly: true});
                console.log('user', JSON.stringify(user, null, 2));
                console.log(token);
                return res.status(201).send({
                    id: user.id,
                    user_name: user.user_name,
                    email: user.email,
                    accessToken: token
                });
            }else{
                return res.status(401).send("Authentication failed!")
            }
        }else{
            return res.status(401).send("Authentication failed!");
        }
    }catch (error){
        console.error(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try{
        const authUsers = await users.findAll();
        if(authUsers){
            return res.status(200).json(authUsers);
        }else{
            return res.status(401).send(`User is not authenticated`);
        }
        
    }catch(error){
        return next(error);
    }
};

module.exports = {signup, login, getAllUsers};
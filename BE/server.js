const express = require('express');
const sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const db = require('./queries');
const database = require('./app/models');
const userRoutes = require('./app/routes/userRoutes');

const port = process.env.port || 3300;

const app = express();
app.use(express.json());

app.use(cookieParser());

database.sequelize.sync({force:false}).then(() => {
    console.log(`Database has been re synced`);
})

app.use('/users', userRoutes);  


app.listen(port,() => {
    console.log(`Connected to port ${port}`);
})
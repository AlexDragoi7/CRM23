const express = require('express');
const sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const db = require('./queries');
const cors = require('cors');
const database = require('./app/models');
const userRoutes = require('./app/routes/userRoutes');
const prodRoutes = require('./app/routes/productRoutes');
const categoryRoutes = require('./app/routes/categoryRoutes');

const port = process.env.port || 3300;

const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(cors());

database.sequelize.sync({force:false}).then(() => {
    console.log(`Database has been re synced`);
})

app.use('/users', userRoutes);
app.use('/products', prodRoutes);
app.use('/categories', categoryRoutes);


app.listen(port,() => {
    console.log(`Connected to port ${port}`);
})
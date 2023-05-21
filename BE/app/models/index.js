const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(`postgres://crm:crm123@localhost:5432/crmdb`, {dialect: 'postgres'});

sequelize.authenticate().then(() => {
    console.log(`Database is connected`)
}).catch((err) => {
    console.error(err);
})

const database = {};
database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.users = require('./usersModel') (sequelize, DataTypes);
database.products = require('./productsModel') (sequelize, DataTypes);
module.exports = database;
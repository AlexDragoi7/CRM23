const {DataTypes} = require('sequelize');
const {sequelize} = require('.');

module.exports = (sequelize, DataTypes) => {
    const categories = sequelize.define("categories", {
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {timestamps: false})

    return categories;
}

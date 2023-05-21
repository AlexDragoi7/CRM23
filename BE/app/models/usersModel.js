const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false},
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            unique: true,
            allowNull: false,
        },
        password: {type: DataTypes.STRING,
        allowNull: false},
    
    }, {timestamps: false})
    return users;
}

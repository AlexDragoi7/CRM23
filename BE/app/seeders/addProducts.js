
module.exports = {

    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('products', [{
            user_id: 1,
            category_id: 5,
            product_name: "Apple iPhone 14 Pro",
            product_description: "iPhone 14 Pro 128 GB, 5G, Deep Purple",
            product_quantity: 20
        }, {
            user_id: 1,
            category_id: 2,
            product_name: "Playstation 5",
            product_description: "Playstation 5, 825GB, C-Chassis, Black",
            product_quantity: 30
        }])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('products', null, {})
    }
};
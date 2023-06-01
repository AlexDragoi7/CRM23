
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("categories", [{
            category_name: "Home appliances",
        }, {
            category_name: "Gaming and Consoles"
        }, {
            category_name: "TV / Audio / Video & Foto"
        }, {
            category_name: "PC, Peripherals and Software"
        }])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {});
    }
};


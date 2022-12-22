const Sequelize = require('sequelize')
const sequelize = require('../config.js')
const Products = sequelize.define('products', {
    
   product_id: {

        type: Sequelize.INTEGER,

        autoIncrement: true,

        allowNull: false,

        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    category: {
        type: Sequelize.STRING,
        allowNull: false
    },

    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    deletedAt: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        defaultValue : 0
        }
})
module.exports = Products
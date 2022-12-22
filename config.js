const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  'sequelize_random', 
  'root', 
  '', {
  dialect: 'mysql',
  host: 'localhost'
   }
);
module.exports = sequelize;
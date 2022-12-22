const Sequelize = require('sequelize')
const conn = {};
const sequelize = new Sequelize(
    'sequelize_random',
    'root',
    '', {
    dialect: 'mysql',
    host: 'localhost'
}
);
conn.sequelize = sequelize;
conn.Sequelize = Sequelize;

module.exports = conn;
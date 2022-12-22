const user = require('./table1')
const product = require('./table2')

user.hasMany(product, { onDelete: 'CASCADE', foreignKey: 'product_id' });
product.belongsTo(user, { onDelete: 'CASCADE', foreignKey: 'product_id' });


const model = {
	user,
	product
};
module.exports = model;
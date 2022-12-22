const { sequelize } = require("../models/connection");
const model = require("./index");
module.exports = {
transaction : async function (id) {
        const t = await sequelize.transaction();
    try {
        const user = await model.user.destroy({
            where: { user_id: id }
        },
        {  transaction: t });
        if (user == 0) {
            throw new Error("ID not exist")
        }
        else {
            const name = await model.product.destroy({
                where: { product_id: id }
            },
               { transaction: t }
            );
            if (name == 0) {
                throw new Error("ID not exist")
            }
            else {
                return user;
            }
        }
        await t.commit();
               
    } catch (error) {
        await t.rollback();
        console.log('rolledBack')
        return 0;
    }
}
}
const { execute } = require('../common/db');

module.exports = {
    async get(orderId) {
        const result = await execute('select order_id, amount, `order`.product_id, total_price, `name` from `order` left join `product` on `order`.product_id = `product`.product_id where order_id=' + orderId);
        return result[0];
    },
    fetch() {
        return execute('select order_id, amount, `order`.product_id, total_price, `name` from `order` left join `product` on `order`.product_id = `product`.product_id');
    },
    delete(orderId) {
        return execute('delete from `order` where order_id=?', [orderId]);
    },
    async save(order) {
        const result = await execute('INSERT INTO `order` SET ?', order);
        return result.insertId;
    }
}
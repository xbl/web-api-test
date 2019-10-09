const superagent = require('superagent');
const config = require('../env/config');

module.exports = {
    async lockStore(productId) {
        try {
            await superagent.post(`${config.STORE_HOST}/api/v1/stores`, { product_id: productId });
        } catch (error) {
            throw new Error('锁库存失败！');
        }
    }
}
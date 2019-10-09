const express = require('express');
const app = express.Router();
const Service = require('./service');
const { lockStore } = require('../stores/service');

app.get('/', async (req, resp, next) => {
    try {
        const orders = await Service.fetch();
        resp.send(orders);
    } catch (error) {
        next(error);        
    }
});

app.get('/:orderId', async (req, resp, next) => {
    try {
        const order = await Service.get(req.params.orderId);
        resp.send(order);
    } catch(error) {
        next(error);
    }
});

app.delete('/:orderId', async (req, resp, next) => {
    try {
        await Service.delete(req.params.orderId);
        resp.send({});
    } catch (error) {
        next(error);
    }
});

app.post('/', async (req, resp, next) => {
    try {
        const order = req.body;
        await lockStore(order.product_id);
        const orderId = await Service.save(order);
        resp.send({ order_id: orderId});
    } catch (error) {
        next(error);
    }
})

module.exports = app;
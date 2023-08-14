const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')


router.post('/api/orderData', async (req, res) => {
    try {
        const { order_data, order_date } = req.body;
        const newOrder = new Order({
            order_data,
            order_date,
        });
        await newOrder.save();
        res.status(200).json({ message: 'Order saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;




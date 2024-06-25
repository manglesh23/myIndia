const Order = require('../models/order');


const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('products.product');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate('products.product');
        if (!order) return res.status(404).json({ msg: 'Order not found' });
        res.json(order);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports={getOrders,getOrderById}
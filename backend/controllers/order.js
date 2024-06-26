const Order = require("../models/order");
const Product = require("../models/product");

const createOrder = async (req, res) => {
  const { products } = req.body;
  console.log("products:-", products);
  try {
    let total = 0;

    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ msg: `Product with id ${item.product} not found` });
      }
      total += product.price * item.quantity;

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ msg: `Not enough stock for product ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    const newOrder = new Order({
      user: req.user.id,
      products,
      total,
    });

    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server error");
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");
    res.status(200).json({ orders: orders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("products.product");
    if (!order) return res.status(404).json({ msg: "Order not found" });

    res.status(200).json({ order: order });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { createOrder, getOrders, getOrderById };

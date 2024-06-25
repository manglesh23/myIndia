const Product = require("../models/product");

const createproduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const newProduct = new Product({ name, description, price, stock });
    const product = await newProduct.save();
    res.status(200).json({ message: product });
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log("req.user:-",req.user);
    res.status(200).json({Product:products});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
module.exports = { createproduct, getProducts };

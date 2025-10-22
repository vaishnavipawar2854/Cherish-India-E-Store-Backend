const Product = require('../models/productModel');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    }

    return res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, category, countInStock, ecoFriendly } = req.body;

    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      countInStock,
      ecoFriendly,
    });

    const createdProduct = await product.save();
    return res.status(201).json(createdProduct);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, category, countInStock, ecoFriendly } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.image = image;
    product.category = category;
    product.countInStock = countInStock;
    product.ecoFriendly = ecoFriendly;

    const updatedProduct = await product.save();
    return res.json(updatedProduct);
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Use deleteOne to remove the document
    await product.deleteOne();
    return res.json({ message: 'Product removed' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
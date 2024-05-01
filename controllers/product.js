const Product = require('../models/product.js');

// Controller to create a new product
exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Controller to update a product
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Controller to get a single product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id)
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Controller to get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Controller to delete a product
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
      const categoryId = req.params.id; // Assuming category ID is passed as a URL parameter
      const products = await Product.find({ category: categoryId }).populate('category').exec();
      res.json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}
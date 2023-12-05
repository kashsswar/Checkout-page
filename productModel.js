// productModel.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: String, unique: true, required: true },
  productName: { type: String, required: true },
  // Add more fields as needed
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('./productModel');

// Add a new product
router.post('/add', async (req, res) => {
  const { productId, productName } = req.body;

  try {
    const existingProduct = await Product.findOne({ productId });
    if (existingProduct) {
      return res.status(400).json('Product with this ID already exists.');
    }

    const newProduct = new Product({ productId, productName });
    await newProduct.save();
    res.status(201).json('Product added successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

// Modify an existing product
router.put('/modify/:productId', async (req, res) => {
  const { productId } = req.params;
  const { productName } = req.body;

  try {
    const existingProduct = await Product.findOneAndUpdate(
      { productId },
      { productName },
      { new: true }
    );

    if (!existingProduct) {
      return res.status(404).json('Product not found.');
    }

    res.status(200).json('Product modified successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

// Delete a product
router.delete('/delete/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findOneAndDelete({ productId });

    if (!deletedProduct) {
      return res.status(404).json('Product not found.');
    }

    res.status(200).json('Product deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

module.exports = router;

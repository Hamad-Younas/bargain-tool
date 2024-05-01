const express = require('express');
const { createProduct, getAllProducts,getProductById,updateProduct,deleteProduct,getProductsByCategory } = require('../controllers/product.js');

const router = express.Router();

router.post('/', createProduct);
router.get('/:id', getProductById);
router.get('/category/:id', getProductsByCategory);
router.get('/', getAllProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
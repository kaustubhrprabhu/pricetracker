const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/verifyUser.js');
const { add, getProducts, getAll, deleteProduct } = require('../controllers/product.controller.js');

router.post('/add', verifyToken, add);
router.get('/getproducts', verifyToken, getProducts);
router.get('/getall', verifyToken, getAll);
router.delete('/delete/:id/:userid', verifyToken, deleteProduct);

module.exports = router;
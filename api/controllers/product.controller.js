const { errorHandler } = require("../utils/error.js");
const { Product } = require('../models/product.model.js');
const { getProductDetails } = require('../services/product.service.js');

const add = async (req, res, next) => {
    const { url } = req.body;
    if (!url) {
        return next(errorHandler(400, 'URL required'));
    }

    try {
        const details = await getProductDetails(url);
        if (!details) {
            return next(errorHandler(400, 'Invalid URL'));
        }
        const newProduct = await Product({
            ...details,
            email: req.user.email,
        }).save();
        return res.status(201).json(newProduct);
    } catch (err) {
        return next(err);
    }
}

const getProducts = async (req, res, next) => {
    const { id } = req.query;

    if (id) {
        try {
            const product = await Product.findById(id).exec();
            if (!product) {
                return next(errorHandler(404, 'Product not found'))
            }
            return res.json(product);
        } catch (err) {
            return next(err);
        }
    }

    try {
        const products = await Product.find({ email: req.user.email }).sort({ createdAt: -1 }).exec();
        return res.json(products);
    } catch (err) {
        return next(err);
    }
}

const getAll = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'Access forbidden'));
    }

    try {
        const products = await Product.find({}).sort({ title: 1 });
        return res.json(products);
    } catch (err) {
        next(err);
    }
}

const deleteProduct = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userid) {
        return next(errorHandler(403, 'You are not allowed to delete this product'));
    }

    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return next(errorHandler(404, 'Product not found'));
        }

        return res.status(200).json({ message: 'Product has been deleted' });
    } catch (err) {
        return next(err);
    }
}

module.exports = { add, getProducts, getAll, deleteProduct }
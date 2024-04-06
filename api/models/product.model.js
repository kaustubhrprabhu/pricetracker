const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true
    },

    oldprice: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
        default: '',
    },

    email: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }
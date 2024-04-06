const { getProductDetails } = require('../services/product.service.js');
const { sendMail } = require('../utils/mailer.js');
const { Product } = require('../models/product.model.js');

const updatePrice = async (product) => {
    try {
        const { price } = await getProductDetails(product.url);

        if (price < product.price && price < product.oldprice) {
            sendMail({
                from: '"PriceTracker" <no-reply@pricetracker.localhost>',
                to: product.email,
                subject: 'Price Dropped 📉',
                html: `<div style="text-align: center"><img src="${product.image}" style="width:50%;" alt="product image" /></div>
                <center>
                  <h2>${product.title}</h2>
                  <p>The price has been dropped from ₹${product.price} to <b>₹${price}</b></p>
                  <a href="${product.url}" target="_blank" rel="noopener noreferrer">Grab the deal</a>
                </center>`
            });
        }

        product.price = price;
        product.save();

    } catch (err) {
        console.error(`\u001b[31m${err.message}\u001b[0m for product ${product._id}`);
    }
}

const trackerService = async () => {
    try {
        const products = await Product.find({});
        const promiseList = products.map((product) => updatePrice(product));
        await Promise.all(promiseList);
        console.log(`\u001b[32m[${new Date()}]:\u001b[0m Updation occurred`);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = { trackerService }
const { getAllProducts } = require('../models/product.model.js');
const { getProductDetails } = require('../services/product.service.js');
const nodemailer = require('nodemailer');

const updatePrice = async (product) => {
    try {
        const latestProduct = await getProductDetails(product.url);
        if (!latestProduct) {
            return console.error('Unable to fetch product details');
        }
        const { price } = latestProduct;

        if (price < product.price && price < product.oldprice) {
            // Send mail to appropriate user
            var transport = nodemailer.createTransport({
                service: 'gmail',
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: process.env.GOOGLE_EMAIL,
                    pass: process.env.GOOGLE_PASS,
                }
            });

            await transport.sendMail({
                from: '"PriceTracker" <pricetracker@localhost>', // sender address
                to: product.email, // list of receivers
                subject: "Price Dropped", // Subject line
                html: `<div><img src="${product.image}" /></div>
                <h2>${product.title}</h2><br>
                <p>Price has been dropped! <a href="${product.url}">Click here to grab the deal.</a></p>`, // html body
            });

        }
        product.price = price;
        await product.save();
    } catch (err) {
        console.error(`Error: ${err.code}\n\nMessage: ${err}`);
    }
}

const trackProduct = async () => {
    const productPromises = [];
    const products = await getAllProducts();
    products.forEach((product) => {
        productPromises.push(updatePrice(product));
    });
    await Promise.all(productPromises);
    console.log(`Products updated [${new Date()}]`);
}

module.exports = { trackProduct }
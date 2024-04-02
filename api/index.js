require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cron = require('node-cron');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');
const productRoutes = require('./routes/product.route.js');
const { trackProduct } = require('./utils/tracker.js');

const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

app.get('/status', (req, res) => {
    res.json({ status: 'Operational' });
});

// Demo page for testing
app.get('/demo-page', (req, res) => {
    res.sendFile(__dirname + '/demo-page.html');
});

// Middleware to handle error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})

// Cron job

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        cron.schedule('0 * * * *', trackProduct); // Every hour
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
    .catch(err => {
        console.log(err.message);
    });
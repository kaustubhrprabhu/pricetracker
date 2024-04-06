const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS,
    }
});

const sendMail = async (message) => {
    const mail = await transport.sendMail(message);
    return mail.messageId;
}

module.exports = { sendMail }
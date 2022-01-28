const nodemailer = require('nodemailer');

const keys = require('../keys')

module.exports = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: keys.mail.email,
        pass: keys.mail.password
    },
});



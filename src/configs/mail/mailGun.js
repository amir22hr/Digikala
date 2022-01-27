// const mailgun = require("mailgun-js");
const sgMail = require('@sendgrid/mail')

const keys = require('../keys')

module.exports = sgMail.setApiKey(keys.mailGun.key)



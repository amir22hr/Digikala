const mailgun = require("mailgun-js");

const keys = require('../keys')

module.exports = mailgun({ apiKey: keys.mailGun.key, domain: keys.mailGun.domain });



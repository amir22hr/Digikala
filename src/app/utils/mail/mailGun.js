const mg = require('../../../configs/mail/mailGun')
const keys = require('../../../configs/keys')


/**
 * 
 * @param {string} to 
 * @param {string} subject 
 * @param {string} text 
 */
const mailGun = async ({ to, subject, text = "", html = "" }) => {

    const data = {
        from: keys.mailGun.sender,
        to,
        subject,
        text,
        html,
    };

    mg.messages().send(data, function (error, body) {
        if (error) console.log(error)
        console.log(body);
    });

}

module.exports = mailGun
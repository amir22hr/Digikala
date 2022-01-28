const mail = require('../../../configs/mail/mail')
const keys = require('../../../configs/keys')


/**
 * 
 * @param {string} to 
 * @param {string} subject 
 * @param {string} text 
 */
const mailSender = async ({ to, subject, html = "" }) => {

    const data = {
        to,
        from: keys.mail.email,
        subject,
        html,
    };

    await mail.sendMail(data, (err, info) => {
        if (err) console.log(err)
    });

}

module.exports = mailSender
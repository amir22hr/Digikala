const mg = require('../../../configs/mail/mailGun')
const keys = require('../../../configs/keys')


/**
 * 
 * @param {string} to 
 * @param {string} subject 
 * @param {string} text 
 */
const mailGun = async ({ to, subject, html = "" }) => {


    const data = {
        to,
        from: keys.mailGun.sender,
        subject,
        html,
    };

    await mg
        .send(data)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
            console.error(error.response.body)
        })

}

module.exports = mailGun
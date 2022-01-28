const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const ejs = require('ejs');

const { rou, lang, validation, mailSender } = require('../../utils')
const { Customer } = require('../../models')

const get = async (req, res) => {

    if (!req.query.email) {
        return res.status(302).redirect(rou.loginRegister)
    }

    //Validation Input
    const { error } = validation.passwordRecoveryValidation(req.query);
    if (error) {
        return res.status(302).redirect(rou.loginRegister);
    }

    //defines
    const email = req.query.email;
    const customer = await Customer.findOne({ email })
    const cryptoToken = crypto.randomBytes(7).toString('hex');

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(cryptoToken, salt)

    //save new password
    customer.password = hashedPassword;
    await customer.save();

    //render ejs
    const dataMail = {
        name: customer.name,
        title: lang.passwordRecovery,
        cryptoToken,
        rou
    }
    const html = await ejs.renderFile(`${__dirname}/../../views/mail/passwordRecoveryMail.ejs`, dataMail)

    //Validation DB
    if (customer) {
        //EmailSender
        await mailSender({
            to: email,
            subject: lang.passwordRecovery,
            html
        });
    } else {
        return res.status(302).redirect(rou.loginRegister);
    }

    //
    const data = {
        title: lang.passwordRecovery,
        email,
        rou,
    }

    res.render('authentication/passwordRecovery', data)
}

const post = async (req, res) => {

    //Redirect to loginRegister
    return res.status(302).redirect(rou.loginRegister);

}

module.exports = {
    get,
    post
}
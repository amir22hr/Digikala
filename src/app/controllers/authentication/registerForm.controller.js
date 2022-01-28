const bcrypt = require('bcryptjs')
const ejs = require('ejs')

const { rou, lang, faErrors, validation, mailSender, setCookie } = require('../../utils')
const { Queues, Customer } = require('../../models')

const get = async (req, res) => {

    const token = req.query.token

    if (!token) {
        return res.status(302).redirect(rou.loginRegister)
    }

    //get flash message
    const getFlash = req.flash('login')[0];
    if (getFlash) {
        var setFlash = {
            status: getFlash.status,
            msg: getFlash.msg
        }
    }

    try {
        const queues = await Queues.findOne({ token })
        if (!queues) return res.status(302).redirect(rou.loginRegister)

        const data = {
            title: lang.registerForm,
            email: queues.email,
            setFlash: setFlash || null,
            rou,
            token
        }

        res.render('authentication/registerForm', data)

    } catch (error) {
        console.log(error)
    }
}

const post = async (req, res) => {

    //Validation Input
    const { error } = validation.registerFormValidation(req.body);
    if (error) {
        console.log(error)
        req.flash('registerForm', {
            status: "is-warning",
            msg: error.message
        })
        return res.status(302).redirect(`${rou.registerForm}?token=${req.body.token}`);
    }

    //Validation DB
    const queues = await Queues.findOne({ token: req.body.token })
    if (!queues) {
        req.flash('loginRegister', {
            status: "is-danger",
            msg: faErrors['custom.error']
        })
        return res.status(302).redirect(rou.loginRegister);
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(String(req.body.password), salt)

    const customer = Customer({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        items: {
            phone: req.body.phone,
            address: req.body.address,
        }
    });

    try {
        const data = {
            title: lang.activatedMailSubject,
            name: req.body.name,
            rou: 'http://localhost:3001/'
        }
        const html = await ejs.renderFile(`${__dirname}/../../views/mail/activatedAccount.ejs`, data)

        await customer.save();
        await mailSender({
            to: req.body.email,
            subject: lang.activatedMailSubject,
            html
        });
        await Queues.findOneAndDelete({ token: req.body.token })
    } catch (err) {
        console.log("err:", err)
    }

    // set cookie
    await setCookie({ customer, res })

    //Redirect to register
    return res.status(302).redirect(rou.home);

}

module.exports = {
    get,
    post
}
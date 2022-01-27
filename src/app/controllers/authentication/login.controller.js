const bcrypt = require('bcryptjs');

const { rou, lang, faErrors, validation, setCookie, invalidationLogin } = require('../../utils')
const { Customer } = require('../../models')

const get = (req, res) => {

    //Check email is Exist at the input
    const email = req.query.email
    if (!email) return res.status(302).redirect(rou.loginRegister)
    //Check Validation email
    const { error } = validation.loginRegisterValidation(req.query)
    if (error) {
        return res.status(302).redirect(rou.loginRegister);
    }

    //get flash message
    const getFlash = req.flash('login')[0];
    if (getFlash) {
        var setFlash = {
            status: getFlash.status,
            msg: getFlash.msg
        }
    }

    const data = {
        title: lang.login,
        email,
        setFlash: setFlash || null,
        rou
    }
    res.render('authentication/login', data)

}

const post = async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    const { error } = validation.loginValidation(req.body)
    if (error) {
        req.flash('login', {
            status: "is-warning",
            msg: error
        })
        return res.status(302).redirect(`${rou.login}?email=${email}`);
    };

    //Check Password
    const customer = await Customer.findOne({ email });
    const pass = await bcrypt.compareSync(password, customer.password);

    //If pass == false => password is wrong
    if (!pass) {
        req.flash('login', {
            status: "is-danger",
            msg: faErrors['password.login']
        });
        return res.status(302).redirect(`${rou.login}?email=${email}`);
    }

    //clear session older login
    await invalidationLogin(customer._id)

    //set new cookie
    await setCookie({ customer, res })
    
    return res.status(302).redirect(rou.home);

}

module.exports = {
    get,
    post
}
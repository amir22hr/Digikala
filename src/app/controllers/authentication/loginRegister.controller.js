const { rou, lang, validation } = require('../../utils')
const { Customer } = require('../../models')

const get = (req, res) => {

    //get flash message
    const getFlash = req.flash('loginRegister')[0];
    if (getFlash) {
        var setFlash = {
            status: getFlash.status,
            msg: getFlash.msg
        }
    }

    const data = {
        title: lang.loginRegister,
        setFlash: setFlash || null,
        rou
    }

    res.render('authentication/loginRegister', data)
}

const post = async (req, res) => {

    try {
        const email = req.body.email
        //Validation Input
        const { error } = validation.loginRegisterValidation(req.body)
        if (error) {
            req.flash('loginRegister', {
                status: "is-warning",
                msg: error.message
            })
            return res.status(302).redirect(rou.loginRegister);
        }

        //Query in Database [select email]
        const customer = await Customer.findOne({ email })

        //If an email was Exist
        if (customer) return res.status(302).redirect(`${rou.login}?email=${email}`)
        //If email not Exist
        return res.redirect(307, rou.register)

    } catch (err) {
        res.end(err.toString())
        console.log(err)
    }
}

module.exports = {
    get,
    post
}
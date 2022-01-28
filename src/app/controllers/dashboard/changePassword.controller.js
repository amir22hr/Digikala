const bcrypt = require('bcryptjs');

const { rou, lang, faErrors, validation } = require('../../utils')
const { Customer } = require('../../models')

const get = async (req, res) => {

    let setFlash = req.flash('dashboard_changePassword')
    if (setFlash.length === 0) setFlash = null

    const data = {
        title: lang.dashboard_changePassword,
        user: req.user,
        flash: setFlash,
        rou,
        lang,
    }

    res.render('dashboard/changePassword', data)

}

const post = async (req, res) => {

    try {

        //Check Validation
        const { error } = validation.changePassword(req.body)
        if (error) {
            req.flash('dashboard_changePassword', error.message)
            return res.status(302).redirect(rou.dashboard_changePassword);
        };

        const password = req.body.password;
        const passwordNew = req.body.password_new;

        //Check Password
        const customer = await Customer.findById(req.user._id);
        const pass = await bcrypt.compareSync(password, customer.password);

        //If pass == false => password is wrong
        if (!pass) {
            req.flash('dashboard_changePassword', faErrors['changePassword.passwordWrong'])
            return res.status(302).redirect(rou.dashboard_changePassword);
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(String(passwordNew), salt)

        customer.password = hashedPassword;
        await customer.save();


    } catch (error) {
        console.log(error)
    }

    return await res.status(302).redirect(rou.dashboard)
}

module.exports = {
    get,
    post
}
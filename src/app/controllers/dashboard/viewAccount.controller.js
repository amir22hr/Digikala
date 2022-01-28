const { rou, lang, faErrors, validation } = require('../../utils')
const { Customer } = require('../../models')

const get = async (req, res) => {

    let setFlash = req.flash('dashboard_viewAccount')
    if (setFlash.length === 0) setFlash = null

    const data = {
        title: lang.dashboard_viewAccount,
        user: req.user,
        flash: setFlash,
        rou,
        lang,
    }

    res.render('dashboard/viewAccount', data)

}

const post = async (req, res) => {

    try {

        //Check Validation
        const { error } = validation.viewAccount(req.body)
        if (error) {
            req.flash('dashboard_viewAccount', error.message)
            return res.status(302).redirect(rou.dashboard_viewAccount);
        };

        await Customer.findByIdAndUpdate(req.user._id,{
            "name": req.body.name,
            "items.address": req.body.address
        })

    } catch (error) {
        console.log(error)
    }

    return await res.status(302).redirect(rou.dashboard)
}

module.exports = {
    get,
    post
}
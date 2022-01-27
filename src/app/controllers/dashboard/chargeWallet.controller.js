const { rou, lang, faErrors, validation } = require('../../utils')
const { Customer } = require('../../models')

const get = (req, res) => {

    let setFlash = req.flash('dashboard_chargeWallet')
    if (setFlash.length === 0) setFlash = null


    const data = {
        title: lang.dashboard_chargeWallet,
        user: req.user,
        flash: setFlash,
        rou,
        lang,
    }

    res.render('dashboard/chargeWallet', data)

}

const post = async (req, res) => {

    const { error } = validation.chargeWallet(req.body)
    if (error) {
        req.flash('dashboard_chargeWallet', error.message)
        return res.status(302).redirect(rou.dashboard_chargeWallet);
    };

    const wallet = Number(req.user.items.wallet);
    const chargeWallet = Number(req.body.charge);

    if (chargeWallet > 1000000 || chargeWallet < 10000) {
        req.flash('dashboard_chargeWallet', faErrors['chargeWallet.length'])
        return res.status(302).redirect(rou.dashboard_chargeWallet)
    }

    try {
        await Customer.findByIdAndUpdate(req.user._id, {
            $set: {
                'items.wallet': wallet + chargeWallet,
            }
        }, function (err, doc) {
            if (err) console.log(err)
            // console.log(doc);
        });

    } catch (error) {
        console.log(error)
    }

    return await res.status(302).redirect(rou.dashboard_chargeWallet)
}

module.exports = {
    get,
    post
}
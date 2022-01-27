const { rou, lang, faErrors, expiryDigiplus } = require('../../utils')
const { Customer } = require('../../models')
const { digiplus } = require('../../../configs/keys')

const get = (req, res) => {

    let setFlash = req.flash('dashboard_digiplus')
    if (setFlash.length === 0) setFlash = null


    const data = {
        title: lang.dashboard_digiplus,
        user: req.user,
        flash: setFlash,
        rou,
        lang,
    }

    res.render('dashboard/digiplus', data)

}

const post = async (req, res) => {

    if (req.user.items.digiplus.has) return res.status(302).redirect(rou.dashboard_digiplus)
    const wallet = Number(req.user.items.wallet)
    const choose = Object.keys(req.body)[0].toString()

    if (
        (choose == 'month1' && wallet < digiplus.month1.price)
        ||
        (choose == 'month3' && wallet < digiplus.month3.price)
    ) {
        req.flash('dashboard_digiplus', faErrors['digiplus.notEnough'])
        return res.status(302).redirect(rou.dashboard_digiplus)
    }


    try {
        switch (choose) {
            case "month1":
                await Customer.findByIdAndUpdate(req.user._id, {
                    $set: {
                        'items.digiplus.days_left': 30,
                        'items.digiplus.has': true,
                        'items.digiplus.expiry_date': expiryDigiplus(1),
                        'items.wallet': wallet - digiplus.month1.price,
                    }
                }, function (err, doc) {
                    if (err) console.log(err)
                    // console.log(doc);
                });
                break;

            case "month3":
                await Customer.findByIdAndUpdate(req.user._id, {
                    $set: {
                        'items.digiplus.days_left': 90,
                        'items.digiplus.has': true,
                        'items.digiplus.expiry_date': expiryDigiplus(3),
                        'items.wallet': wallet - digiplus.month3.price,
                    }
                }, function (err, doc) {
                    if (err) console.log(err)
                    // console.log(doc);
                });

                break;

            default:
                return res.status(302).redirect(rou.dashboard_digiplus)
        }
    } catch (error) {
        console.log(error)
    }


    return await res.status(302).redirect(rou.dashboard_digiplus)
}

module.exports = {
    get,
    post
}
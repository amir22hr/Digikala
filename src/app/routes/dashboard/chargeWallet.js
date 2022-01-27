const MainUserRouter = require('express').Router()

const { chargeWallet } = require('../../controllers')

//Router "/dashboard/chargeWallet"
MainUserRouter.route('/dashboard/chargeWallet')
    .get(chargeWallet.get)
    .post(chargeWallet.post)

module.exports = MainUserRouter
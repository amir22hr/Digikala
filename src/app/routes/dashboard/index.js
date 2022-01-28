const router = require('express').Router()

//Imports
const dashboard = require('./dashboard')
const logout = require('./logout')
const digiplus = require('./digiplus')
const chargeWallet = require('./chargeWallet')
const rewardsPoints = require('./rewardsPoints')
const myComment = require('./myComment')
const myOrders = require('./myOrders')
const viewAccount = require('./viewAccount')
const changePassword = require('./changePassword')

//dashboard
router.use(dashboard)
//logout
router.use(logout)
//digiplus
router.use(digiplus)
//digiplus
router.use(chargeWallet)
//rewardsPoints
router.use(rewardsPoints)
//myComment
router.use(myComment)
//myOrders
router.use(myOrders)
//viewAccount
router.use(viewAccount)
//changePassword
router.use(changePassword)


//---------------------
module.exports = router
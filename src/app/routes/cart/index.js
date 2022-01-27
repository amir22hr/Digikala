const router = require('express').Router()

//Imports
const cart = require('./cart')

//dashboard
router.use(cart)

//---------------------
module.exports = router
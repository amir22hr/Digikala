const router = require('express').Router()

//Imports
const product = require('./product')

//dashboard
router.use(product)

//---------------------
module.exports = router
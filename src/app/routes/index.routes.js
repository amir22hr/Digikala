const { Router } = require('express')

//middlewares
const { isLoggedIn, notLoggedIn } = require('../middlewares')

//Imports
const home = require('./home')
const auth = require('./authentication')
const dashboard = require('./dashboard')
const search = require('./search')
const product = require('./product')
const cart = require('./cart')

//Config
const router = new Router()

//Home
router.use('/', home)

//Authentication
router.use('/auth', isLoggedIn, auth)

//Dashboard
router.use('/user', notLoggedIn, dashboard)

//Search - (param: category, query: search)
router.use('/search', search)

//Product
router.use('/product', product)

//Cart
router.use('/cart', cart)

//---------------------
module.exports = router
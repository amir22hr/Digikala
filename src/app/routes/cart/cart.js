const MainUserRouter = require('express').Router()

const { cart } = require('../../controllers')

//Router "/cart"
MainUserRouter.route('/')
    .get(cart.get)
    .post(cart.post)

module.exports = MainUserRouter
const MainUserRouter = require('express').Router()

const { product } = require('../../controllers')

//Router "/product"
MainUserRouter.route('/:id')
    .get(product.get)
    .post(product.post)

module.exports = MainUserRouter
const MainUserRouter = require('express').Router()

const { myOrders } = require('../../controllers')

//Router "/dashboard/myOrders"
MainUserRouter.route('/dashboard/myOrders')
    .get(myOrders.get)
    .post(myOrders.post)

module.exports = MainUserRouter
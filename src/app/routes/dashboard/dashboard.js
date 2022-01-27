const MainUserRouter = require('express').Router()

const { dashboard } = require('../../controllers')

//Router "/dashboard"
MainUserRouter.route('/dashboard')
    .get(dashboard.get)
    .post(dashboard.post)

module.exports = MainUserRouter
const MainUserRouter = require('express').Router()

const { logout } = require('../../controllers')

//Router "/dashboard"
MainUserRouter.route('/logout')
    .get(logout.get)
    .post(logout.post)

module.exports = MainUserRouter
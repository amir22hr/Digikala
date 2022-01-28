const MainUserRouter = require('express').Router()

const { changePassword } = require('../../controllers')

//Router "/dashboard/changePassword"
MainUserRouter.route('/dashboard/changePassword')
    .get(changePassword.get)
    .post(changePassword.post)

module.exports = MainUserRouter
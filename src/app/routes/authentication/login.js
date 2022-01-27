const MainUserRouter = require('express').Router()

const { login } = require('../../controllers')

//Router "/login"
MainUserRouter.route('/login')
    .get(login.get)
    .post(login.post)

module.exports = MainUserRouter
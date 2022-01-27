const MainUserRouter = require('express').Router()

const { loginRegister } = require('../../controllers')

//Router "/login"
MainUserRouter.route('/login-register')
    .get(loginRegister.get)
    .post(loginRegister.post)

module.exports = MainUserRouter
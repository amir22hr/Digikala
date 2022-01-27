const MainUserRouter = require('express').Router()

const { registerForm } = require('../../controllers')

//Router "/login"
MainUserRouter.route('/register-form')
    .get(registerForm.get)
    .post(registerForm.post)

module.exports = MainUserRouter
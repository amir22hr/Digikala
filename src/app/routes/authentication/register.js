const MainUserRouter = require('express').Router()

const { register } = require('../../controllers')

//Router "/login"
MainUserRouter.route('/register')
    .get(register.get)
    .post(register.post)

module.exports = MainUserRouter
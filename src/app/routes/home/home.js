const MainUserRouter = require('express').Router()

const { home } = require('../../controllers')

//Router "/"
MainUserRouter.route('/')
    .get(home)

module.exports = MainUserRouter
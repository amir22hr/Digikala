const MainUserRouter = require('express').Router()

const { digiplusPage } = require('../../controllers')

//Router "/"
MainUserRouter.route('/digiplusPage')
    .get(digiplusPage)

module.exports = MainUserRouter
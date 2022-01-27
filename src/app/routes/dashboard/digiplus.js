const MainUserRouter = require('express').Router()

const { digiplus } = require('../../controllers')

//Router "/dashboard/digiplus"
MainUserRouter.route('/dashboard/digiplus')
    .get(digiplus.get)
    .post(digiplus.post)

module.exports = MainUserRouter
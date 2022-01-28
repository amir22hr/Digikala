const MainUserRouter = require('express').Router()

const { viewAccount } = require('../../controllers')

//Router "/dashboard/rewardsPoints"
MainUserRouter.route('/dashboard/viewAccount')
    .get(viewAccount.get)
    .post(viewAccount.post)

module.exports = MainUserRouter
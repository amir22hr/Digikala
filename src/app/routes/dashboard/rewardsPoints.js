const MainUserRouter = require('express').Router()

const { rewardsPoints } = require('../../controllers')

//Router "/dashboard/rewardsPoints"
MainUserRouter.route('/dashboard/rewardsPoints')
    .get(rewardsPoints.get)
    .post(rewardsPoints.post)

module.exports = MainUserRouter
const MainUserRouter = require('express').Router()

const { myComment } = require('../../controllers')

//Router "/dashboard/myComment"
MainUserRouter.route('/dashboard/myComment')
    .get(myComment.get)
    .post(myComment.post)

module.exports = MainUserRouter
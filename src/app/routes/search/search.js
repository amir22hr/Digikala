const MainUserRouter = require('express').Router()

const { search } = require('../../controllers')

//Router "/search"
MainUserRouter.route('/')
    .get(search.get)
    .post(search.post)

module.exports = MainUserRouter
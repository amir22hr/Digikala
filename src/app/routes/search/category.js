const MainUserRouter = require('express').Router()

const { rou } = require('../../utils')
const { category } = require('../../controllers')

//Router "/category"
MainUserRouter.route('/category')
    .get((req, res) => { return res.status(302).redirect(rou.home) })
MainUserRouter.route('/category/:category')
    .get(category.get)
    .post(category.post)

module.exports = MainUserRouter
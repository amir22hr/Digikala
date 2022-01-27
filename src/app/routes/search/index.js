const router = require('express').Router()

//Imports
const search = require('./search')
const category = require('./category')

//dashboard
router.use(search)
//dashboard
router.use(category)

//---------------------
module.exports = router
const router = require('express').Router()

//Imports
const home = require('./home')
const digiplusPage = require('./digiplusPage')

//home
router.use(home)
//Digiplus Page
router.use(digiplusPage)


//---------------------
module.exports = router
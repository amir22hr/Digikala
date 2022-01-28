const router = require('express').Router()

//Imports
const loginRegister = require('./loginRegister')
const login = require('./login')
const register = require('./register')
const registerForm = require('./registerForm')
const passwordRecovery = require('./passwordRecovery')

//loginRegister
router.use(loginRegister)
//login
router.use(login)
//register
router.use(register)
//registerForm
router.use(registerForm)
//passwordRecovery
router.use(passwordRecovery)

//---------------------
module.exports = router
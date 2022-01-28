const MainUserRouter = require('express').Router()

const { passwordRecovery } = require('../../controllers')

//Router "/password-recovery"
MainUserRouter.route('/password-recovery')
    .get(passwordRecovery.get)
    .post(passwordRecovery.post)

module.exports = MainUserRouter
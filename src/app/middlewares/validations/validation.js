const { rou } = require('../../utils')

/**
 * if user is login, forward to homePage
 * @param req 
 * @param res 
 * @param next 
 */
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        return res.status(302).redirect(rou.home)
    }
    next()
}

/**
 * if doesn't user is exist, forward to loginRegisterPage
 * @param req 
 * @param res 
 * @param next 
 */
const notLoggedIn = (req, res, next)=>{
    if (!req.user) {
        return res.status(302).redirect(rou.loginRegister)
    }
    next()
}

module.exports = {
    isLoggedIn,
    notLoggedIn,
}
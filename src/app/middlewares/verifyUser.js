const jwt = require('jsonwebtoken')
const keys = require('../../configs/keys')
const { Session, Customer } = require('../models')

/**
 * Middleware
 * @param  req 
 * @param  res 
 * @param  next 
 */
const verifyUser = async (req, res, next) => {
    const token = req.cookies.user_cookie
    if (token) {
        try {
            const verified = jwt.verify(token, keys.jwt.secret)
            const session = await Session.findById(verified)
            const customer = await Customer.findById(session.customer_id)
            req.user = customer
        } catch (error) {
            console.log("token not Valid!")
        }
    }
    next()
}

module.exports = verifyUser
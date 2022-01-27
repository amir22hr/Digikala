const { Session } = require('../../models')
const jwt = require('jsonwebtoken')
const keys = require('../../../configs/keys')

/**
 * 
 * @param {object} customer 
 * @param {object} res 
 */
module.exports = async ({ customer, res }) => {
    const expiry_date = new Date().toLocaleDateString('en-US')

    try {
        const session = await Session.create({
            expiry_date,
            customer_id: customer._id
        })
        const token = await jwt.sign({ _id: session._id }, keys.jwt.secret)
        await res.cookie('user_cookie', token, {

        })
    } catch (error) {
        console.log(error)
    }
}
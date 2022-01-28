const Joi = require('joi')
const { faErrors } = require('./joiCustomErrors')

/**
 * For all functions in this file
 * @param {object} data 
 * @returns object
 */

//Login - Register
const loginRegisterValidation = data => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).required().error(new Error(faErrors['email.invalid'])),
    })
    return schema.validate(data)
}

//Register
const registerValidation = data => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).required().error(new Error(faErrors['email.invalid'])),
    })
    return schema.validate(data)
}

//Login
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).required().error(new Error(faErrors['email.invalid'])),
        password: Joi.string().min(6).required().error(new Error(faErrors['password.invalid']))
    })
    return schema.validate(data)
}

//Register - Form
const registerFormValidation = data => {
    const schema = Joi.object({
        token: Joi.string().required(),
        name: Joi.string().min(3).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
        password_confirmation: Joi.any().valid(Joi.ref('password')).required().error(new Error(faErrors['password.confirmation'])),
        phone: Joi.number().max(09000000000).max(09999999999).required(),
        address: Joi.string().min(4).required()
    })
    return schema.validate(data)
}

//Charge Wallet
const chargeWallet = data => {
    const schema = Joi.object({
        charge: Joi.number().min(10000).max(1000000).required().error(new Error(faErrors['chargeWallet.length'])),
    })
    return schema.validate(data)
}

//Rewards Points
const rewardsPoints = data => {
    const schema = Joi.object({
        id: Joi.string().required().error(new Error(faErrors['rewardsPoints.invalid'])),
    })
    return schema.validate(data)
}

//Comments
const comments = data => {
    const schema = Joi.object({
        id: Joi.string().required().error(new Error(faErrors['comments.invalid'])),
    })
    return schema.validate(data)
}

//Product
const product = data => {
    const schema = Joi.object({
        product: Joi.string().required().error(new Error(faErrors['product.invalid'])),
        comment: Joi.string().error(new Error(faErrors['product.commentInvalid']))
    })
    return schema.validate(data)
}

//View Account
const viewAccount = data => {
    const schema = Joi.object({
        name: Joi.string().required().error(new Error(faErrors['custom.error'])),
        address: Joi.string().required().error(new Error(faErrors['custom.error']))
    })
    return schema.validate(data)
}

module.exports = {
    loginRegisterValidation,
    registerValidation,
    loginValidation,
    registerFormValidation,
    chargeWallet,
    rewardsPoints,
    comments,
    product,
    viewAccount
}
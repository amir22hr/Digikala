//home '/'
const home = require('./home/home.controller')
const digiplusPage = require('./home/digiplusPage.controller')
//authentication '/auth'
const login = require('./authentication/login.controller')
const register = require('./authentication/register.controller')
const registerForm = require('./authentication/registerForm.controller')
const loginRegister = require('./authentication/loginRegister.controller')
//dashboard '/dashboard'
const dashboard = require('./dashboard/dashboard.controller')
const logout = require('./dashboard/logout.controller')
const digiplus = require('./dashboard/digiplus.controller')
const chargeWallet = require('./dashboard/chargeWallet.controller')
const rewardsPoints = require('./dashboard/rewardsPoints.controller')
const myComment = require('./dashboard/myComment.controller')
const myOrders = require('./dashboard/myOrders.controller')
const viewAccount = require('./dashboard/viewAccount.controller')
//search '/search', '/search/category/:name'
const search = require('./search/search.controller')
const category = require('./search/category.controller')
//product '/product'
const product = require('./product/product.controller')
//cart '/cart'
const cart = require('./cart/cart.controller')

module.exports = {
    home,
    digiplusPage,
    login,
    register,
    registerForm,
    loginRegister,
    dashboard,
    logout,
    digiplus,
    chargeWallet,
    rewardsPoints,
    myComment,
    myOrders,
    search,
    category,
    product,
    cart,
    viewAccount
}
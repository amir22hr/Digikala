//product
const Product = require('./product/product.model')
const ProductCategory = require('./product/productCategory.model')
//customer
const Customer = require('./customer/customer.model')
const Queues = require('./customer/queues.model')
//session
const Session = require('./session/session.model')
//reward
const Reward = require('./reward/reward.model')
//comment
const Comment = require('./comment/comment.model')
//cart
const Cart = require('./cart/cart.model')

module.exports = {
    Product,
    ProductCategory,
    Customer,
    Queues,
    Session,
    Reward,
    Comment,
    Cart
}
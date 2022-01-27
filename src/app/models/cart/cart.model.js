const { Schema, model } = require('mongoose')

//Schema
const cartSchema = new Schema({
    customer_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending'
    },
    products_id: {
        type: Array,
        required: true
    }

})

//model and export
module.exports = model('carts', cartSchema)

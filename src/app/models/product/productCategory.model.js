const { Schema, model } = require('mongoose')

//Schema
const productCategorySchema = new Schema({
    name: {
        persian: {
            type: String,
            required: true
        },
        english: {
            type: String,
            required: true
        }
    }
})

//model and export
module.exports = model('productsCategory', productCategorySchema)

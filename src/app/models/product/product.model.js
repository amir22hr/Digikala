const { Schema, model } = require('mongoose')

//Schema
const productSchema = new Schema({
    name: {
        persian: {
            type: String,
            required: true,
            trim: true
        },
        english: {
            type: String,
            required: false,
            trim: true
        }
    },
    creation_at: {
        //georgian => month/day/year
        georgian: { type: String, default: new Date().toLocaleDateString('en-US') },
        //solar => year/month/day
        solar: { type: String, default: new Date().toLocaleDateString('fa-IR') },
    },
    category_id: {
        type: String,
        required: true
    },
    items: {
        price: {
            original: {
                type: Number,
                required: true,
                trim: true
            },
            subscription_discount: {
                type: Number,
                required: false,
                trim: true
            },
        },
        photo: {
            original: {
                type: String,
                required: true,
                trim: true
            },
            more: {
                type: Array,
                required: false,
                trim: true
            }
        },
        points: {
            type: Number,
            required: true
        }
    }

})

//model and export
module.exports = model('products', productSchema)

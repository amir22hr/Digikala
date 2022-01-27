const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    registration_date: {
        type: String,
        default: new Date().toLocaleDateString('fa-IR')
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    items: {
        phone: {
            type: Number,
            required: true,
            length: 11
        },
        address: {
            type: String,
            required: true,
            min: 3,
        },
        digiplus: {
            days_left: {
                type: Number,
                default: 0
            },
            has: {
                type: Boolean,
                default: false
            },
            expiry_date: {
                type: String,
            }
        },
        wallet: {
            type: Number,
            default: 0
        },
        points: {
            type: Number,
            default: 50
        },
        get_rewards: {
            type: Array,
            required: false
        }
    }
})

module.exports = mongoose.model('customers', customerSchema)
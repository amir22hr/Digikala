const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    expiry_date: {
        type: Date,
        required: true,
    },
    customer_id: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('sessions', sessionSchema)
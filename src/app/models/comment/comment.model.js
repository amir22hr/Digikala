const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    creation_at: {
        type: String,
        default: new Date().toLocaleDateString('fa-IR')
    },
    customer_id: {
        type: String,
        required: true,
    },
    product_id: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('comments', commentSchema)
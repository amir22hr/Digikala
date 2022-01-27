const mongoose = require('mongoose');

//Customer Queue Registering
const queueSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
    },
    token: {
        type: String,
        required: true,
        min: 4,
        max: 1024
    }
})

module.exports = mongoose.model('queues', queueSchema)
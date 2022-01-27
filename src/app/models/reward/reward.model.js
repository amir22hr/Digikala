const { Schema, model } = require('mongoose')

//Schema
const rewardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    get_points: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    }
})

//model and export
module.exports = model('rewards', rewardSchema)

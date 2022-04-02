const mongoose = require('mongoose')

const tipSchema = new mongoose.Schema({
    tags: {
        type: Array,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        max: 64
    },
    content: {
        type: String,
        required: true,
        max: 480
    },
    like: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('Tip', tipSchema);


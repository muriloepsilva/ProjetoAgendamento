const mongoose = require("mongoose")

const commitments = new mongoose.Schema({
    title: String,
    email: String,
    description: String,
    date: Date,
    time: String,
    finished: Boolean
})

module.exports = commitments
const mongoose = require("mongoose")

const commitments = new mongoose.Schema({
    name: String,
    email: String,
    description: String,
    cpf: String,
    date: Date,
    time: String,
    finished: Boolean
})

module.exports = commitments
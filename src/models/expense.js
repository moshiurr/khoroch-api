const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    expenseGroupId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        default: 0
    },
    desc: {
        type: String,
        default: "",
    },

}, {timestamps: true})

const Expense = mongoose.model("Expense", expenseSchema)
module.exports = Expense;
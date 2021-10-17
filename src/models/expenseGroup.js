const mongoose = require('mongoose')

const expenseGroupSchema = new mongoose.Schema({
    admin: {
        type: Array,
        required: true,
        default:[]
    },
    members: {
        type: Array,
        required: true,
        default:[]
    },
    groupName: {
        type: String,
        deafult: "",
    }
    
}, {timestamps: true})

const ExpenseGroup = mongoose.model("ExpenseGroup", expenseGroupSchema);
module.exports = ExpenseGroup;
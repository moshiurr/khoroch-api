const mongoose = require('mongoose')
const User = require('../models/user');

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

// check if the members of the group are valid(Active) memers id, return true or false
expenseGroupSchema.statics.validateMembers = async (members) => {
    // this is checking if all the member of the group is valid

    for(let i = 0; i < members.length; i++){
        const memberUser = await User.findById(members[i]);
        
        if(!memberUser) return false;
    }
    return true;
}

expenseGroupSchema.methods.addNewMembers = async function(members) {
    let expenseGroup = this;

    for(let i = 0; i < members.length; i++){
        if(expenseGroup.members.includes(members[i])) continue;

        expenseGroup.members.push(members[i]);
    }

    await expenseGroup.save();
}

const ExpenseGroup = mongoose.model("ExpenseGroup", expenseGroupSchema);
module.exports = ExpenseGroup;
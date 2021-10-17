const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: "",
        max: 50
    },
    lastName: {
        type: String,
        default: 50,
        max: 50
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        min: 8,
        required: true,
        tirm: true,

        validate(value){
            if(value.toLowerCase() === "password") 
                throw new Error("Password cannot be obvious!")
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email")
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
            }
        }
    ]

}, {timestamps: true})

userSchema.statics.findByCredentials  = async (email, password, username)=>{
    const user;
    if(email) user = await User.findOne({email: email})
    else user = await User.findOne({username: username})

    if(!user) throw new Error ("User doesn't exist");

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) throw new Error("Password don't match")


    //change it in the final version
    //add tokem functionality
    return {
        email: user.email,
        username: user.username,
        id: user._id
    }
}

//this is a mongoose middleware that handles the hashing of passwords every time password field is modified

userSchema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	//this next param is to make sure that this functions end, otherwise this func will stuck forever thinking it has finished it execution
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
const mongoose = require("mongoose")

const uri = process.env.MONGOOSE_URI_TEST;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=> {
    console.log("Connected to Mongoose!")
})
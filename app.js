const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
// dotenv file 
require("dotenv").config();
const userRouter = require('./src/routes/user.router');
const khorochRouter = require('./src/routes/khoroch.router');

//initializing the mongo database
require('./src/db/db')
const port = process.env.PORT || 3001;
const app = express()


//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use('/api/user', userRouter);
app.use('/api/khoroch', khorochRouter);


app.listen(port, (req,res)=>{
    console.log("Backend running on port "+port)
})
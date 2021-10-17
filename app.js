const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
require('./src/db/db')

const app = express()

const port = process.env.PORT || 3001;

app.listen(port, (req,res)=>{
    console.log("Backend running on port "+port)
})
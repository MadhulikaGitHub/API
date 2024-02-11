const express = require('express')
const app = express()
const dotenv = require('dotenv') // Environment files
dotenv.config({path:'./.env'}) // Environment path set
const web = require('./routes/web')
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload")
const cors = require('cors')

app.use(fileUpload({useTempFiles: true}))

app.use(express.json()) // To get the data in api

connectdb()

// load router
app.use('/api',web) // localhost:4000/api

// Server create
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on localhost: ${process.env.PORT}`)
})
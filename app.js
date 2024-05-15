const express = require('express') // (npm i express) 
const app = express() 
const dotenv = require('dotenv') // Environment files (npm i dotenv) 
dotenv.config({path:'./.env'}) // Environment path set
const web = require('./routes/web')
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload")
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(cors())

app.use(fileUpload({useTempFiles: true}))

app.use(express.json()) // To get the data in api

connectdb()

// load router
app.use('/api',web) // localhost:4000/api

// Server create
app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on localhost: ${process.env.PORT}`)
})


















//==============================================================================

// npm install
// npm i express

// app.js
// require express
// npm i dotenv

// create a file .env
// write code in .env PORT

// app.js
// app.js dotenv
// require dotenv
// path set dotenv config
// server create
// nodemon

// web.js
// require express
// router
// module export

// app.js
// require web file
// load route

// create UserController.js
// create class
// module export
// method getAllUsers

// web.js
// Get Method getAllUser /getAllUser
// open on browser  localhost:4000/api/getAllUser

// Install PostMan
// create collection API Express
// Click on API Express
// add a request GET getAllUser
// API Express / getAllUser
// GET localhost:4000/api/getAllUser

// db
// create a file connectDB.js
// npm i mongoose
// write common code

// app.js
// require connectDB file
// call connectDB()

// .env
// LOCAL_URL : mongodb://127.0.0.1:27017/apiexpress

// connectDB
// remove url
// return process.env.LOCAL_URL

// models
// create User.js
// write codes
// add fields

// UserController
// reuire user UserModel

// check database on mongoDB

// UserController
// method - userInsert

//web.js
// create route - post /userInser

// app.js
// app.use(express.json) - to get data from postman api

// postman
// add request
// add a request POST getAllUser
// API Express / getAllUser
// POST - localhost:4000/api/userInsert
// To insert data - Body -> row -> text -> JSON
// {"name" : "Ram", "password" : "123456"}
// send

// UserController
// paste insertUser
// copy paste cloudinary
// copy paste bcrypt

// npm i fileupload
// fileupload code copy paste
// app.use(fileUpload) copy paste

// nodemon

//userInsert
//res (.status... .json....)


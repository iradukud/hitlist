const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')

require('dotenv').config({path: './config/.env'})

connectDB()

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    
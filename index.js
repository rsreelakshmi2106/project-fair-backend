//1. Loads .env file contents into process.env by default.
require('dotenv').config()

//2. import express
const express = require('express')

//3. import cors
const cors= require('cors')

//8. import DB
const db = require('./DB/connection')

//9.
const router = require('./Routes/router')
const applicationMiddleware = require('./Middlewares/applicationMiddleware')

//4. create a application using express
const pfServer = express()

//5. use 
pfServer.use(cors())
pfServer.use(express.json())

//11. use middleware
// pfServer.use(applicationMiddleware)

//10. use router
pfServer.use(router)

//To view images in frontend
//used to export images from backend
pfServer.use('/uploads',express.static('./uploads'))

//6. port creation
const PORT = 4000 || process.env.PORT

// 7. listening
pfServer.listen(PORT,()=>{
    console.log("pfServer listening on the port "+PORT);
})

pfServer.get('/',(req,res)=>{
    res.send("Welcome to Project Fair")
})

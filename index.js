// loads .env files contents into process.env by default
require('dotenv').config()

const express = require('express')
const cros = require('cors')
const router = require('./Routes/routes')
require('./DB/Connection')


// creating server instance
const pfServer = express()

// configuring cors into server
pfServer.use(cros())

// configuring json conversion on server
pfServer.use(express.json())

// configuring routes into server
pfServer.use(router)

pfServer.use('/uploads',express.static('./uploads'))
const PORT = 3000

// calling listen method to implement listen mode for server to run

pfServer.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})

// Setting response for base_url get request
pfServer.get('/',(req,res)=>{

    res.status(200).send("<h1>The Get request hit successfully </h1>")

})
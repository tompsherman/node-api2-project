const express = require('express')

const dataRouter = require('./hubs/db-router.js')

const server = express()

server.use(express.json())

server.use(dataRouter) 

server.get('/', (req,res)=>{
    res.status(200).json({message: "server is live on port 8008"})
})

module.exports = server
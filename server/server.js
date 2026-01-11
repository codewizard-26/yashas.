require("dotenv").config()
const express = require('express')
const connectDb = require("./config/db.js")
const app = express()

//Connecting Database
connectDb()

//Json file access
app.use(express.json({limit:"16kb"}))

//Url reader
app.use(express.urlencoded({extended:true}))

app.get('/' , (req,res)=>{
    res.send("Backend Running");
})

const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`System started at port ${PORT}`);
})
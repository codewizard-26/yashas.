require("dotenv").config()
const express = require('express')
const app = express()
const connectDb = require("./db/db.js")

connectDb()

app.get('/' , (req,res)=>{
    res.send("Backend Running");
})

const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`System started at port ${PORT}`);
})
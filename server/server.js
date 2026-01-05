const express = require('express')
const app = express()
require("dotenv").config()

app.get('/' , (req,res)=>{
    res.send("Backend Running");
})

const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`System started at port ${PORT}`);
})
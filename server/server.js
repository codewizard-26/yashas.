//Packages
require("dotenv").config()
const express = require('express')
const cookieParser = require("cookie-parser")
const connectDb = require("./config/db.js")
const cors = require("./config/cors.js")

//importing routes
const userRouter = require("./routes/user.routes.js")

const app = express()

//Connecting Database
connectDb()

//Json file access
app.use(express.json({limit:"16kb"}))

//Url reader
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

//cors connection
app.use(cors)

//routes declaration
app.use("/users", userRouter)

app.get('/' , (req,res)=>{
    res.send("Backend Running");
})

const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`System started at port ${PORT}`);
})
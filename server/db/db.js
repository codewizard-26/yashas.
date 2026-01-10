require("dotenv").config()
const mongoose = require("mongoose")
const constants = require("../constants.js")

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${constants.DB_NAME}`)
        console.log(`\n MongoDB connected !! DB host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error: ", error);
    }
}

module.exports = connectDb
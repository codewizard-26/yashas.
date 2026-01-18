const asyncHandler = require("../utils/asyncHandler");

const registerUser = asyncHandler( async (req, res) => {
    //get data from frontend
    //check if data is not empty 
    // check if user already exists
    //check if image uploaded for avatar
    //upload them to cloudinary
    //create user in db
    //check if user creation 
    //return res
    console.log("LMAO");
    res.send("LMAO");
})

module.exports = registerUser;
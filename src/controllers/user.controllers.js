import { asyncHandler } from "../utils/asyncHandler.js";



const registerUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"All Ok With register user from user controller"
    })
})



export {registerUser}
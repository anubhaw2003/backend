import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/apiError.js'
import {User} from '../models/user.models.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/apiResponse.js'

const registerUser = asyncHandler(async (req,res)=>{
    // get user details from frontend i.e the user db model
    // validation - not empty fields
    // check if user already exists :: username, email
    // check for images , check for avatars
    // upload them to cloudinary, avatar
    // create a user object - create entry in db
    // remove password and refresh token filed from response
    // check foru user creation 
    // return response


    const {fullname,email,username,password} = req.body
    console.log('email : '+ email);
    
    // checking if the fields are empty using no. of if blocks = no. of fields 
    // if(fullname===""){
    //     throw new apiError(400,"Full NAme is required")
    // }  

    // approach 2 of checking fileds
    if(
        [fullname,email.password,username].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required!!")
    }

    const existedUser = User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required!!")

    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if(!avatar){
        throw new ApiError(400,"Avtar file is required")
    }

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    ) // name those fields which are not needed


    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }



    // approach 1 to return
    // return res.status(201).json({createdUser}) 

     // approach 2 to return
     return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
     )
    
    
    //optional (for learning process)
    console.log(`avatarLocalPath: ** ${avatarLocalPath} ** |||||||| coverImageLocalPath: ** ${coverImageLocalPath} **`)
})



export {registerUser}
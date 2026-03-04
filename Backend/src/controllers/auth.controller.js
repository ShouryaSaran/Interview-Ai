const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blacklist.model")


/**
 * @name registerUserController
 * @description register a new user , expects username , email and password in the request
 * @access Public
 */

async function registerUserController(req, res) {

    const { username , email , password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message: "Please provide username,email and password"
        })
    }


    const  isUserAlreadyExists = await userModel.findOne({
        $or : [{username} , {email} ]
    })

    if(isUserAlreadyExists){
        if(isUserAlreadyExists.username == username){
            return res.status(400).json({
                message: "Account alreay exists with this username"
            })
        }
        else {
            return res.status(400).json ({
                message: "Account already exists with this email address"
            })
        }
    }

    const hash = await bcrypt.hash(password,12)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign(
        {id: user._id , username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token" , token)

    res.status(201).json({
        message: "User registered successfully",
        user:{
            id:user._id,
            username: user.username,
            email: user.email
        }
    })
}

/** 
 * @name loginUserController
 * @description logs in an existing user , expects email and password in the request
 * @access Public
 */


async function loginUserController(req,res) {
    
    
    const {email , password} = req.body

    const user = await userModel.findOne({email})

    if(!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password , user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Password is incorrect"
        })
    }

    const token = jwt.sign(
        {id: user._id , username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token)
    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id:user.id,
            username:user.username,
            email: user.email
        }
    })
}
/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add token in the blacklist, expects a token in the request
 * @access public 
 */
async function logoutUserController(req,res) {
    const token = req.cookies.token
    if(token){
        await tokenBlackListModel.create({token})
    }

    res.clearCookie('token')

    res.status(200).json({
        message: "User logged out successfully"
    })
}
/**
 * @name getMeController
 * @description get the current logged in user details
 * @access Private
 */
async function getMeController(req,res) {

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User details fetched successfully.",
        user : {
            id:user.id,
            username: user.username,
            email: user.email
        }
    })
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
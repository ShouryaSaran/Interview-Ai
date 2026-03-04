const jwt = require('jsonwebtoken')
const blacklist = require('../models/blacklist.model')


async function authUser(req,res,next) {

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }

    const isBlackList = await blacklist.findOne({
        token
    })

    if(isBlackList){
        return res.status(401).json({
            message: "Please Login Again."
        })
    }
    try {

        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        req.user = decoded

        next()
    }

    catch(err){
        return res.status(401).json({
            message:"Invalid Token."
        })
    }
}

module.exports = {authUser}
//1. import userSchema or model 
const users = require('../Models/userSchema')

const jwt = require('jsonwebtoken')

//2. Register logic
exports.register = async(req,res)=>{
    console.log("Inside register method");
    //1. accept data from client
    const {username,email,password} = req.body;
    console.log(username,email,password);

    try{
        //check if the email is already registerd
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User already registered")
        }
        else{
            const newUser = new users({
                username,
                email,
                password,
                github:"",
                livelink:"",
                profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(500).json("Register Failed...")
    }
}

//3. login logic
exports.login = async(req,res)=>{
    console.log("Inside login method");
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"super2024")
            console.log(token);
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(404).json("Invalid email or password")
        }
    }
    catch(err){
        res.status(500).json("Login Failed..."+err)
    }
}

exports.getUserDetails = async(req,res)=>{
    const userId = req.payload
    try{
        const userDetail = await users.findById({_id:userId})
        if(userDetail){
            res.status(200).json(userDetail)
            console.log(userDetail);
        }
        else{
            res.status(401).json("No such user")
        }
    }
    catch(err){
        res.status(404).json("Error : "+err)
    }
}


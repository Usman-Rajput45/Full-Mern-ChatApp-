import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user.mjs'
import bcrypt from 'bcryptjs'
import { authMiddleware } from '../middleware/auth.mjs'


const router = express.Router()
const SECRET_KEY = process.env.SECRET_KEY



// Signup route 
 
router.post("/signup", async(req, res) => {
    const {username, password} = req.body
    try{
        const existingUser =await User.findOne({username})
        if(existingUser){
            return res.status(400).json({message: "Username already exists"})
        }
        const hashpassword = await bcrypt.hash(password, 10)
        const newUser = new User({username, password: hashpassword})
        await newUser.save()
        res.status(201).json({message: "User registered successfully"}) 
    }
    catch(err){
        return res.status(500).json({message: "Server error", err})
    }
})


//login route

router.post("/login", async(req, res) => {
    const {username, password} = req.body
    try{
     const user = await User.findOne({username})
     if(!user){
        return res.status(400).json({message: "Invalid credentials"})
     }
     // for matching password
     const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const token = jwt.sign({id: user._id, username: user.username}, process.env.SECRET_KEY)
        res.status(200).json({message: "Login successful", token})
    }catch(err){
        console.error("Login error:", err);  // <-- add this
    return res.status(500).json({ message: "Server error", err });
    }
})


router.get("/protected", authMiddleware, (req, res) => {
    res.json({message: `Hello ${req.user.username}, you are authorized`})
})

export default router;
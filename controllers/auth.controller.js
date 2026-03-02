import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next)=>{
    try {
        const {name,email,password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return next(new Error("User already exists"))   
        }

        //password hashing and token generation logic
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        //create new user
        const newUser = await User.create({name,email,password:hashedPassword});
        //generate token
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        
        res.status(201).json({
            success:true,
            message:'User registered Successfully',
            data:{
                token,
                user:newUser
            }
        })
    } catch (error) {
        next(error);
    }
}

export const signin = async (req,res,next)=>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return next(new Error("User not found"));
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return next(new Error("Invalid credentials"));
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).json({
            success:true,
            message:'User signed in successfully',
            token,
            user
        })
    } catch (error) {
        next(error);
    }
}

export const signout = async (req,res,next)=>{

}
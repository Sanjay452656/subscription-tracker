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
        const newUser = await User.create({name,email,password});

        //password hashing and token generation logic
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password,salt);
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1d'});

        res.status(201).json({
            success:true,
            message:'User registered Successfully',
            token,
            user:newUser
        })
    } catch (error) {
        next(error);
    }
}

export const signin = async (req,res,next)=>{

}

export const signout = async (req,res,next)=>{

}
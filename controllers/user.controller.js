import User from "../models/user.model.js"

export const getUsers = async (req,res,next)=>{
    try {
        const users = await User.find();

        res.status(200).json({
        success:true,
        message:'Users fetched successfully',
        data:users
    })
    } catch (error) {
        next(error);
    }
}

export const getUserById = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        if(!user){
            return next(new Error('User not found'));
        }

        res.status(200).json({
            success:true,
            message:'User fetched succesfully',
            data:user
        })
    } catch (error) {
        next(error);
    }
}
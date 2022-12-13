import User from "../models/User.js";

// Update user 
export const updateUser = async(req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true });
        res.status(200).json(updateUser);
    } catch (error) {
        next(error);
    }
}

// Delete user 
export const deleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send('User has been deleted.');
    } catch (error) {
        next(error)
    }
}

// Get a user 
export const getUser = async(req,res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

// Get all Users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        next(error)  
    }
}

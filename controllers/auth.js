import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { createError } from "../utils/error.js";

export const register = async(req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            $or: [{
                email: req.body.username
            }, {
                username: req.body.username
            }]
        });

        if(!user) return next(createError(404, 'User not found!'));

        const isPassWordValid = await bcrypt.compare(req.body.password, user.password);
        if(!isPassWordValid) return next(createError(400, 'Invalid username or password.'));

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
        const  { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ details: { ...otherDetails }, isAdmin });
    } catch (error) {
        next()
    }
}
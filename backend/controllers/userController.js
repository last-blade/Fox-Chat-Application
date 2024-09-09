import { userModel } from "../models/user-model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import { request, response } from "express";



export const register = async (request, response) => {
    try {
        const { fullname, username, password, gender, profilePhoto, confirmPassword } = request.body;

        // Check if any field is missing
        if (!fullname || !username || !password || !gender || !confirmPassword) {
            return response.status(400).json({ message: "All fields are required!" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return response.status(400).json({ message: "Passwords don't match." });
        }

        // Check if username is already taken
        const user = await userModel.findOne({ username });
        if (user) {
            return response.status(400).json({ message: `Username '${username}' is not available.` });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Set default profile photo based on gender
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create a new user
        await userModel.create({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePhoto: gender === "male" ? maleProfilePhoto : gender === "female"? femaleProfilePhoto : "https://avatar.iran.liara.run/public/boy"

        });

        return response.status(201).json({
            message: "Account created successfully!",
            success: true,
        });
    } 
    
    catch (error) {
        console.log(error);
        response.status(500).json({ message: "Server error." });
    }
};



export const login = async (request, response) => {
    try {
        const {username, password} = request.body;
        // Check if any field is missing
        if (!username || !password) {
            return response.status(400).json({ message: "All fields are required!" });
        };

        const user = await userModel.findOne({username});
        if(!user){
            return response.status(400).json({
                message: "Incorrect username or password!",
                success: false,
            });
        };

        const isPasswordMatched = bcrypt.compare(password, user.password);
        if(isPasswordMatched == false){
            return response.status(400).json({
                message: "Incorrect username or password!",
                success: false,
            });
        };

        const tokenData = {
            userId: user._id,
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
        return response.status(200).cookie("token",token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite: 'strict'}).json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            profilePhoto: user.profilePhoto
        });
    } 
    
    catch (error) {
        console.log("Login error:- ", error);    
    }
}



export const logout = (request, response) => {
    try {
        return response.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "User logged out successfully!"
        });    
    } 
    
    catch (error) {
        console.log("Error in logout:- ", error);
    }
}



export const getOtherUsers = async (request, response) => {
    try {
        const loggedInUserId = request.id;
        const otherUsers = await userModel.find({_id: {$ne: loggedInUserId}}).select("-password");
        return response.status(200).json(otherUsers);
    } 
    
    catch (error) {
        
    }
}
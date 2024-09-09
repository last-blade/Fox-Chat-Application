import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    profilePhoto: {
        type: String,
        default: "",
    },

    gender: {
        type: String,
        enum: ["male", "female", "preferNotToSay"],
        required: true,
    }
}, {timestamps: true});

export const userModel = mongoose.model("user", userSchema);
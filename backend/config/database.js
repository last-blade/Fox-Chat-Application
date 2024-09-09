import mongoose from 'mongoose';
import DB_NAME from '../constants.js';

const connectDB = async () => {
    try {
        const databaseConnection = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Database connected successfully!");
    } 
    
    catch (error) {
        console.log("Database connection error:", error);
    }
};

export default connectDB;

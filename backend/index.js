import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/database.js"
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions));

app.use("/user", userRoute);
app.use("/message", messageRoute);


const PORT = process.env.PORT || 8080;


app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});   
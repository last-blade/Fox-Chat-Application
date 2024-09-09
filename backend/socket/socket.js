import {Server} from "socket.io";
import http from 'http';
import express from "express";
import cors from 'cors'

const app = express();

// Enable CORS for the frontend
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]; 
}

const userSocketMap = {}; 

io.on('connect', (socket) => {
    console.log("User connected", socket.id);
    const userId = socket.handshake.query.userId;
    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
    socket.emit('getOnlineUsers', Object.keys(userSocketMap));
})


export {app, io, server}



































// import {Server} from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors:{
//         origin:['http://localhost:5173'],
//         methods:['GET', 'POST'],
//     },
//     transports: ['websocket', 'polling'], // Ensure 'websocket' is supported
// });



// export const getReceiverSocketId = (receiverId) => {
//     return userSocketMap[receiverId];
// }

// const userSocketMap = {}; // {userId->socketId}


// io.on('connection', (socket)=>{
//     const userId = socket.handshake.query.userId
//     if(userId !== undefined){
//         userSocketMap[userId] = socket.id;
//     } 

//     io.emit('getOnlineUsers',Object.keys(userSocketMap));

//     socket.on('disconnect', ()=>{
//         delete userSocketMap[userId];
//         io.emit('getOnlineUsers',Object.keys(userSocketMap));
//     })

// })

// export {app, io, server};



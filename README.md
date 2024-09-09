# Fox-Chat-Application
Fox Chat is a dynamic and user-friendly messaging application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). Designed to offer a seamless and engaging chat experience, Fox Chat provides real-time communication capabilities with a sleek and intuitive interface.

##Install all the given packages in the frontend folder
  "dependencies": {
    "@reduxjs/toolkit": "^2.2.7",
    "axios": "^1.7.7",
    "cors": "^2.8.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.3.0",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.26.1",
    "redux-persist": "^6.0.0",
    "redux-thunk": "^3.1.0",
    "socket.io-client": "^4.7.5",
    "web-vitals": "^4.2.3"
  },

##Install all the given packages in the backend folder
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.6.1",
    "nodemon": "^3.1.4",
    "socket.io": "^4.7.5"
  }

##Add .env file in backend folder
PORT=3000
MONGODB_URI=<Your mongodb backend url>
JWT_SECRET_KEY=<secret key>

##Run your backend
// nodemon index.js

##Run your frontend
//npm run dev

##Go to 
//http://localhost:5173

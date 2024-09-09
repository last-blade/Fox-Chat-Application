import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';

const route = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/register",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

function App() {
    const { authUser } = useSelector(store => store.user);
    const { socket } = useSelector(store => store.socket);
    const dispatch = useDispatch();


    useEffect(() => {
        if (authUser && !socket) {
            const socketio = io('http://localhost:3000/', {
                query: {
                    userId: authUser._id,
                },
                // transports: ['websocket'],
            });
            // Save the socket instance in Redux store
            dispatch(setSocket(socketio));

            // Listen for the 'getOnlineUsers' event
            socketio.on('getOnlineUsers', (onlineUsers) => {
                console.log("Online Users: ", onlineUsers);
                dispatch(setOnlineUsers(onlineUsers));
            });

            // Cleanup function
            return () => {
                if (socketio) {
                    socketio.close();
                }
            };
        }
    }, [authUser, dispatch, socket]);

    useEffect(() => {
        if (!authUser && socket) {
            socket.close();
            dispatch(setSocket(null));
        }
    }, [authUser, dispatch, socket]);

    return (
        <div className='h-screen p-4 flex items-center justify-center'>
            <RouterProvider router={route} />
        </div>
    );
}

export default App;

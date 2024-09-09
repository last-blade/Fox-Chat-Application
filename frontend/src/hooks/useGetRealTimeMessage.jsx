import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setMessages } from '../redux/messageSlice';

function useGetRealTimeMessage() {
    
    const {socket} = useSelector(store=>store.socket);
    const {messages} = useSelector(store=>store.message);
    const dispatch = useDispatch();


    useEffect(() => {
        socket?.on("newMessage", (newMessage)=>{
            dispatch(setMessages([...messages, newMessage]));
        });
    }, [socket, setMessages, messages]);

    return null;
}

export default useGetRealTimeMessage;

import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';


function useGetMessages() {
    const {selectedUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    useEffect(()=>{
        async function fetchMessages(){
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`http://localhost:3000/message/${selectedUser?._id}`);
                console.log(response);
                dispatch(setMessages(response.data));
            } 
            
            catch (error) {
                console.log(error)    
            }
        }
        fetchMessages(); 
    }, [selectedUser])
}

export default useGetMessages
import React, { useEffect } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { setOtherUsers } from '../redux/userSlice';

function useGetOtherUsers() {

    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get("http://localhost:3000/user/");
                console.log(response);
                //store
                dispatch(setOtherUsers(response.data));
            } 
            
            catch (error) {
                
            }
        }
        fetchOtherUsers();
    }, [])
}

export default useGetOtherUsers
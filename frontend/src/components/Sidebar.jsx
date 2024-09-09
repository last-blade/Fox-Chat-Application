import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SetAuthUser, setOtherUsers } from '../redux/userSlice';

function Sidebar() {
  const [search, setSearch] = useState("");
  const {otherUsers} = useSelector(store=>store.user )
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function logoutHandler(){
    try {
      const response = await axios.get(`http://localhost:3000/user/logout`);
      toast.success(response.data.message);
      navigate("/login");
      localStorage.removeItem('authUser');
      
      // Dispatch an action to clear the authUser from Redux store
      dispatch(SetAuthUser(null));
    } 
    
    catch (error) {
      toast.error(response.data.message);
    }
  }

  function searchHandler(e){
    e.preventDefault();
    // alert(search)
if (!otherUsers || otherUsers.length === 0) {
        toast.error("No users available to search.");
        return;
    }

    const conversationUser = otherUsers.find((user) =>
        user.fullname.toLowerCase().includes(search.toLowerCase())
    );
    console.log("Conv user:- ", conversationUser);

    if (conversationUser) {
        dispatch(setOtherUsers([conversationUser]));
    } else {
        toast.error("User not found!");
    }
  }

  return (
    <div className='shadow-xl shadow-gray-400 border p-2 pt-3 pl-3 flex flex-col rounded-lg bg-gray-200 '>
        <form onSubmit={searchHandler} action="" className='flex items-center gap-2'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} type="search"  className='text-white bg-[#4B5563] input input-bordered rounded-full' placeholder='Search'/>
            <button className=' rounded-full hover:bg-[#7341F8] btn btn-link bg-black' type='submit'>
                <CiSearch size="30px"/>
            </button>
        </form>
        <div className='divider'></div>
        <OtherUsers/>
        <div className='mt-2'>
          <button onClick={logoutHandler} className='btn btn-sm bg-red-600 text-white' type='submit'>Logout</button>
        </div>
    </div>
  )
}

export default Sidebar
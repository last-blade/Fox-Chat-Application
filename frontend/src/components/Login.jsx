import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { SetAuthUser } from '../redux/userSlice';


function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch()
  async function submitHandler(e) {
    e.preventDefault();
    // console.log(user);

    if (!user.username || !user.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/user/login`, user,{
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log("Api Response:- ",response);

    // Store authUser in localStorage
      localStorage.setItem('authUser', JSON.stringify(response.data));
      dispatch(SetAuthUser(response.data));
      toast.success("Login successfull!");
      navigate("/");
    } 
    
    catch (error) {
      toast.error(error.message);
      // console.log("Error:- ", error);
    }
    setUser({
      username: "",
      password: "",
    });
  }

  
  return (
    <div className='container max-w-96'>
      <div className=' h-96 space-y-5 flex justify-center items-center flex-col w-full p-6 rounded-lg shadow-md bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-0'>
        <h1 className='text-3xl font-bold text-center text-gray-300'>Log in</h1>
        <form onSubmit={submitHandler} action="" className='space-y-3 '>
          <div className=''>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} type="username" className='border border-gray-400 text-[#7341F8] bg-white input input-bordered h-10 w-full' placeholder='Username'/>
          </div>
          <div className=''>
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" className='border border-gray-400 text-[#7341F8] bg-white input input-bordered h-10 w-full' placeholder='Password'/>
          </div>
          <div className='flex items-center justify-center'>
            <button type='submit' className='btn btn-block btn-sm bg-[#7341F8] text-white outline-none border-none'>Log in</button>
          </div>
          <div className='Already have an account flex items-center justify-center'>
            <p>Don't have an account?<Link to="/register" className='ml-1 text-[#7341F8]'>Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
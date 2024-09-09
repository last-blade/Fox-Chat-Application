import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'

function Signup() {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const navigate = useNavigate();

  function handleGenderCheckBox(gender) {
    setUser({ ...user, gender });
  }

  async function submitHandler(e) {
    e.preventDefault();
    // console.log("User:- ",user);
    try {
      const response = await axios.post(`http://localhost:3000/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log("Api Response:- ",response);
      if(response.data.success){
        // console.log(response.data.success);
        navigate("/login");
        toast.success(response.data.message); //isse popup show hoga screen par
      }
    } 
    
    catch (error) {
      toast.error(error.response.data.message);
      // console.log("Error:- ", error);
    }
    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })
  }

  return (
    <div className='container max-w-96'>
      <div className='space-y-5 flex justify-center items-center flex-col w-full p-6 rounded-lg shadow-md bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-0 border'>
        <h1 className='text-3xl font-bold text-center text-gray-300'>Signup</h1>
        <form onSubmit={submitHandler} action="" className='space-y-3 '>
          <div>
            <input value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} type="text" className='border border-gray-400 text-[#7341F8] bg-white input input-bordered h-10 w-full' placeholder='Full name' />
          </div>
          <div>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} type="username" className='border border-gray-400 text-[#7341F8] bg-white input input-bordered h-10 w-full' placeholder='Username' />
          </div>
          <div>
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" className='border border-gray-400 text-[#7341F8] bg-white input input-bordered h-10 w-full' placeholder='Password' />
          </div>
          <div>
            <input value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} type="password" className='border border-gray-400 text-[#7341F8] bg-white input input-bordered h-10 w-full' placeholder='Confirm password' />
          </div>
          {/* Checkboxes */}
          <div className='checkboxes flex items-center space-x-3'>
            <div className='flex space-x-2'>
              <p>Male</p>
              <input
                type="checkbox"
                className='checkbox'
                checked={user.gender === "male"}
                onChange={() => handleGenderCheckBox("male")}
              />
            </div>
            <div className='flex space-x-2'>
              <p>Female</p>
              <input
                type="checkbox"
                className='checkbox'
                checked={user.gender === "female"}
                onChange={() => handleGenderCheckBox("female")}
              />
            </div>
            <div className='flex space-x-2'>
              <p>Prefer not to say</p>
              <input
                type="checkbox"
                className='checkbox'
                checked={user.gender === "preferNotToSay"}
                onChange={() => handleGenderCheckBox("preferNotToSay")}
              />
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <button type='submit' className='btn btn-block btn-sm bg-[#7341F8] border-none outline-none text-white'>Sign up</button>
          </div>
          <div className='Already have an account flex items-center justify-center'>
            <p>Already have an account?<Link to="/login" className='ml-1 text-[#7341F8]'>Log in</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;

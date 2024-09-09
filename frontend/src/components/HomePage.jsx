import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from "react-redux";
import LoginSignupPage from './LoginSignupPage';
import Login from './Login';

function HomePage() {
  const {selectedUser} = useSelector(store=>store.user);
  const {authUser} = useSelector(store=>store.user);
  // console.log("Authuser- ", authUser);

  return (
    <div className='flex justify-center w-full h-[600px] rounded-md overflow-hidden '>
      {
        authUser ? 
        <div className='flex'>
        <Sidebar/>
        <MessageContainer/>
      </div> : 
        <div className='mt-36'>
          <Login/>
        </div>
      }
    </div>
  )
}

export default HomePage
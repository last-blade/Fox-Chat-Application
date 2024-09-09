import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';


function User({user}) {
  const dispatch = useDispatch();
  const {selectedUser, onlineUsers} = useSelector(store=>store.user);
  // const {authUser} = useSelector(store=>store.user);
  const isOnline = onlineUsers.includes(user._id);
  function selectedUserHandler(user){
    // console.log(user);
    dispatch(setSelectedUser(user));
  };


  return (
    <div>
    <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-500 text-black' : ''} flex gap-2 items-center rounded-xl hover:bg-slate-400 p-2 cursor-pointer transition-all duration-200 hover:text-black text-gray-700`}> 
      <div className={`avatar ${isOnline ? 'online' : ''}`}>
        <div className="w-10 rounded-full">
          <img src={`https://ui-avatars.com/api/?name=${user?.fullname}`}alt="Profile photo"/>
        </div>
      </div>
      <div className="">
        <div className="flex gap-2 flex-1">
          <p>{user?.fullname}</p>
        </div>
      </div>
    </div>
    <div className="divider p-0 my-0 h-1"></div>
  </div>
  )
}

export default User
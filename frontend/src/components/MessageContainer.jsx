import React, { useEffect } from "react";
import SendMessageTypeBar from "./SendMessageTypeBar";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

function MessageContainer() {

  const {selectedUser, authUser} = useSelector(store=>store.user);
  const dispatch = useDispatch();
  useEffect(()=>{
    return () => dispatch(setSelectedUser(null))
  }, []);

  return (
    <>
      {
        selectedUser ? (
          <div className="md:min-w-[450px] flex flex-col shadow-gray-400 shadow-xl bg-gray-200 rounded-md">
          <div className="flex gap-2 items-center rounded-xl bg-zinc-800 text-white px-4 py-2 mb-2">
          { selectedUser?.profilePhoto ? 
            <div className="avatar ">
              <div className="w-10 rounded-full">          
                <img
                  src={selectedUser?.profilePhoto}
                  alt=""
                />
              </div>
            </div>: <div className=""></div>
          }
            <div className="">
              <div className="flex gap-2 flex-1">
                <p>{selectedUser?.fullname}</p>
              </div>
            </div>
          </div>
          <Messages/>
          <SendMessageTypeBar/>
        </div>
        ): <div className="md:min-w-[450px] flex-col border-transparent flex justify-center items-center">
          <h1 className="text-2xl font-semibold">Hi, {authUser?.fullname} !</h1>
          <h1 className="text-xl">Start your conversation.</h1>
        </div>
      }
    </>
  );
}

export default MessageContainer;

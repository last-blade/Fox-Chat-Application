import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";

function IndividualMessage({message}) {

  const {selectedUser} = useSelector(store=>store.user);
  // console.log("ProfilePhoto:- ",selectedUser?.profilePhoto);
  const scrollBar = useRef();
  const {authUser} = useSelector(store=>store.user);
  console.log("Authuser- ", authUser);

  useEffect(()=>{
    scrollBar.current?.scrollIntoView({behavior: "smooth"});
  }, [message]);

  // console.log("IDS:- ",authUser?._id, message?.senderId);
  return (
    <div ref={scrollBar}>
      <div className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt=""
              src={selectedUser?.profilePhoto}
            />
          </div>
        </div>
        <div className="chat-header">
          {/* <time className="text-xs opacity-50">{selectedUser?.createdAt.split('T')[0]}</time> */}
        </div>
        <div className={`chat-bubble ${authUser?._id === message?.senderId ? 'bg-[#7341F8] text-white' : 'chat-start'}`}>{message?.message}</div>
        <div className="chat-footer opacity-100">Delivered</div>
      </div>
    </div>
  );
}

export default IndividualMessage;

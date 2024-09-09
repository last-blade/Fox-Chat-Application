import React from "react";
import User from "./User";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

function OtherUsers() {
  useGetOtherUsers();
  const {OtherUsers} = useSelector(store=>store.user);

  if(!OtherUsers){ // this is an early retun concept in reactjs
    return;
  }

  return (
    <div className="overflow-auto flex-1">
      {
        OtherUsers?.map((user)=>{
          // console.log(user)
          return(
            <User key={user._id} user={user}/>
          )
        })
      }
    </div>
  );
}

export default OtherUsers;

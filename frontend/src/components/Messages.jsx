import React from 'react'
import IndividualMessage from './IndividualMessage'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

function Messages() {
  useGetMessages();
  useGetRealTimeMessage();

  const {messages} = useSelector(store=>store.message);

  // if(!messages) {
  //     return
  //   };

  return (
    <div className='px-4 flex-1 overflow-auto'>

      {
        messages && messages?.map((singleMessage)=>{
          return(
            <IndividualMessage key={singleMessage._id} message={singleMessage}/>
          )
        })
      }
    </div>
  )
}

export default Messages
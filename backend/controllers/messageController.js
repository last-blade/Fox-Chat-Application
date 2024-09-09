import { conversationModel } from "../models/conversation-model.js";
import { messageModel } from "../models/message-model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


//send message function--------------------------------------------------------------------------------------------------------------
export const sendMessage = async (request, response) => {
    try {
      const senderId = request.id; 
      const receiverId = request.params.id;
      const {message} = request.body; // jo message send kiya jaayega sender dwara, toh uss message ko hum retrieve kar rahe hain 

      let gotConversation = await conversationModel.findOne({
        participants: {$all: [senderId, receiverId]}
      });

      if(!gotConversation){
        gotConversation = await conversationModel.create({
            participants: [senderId, receiverId]
        });
      };

      // console.log("Sender ID:", senderId); // Add this before message creation

      const newMessage = await messageModel.create({
        senderId,
        receiverId,
        message
      });

      if(newMessage){
        gotConversation.messages.push(newMessage._id);
      };

      // await gotConversation.save();
      // await newMessage.save();

      await Promise.all([gotConversation.save(), newMessage.save()])


      // Socket.io implement karenge yahan par ab neeche
      const receiverSocketId = getReceiverSocketId(receiverId);

      if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }


      return response.status(200).json({
        // message: "Message send successfully!"
        newMessage
      });

      


    }
    
    catch (error) {
        console.log("Error in sending message:- ", error);
    }
};




// receive message function-----------------------------------------------------------------------------------------------------------
export const receiveMessage = async (request, response) => {
  try {
    const receiverId = request.params.id;
    const senderId = request.id;
    const conversation = await conversationModel.findOne({
      participants: {$all: [senderId, receiverId]}
    }).populate("messages");
    // console.log("Conversations:- ", conversation);
    return response.status(200).json(conversation?.messages);
  } 
  
  catch (error) {
    
  }
};
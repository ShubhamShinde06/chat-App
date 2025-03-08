import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";


const ChatListItem = () => {
  
  const { setChatOpen, chatsdata,setChatUser, setMessageId, messageId, oppId, setOppId } = useContext(ChatContext);

  const setChat = async (item) => {
    setMessageId(item.message)
    setChatUser(item) 
    setOppId(item.userData.id)
  }

  const convertLastSeen = (timestamp) => {
    if (!timestamp) return "Invalid Date";
  
    let date = new Date(timestamp); // Convert timestamp to Date object
  
    let hour = date.getHours();
    let minute = date.getMinutes().toString().padStart(2, "0"); // Ensure two-digit minutes
    let period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 24-hour to 12-hour format
  
    return `${hour}:${minute} ${period}`;
  };
  
  // const lastSeen = 1741421487554;
  // console.log(convertLastSeen(lastSeen)); 
  


  return (
    <>
    {
      chatsdata?.map((item, index) => (
        <>
        <div
        key={item.id || index + 1}
        onClick={() => {setChatOpen(true), setChat(item)}}
        className="w-full h-[70px] border-b-2 border-[#222D34] flex items-center pr-1 gap-4 mb-2 py-2 cursor-pointer"
      >
        <div className=" w-[60px] h-[50px] border rounded-full overflow-hidden">
          <img
            src="https://ik.imagekit.io/0ao6bbymi/profile.jpeg?updatedAt=1735293505376"
            alt=""
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full h-[25px] flex justify-between items-center">
            <h3 className="text-[20px]">{item?.userData?.name}</h3>
            <h6 className="text-[10px] text-[#7A8D9C]">{convertLastSeen(item?.updateAt)}</h6>
          </div>
          <div>
            <p className="text-[14px] text-[#7A8D9C]"> {item.lastMessage}</p>
          </div>
        </div>
      </div>
        </>
      ))
    }
      
    </>
    
  );
};

export default ChatListItem;

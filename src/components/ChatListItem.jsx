import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const ChatListItem = () => {
  const { setChatOpen } = useContext(ChatContext);

  return (
    <div
      onClick={() => setChatOpen(true)}
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
          <h3 className="text-[20px]">Username</h3>
          <h6 className="text-[10px] text-[#7A8D9C]">10:04 pm</h6>
        </div>
        <div>
          <p className="text-[14px] text-[#7A8D9C]">Happy new year</p>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;

import React, { useContext } from "react";
import Search from "./Search";
import ChatListItem from "./ChatListItem";
import { ChatContext } from "../context/ChatContext";

const List = () => {
  const { chatopen } = useContext(ChatContext);

  return (
    <>
      <div className={`w-full lg:w-[35%] xl:w-[25%] bg-[#111B21] py-5 px-3 text-white ${chatopen ? ' hidden lg:block' : 'block'}`}>
        <h1 className="font-bold text-2xl">Chats</h1>
        <div>
          <Search />
        </div>
        <div className="mt-6 h-[80vh] w-full flex flex-col overflow-scroll overflow-x-hidden">
          <ChatListItem />
          <ChatListItem />
        </div>
      </div>
    </>
  );
};

export default List;

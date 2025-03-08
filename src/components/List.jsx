import React, { useContext, useEffect, useState } from "react";
import Search from "./Search";
import ChatListItem from "./ChatListItem";
import { ChatContext } from "../context/ChatContext";
import Loading from "./Loading";

const List = () => {
  const { chatopen } = useContext(ChatContext);
  const { isLoading } = useContext(ChatContext);
  const [user, setUser] = useState(null);


  return (
    <>
      <div className={`w-full lg:w-[35%] xl:w-[25%] bg-[#111B21] py-5 px-3 text-white ${chatopen ? ' hidden lg:block' : 'block'}`}>
        <h1 className="font-bold text-2xl">Chats</h1>
        <div>
          <Search setUser={setUser}/>
        </div>
        <div className="mt-6 h-[80vh] w-full flex flex-col overflow-scroll overflow-x-hidden">
          {
            isLoading 
            ? 
            <div className="w-full flex items-center justify-center"><Loading/></div>
            :
            <ChatListItem />
          }
        </div>
      </div>
    </>
  );
};

export default List;

import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import List from "../components/List";
import Chat from "../components/Chat";
import Details from "../components/Details";
import { ChatContext } from "../context/ChatContext";

const Home = () => {

  const {details} = useContext(ChatContext)

  return (
    <div className="lg:w-[97vw] lg:h-[95vh] w-full h-full bg-[#202C33] lg:rounded-xl flex overflow-hidden">
      <Sidebar />
      <List />
      <Chat />
      {
        details ? <Details /> : ''
      }
      
    </div>
  );
};

export default Home;

import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Profile from '../components/Profile'

const Profilepage = () => {



  return (
    <div className="lg:w-[97vw] lg:h-[95vh] w-full h-full bg-[#202C33] lg:rounded-xl flex">
      <Sidebar />
      <Profile/>
      <Chat />
    </div>
  );
};

export default Profilepage;

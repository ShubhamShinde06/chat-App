import React, { useContext } from "react";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosVideocam } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";

const Sidebar = () => {

  const {chatopen} = useContext(ChatContext)

  return (
    <div className={`w-[60px] md:w-[60px] lg:w-[80px] h-auto flex flex-col justify-between  items-center py-5 text-[#AEBAC1] text-[20px] ${chatopen ? ' hidden md:flex' : ' block'}`}>
      <div className="flex flex-col gap-6">
        <NavLink
          to={"/"}
          className=" cursor-pointer flex items-center justify-center pt-1 navlink"
        >
          <BsFillChatSquareTextFill/>
        </NavLink>
        <NavLink
          to={'/add'}
          className=" cursor-pointer flex items-center justify-center  pt-1 navlink"
        >
          <IoMdAdd/>
        </NavLink>
        {/* <NavLink
          to={"/video"}
          className=" cursor-pointer flex items-center justify-center pt-1 navlink"
        >
          <IoIosVideocam/>
        </NavLink> */}
      </div>

      <div className="flex flex-col gap-6 text-[25px]">
        {/* <NavLink
          to={"/setting"}
          className=" cursor-pointer flex items-center justify-center pt-1 navlink"
        >
          <IoMdSettings/>
        </NavLink> */}
        <NavLink
          to={"/profile"}
          className=" cursor-pointer flex items-center justify-center pt-1 navlink"
        >
          <CgProfile/>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

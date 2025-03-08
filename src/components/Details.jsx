import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiUserForbidLine } from "react-icons/ri";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";

const Details = () => {
  const { details, setDetails, chatUser } = useContext(ChatContext);
  const [openmedia, setOPenMedia] = useState(false);

  console.log(chatUser)

  return (
    <div
      className={`  ${
        details
          ? "text-[#8696A0]  absolute w-full h-full md:w-[50%]  bg-[#0C1317]  md:right-0 xl:relative lg:w-[30%]  lg:block"
          : " hidden"
      } `}
    >
      <div className="bg-[#111B21] p-3 py-5 mb-3">
        <div className=" flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <RxCross2
              className=" text-[30px] cursor-pointer"
              onClick={() => setDetails(false)}
            />
            <h3 className=" text-white text-[18px]">Context info</h3>
          </div>
          <div className="text-[22px]  cursor-pointer">
            <RiUserForbidLine />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 justify-center">
          <div className="w-[200px] h-[200px] rounded-full border overflow-hidden">
            <img
              src="https://ik.imagekit.io/0ao6bbymi/profile.jpeg?updatedAt=1735293505376"
              alt=""
            />
          </div>
          <h3 className="text-[20px]">{chatUser.userData.name}</h3>
        </div>
      </div>
      <div className="bg-[#111B21] p-3 py-5 mb-3">
        <h1 className="text-[16px] mb-2">About</h1>
        <h2 className="text-white text-[18px]">{chatUser.userData.about}</h2>
      </div>
      <div className="bg-[#111B21] p-3 py-5 flex items-center justify-between">
        <h1 className="text-[16px] mb-2">Media, links and docs</h1>
        <span className="text-[30px] text-[white]">
          {openmedia ? (
            <IoIosArrowDropup
              className=" cursor-pointer"
              onClick={() => setOPenMedia(false)}
            />
          ) : (
            <IoIosArrowDropdown
              className=" cursor-pointer"
              onClick={() => setOPenMedia(true)}
            />
          )}
        </span>
      </div>
      {openmedia ? <div className="bg-[#111B21] p-3 py-5 h-full"></div> : ""}
    </div>
  );
};

export default Details;

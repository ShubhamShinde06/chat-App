import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { FaCamera } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { ChatContext } from "../context/ChatContext";
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const { chatopen, setDetails, details, setChatOpen } =
    useContext(ChatContext);

  const [Emoji, setEmoji] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  return (
    <>
      {chatopen ? (
        <div className=" block md:flex-1 overflow-hidden relative">
          {/* HEADER */}
          <div className="w-full h-[70px] bg-[#202C33] px-5 flex items-center justify-between ">
            <div className="flex items-center gap-4">
              {/* back btn */}
              <div className=" lg:hidden text-white text-[20px]">
                <IoIosArrowBack onClick={() => setChatOpen(false)} />
              </div>

              {/* profile_img */}
              <div className="w-11 h-11 border rounded-full overflow-hidden">
                <img
                  src="https://ik.imagekit.io/0ao6bbymi/profile.jpeg?updatedAt=1735293505376"
                  alt=""
                />
              </div>

              {/* username & time */}
              <div
                className=" cursor-pointer"
                onClick={() => setDetails(!details)}
              >
                <h3 className="text-[20px] text-white">Username</h3>
                <h6 className="text-[14px] text-[#7A8D9C]">10:04 pm</h6>
              </div>
            </div>

            {/* others icons */}
            <div className="flex gap-6 items-center text-white text-[20px]">
              <FaPhoneAlt className=" cursor-pointer" />
              <IoVideocam className=" cursor-pointer" />
              <FaInfoCircle className=" cursor-pointer" />
            </div>
          </div>

          {/* CHATS */}
          <div
            onClick={() => setDetails(false) || setEmoji(false)}
            className="bg-img w-full h-[calc(100vh-140px)] lg:h-[calc(95vh-140px)]"
          ></div>

          {/* TYPING */}
          <div className="w-full h-[70px] flex justify-between gap-4 items-center px-5 ">
            {/* icons */}
            <div className="md:flex items-center gap-4 text-white text-[20px] hidden">
              <RiGalleryFill className=" cursor-pointer" />
              <FaCamera className=" cursor-pointer" />
              <FaMicrophone className=" cursor-pointer" />
            </div>
            {/* addtion_btn */}
            <div className="text-[30px] text-white md:hidden">
              <IoMdAdd />
            </div>
            {/* keyboard */}
            <div className="w-full h-[45px] rounded-md bg-[#2A3942]">
              <input
                type="text"
                placeholder="Type a message.."
                className="w-full h-full border-none bg-transparent outline-none pl-2 text-white text-[20px] placeholder:text-[15px]"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            {/* emojes & btn */}
            <div className="flex items-center gap-5">
              <div>
                <MdEmojiEmotions
                  className="text-white text-[25px] cursor-pointer"
                  onClick={() => setEmoji(!Emoji)}
                />
              </div>
              <button className=" hidden  md:block p-2 px-6 rounded-md border text-white hover:bg-[#008069] hover:border-none">
                Send
              </button>
              <button className="md:hidden text-[30px] text-[#008069]">
                <IoSend />
              </button>
            </div>
          </div>

          {Emoji ? (
            <div className=" absolute bottom-[70px] right-0 emoji z-10">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          ) : (
            ""
          )}

          {/* message */}
          <div className=" text-white absolute top-[70px] bottom-[70px] px-5 py-5 flex flex-col overflow-scroll overflow-x-hidden container-msg gap-2">
            {/* opp_msg*/}
            <div className=" w-[50%] flex gap-3 p-2 rounded-md">
              {/* userimg */}
              <div className="w-[30px] h-[30px] border rounded-full"></div>
              {/* text */}
              <div className=" flex-1 gap-5">
                <p className=" backdrop-blur-sm bg-white/10 p-[20px] rounded-[10px] mb-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus, fugiat ipsam dolores cum voluptas culpa facilis
                  animi quas vitae distinctio labore quo fugit, officia tempora
                  blanditiis tenetur, beatae nemo non.
                </p>
                {/* date & time */}
                <span className=" text-[13px]">1 min ago.</span>
              </div>
            </div>
            {/* opp_msg*/}
            <div className=" w-[50%] flex gap-3 p-2 rounded-md">
              {/* userimg */}
              <div className="w-[30px] h-[30px] border rounded-full"></div>
              {/* text */}
              <div className=" flex-1 gap-5">
                <p className=" backdrop-blur-sm bg-white/10 p-[20px] rounded-[10px] mb-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus, fugiat ipsam dolores cum voluptas culpa facilis
                  animi quas vitae distinctio labore quo fugit, officia tempora
                  blanditiis tenetur, beatae nemo non.
                </p>
                {/* date & time */}
                <span className=" text-[13px]">1 min ago.</span>
              </div>
            </div>
            {/* own msg */}
            <div className=" flex items-center justify-end">
              <div className=" w-[50%] flex-row-reverse flex gap-5 p-2 rounded-md">
                {/* text */}
                <div className=" flex-1">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    className=" mb-2 w-[100%] rounded-md h-[300px]"
                  />
                  <p className=" bg-[#008069] p-[20px] rounded-[10px] mb-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloribus, fugiat ipsam dolores cum voluptas culpa facilis
                    animi quas vitae distinctio labore quo fugit, officia
                    tempora blanditiis tenetur, beatae nemo non.
                  </p>
                  {/* date & time */}
                  <span className=" text-[13px] text-right">1 min ago.</span>
                </div>
              </div>
            </div>
            {/* opp_msg*/}
            <div className=" w-[50%] flex gap-3 p-2 rounded-md">
              {/* userimg */}
              <div className="w-[30px] h-[30px] border rounded-full"></div>
              {/* text */}
              <div className=" flex-1 gap-5">
                <p className=" backdrop-blur-sm bg-white/10 p-[20px] rounded-[10px] mb-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloribus, fugiat ipsam dolores cum voluptas culpa facilis
                  animi quas vitae distinctio labore quo fugit, officia tempora
                  blanditiis tenetur, beatae nemo non.
                </p>
                {/* date & time */}
                <span className=" text-[13px]">1 min ago.</span>
              </div>
            </div>
            {/* own msg */}
            <div className=" flex items-center justify-end">
              <div className=" w-[50%] flex-row-reverse flex gap-5 p-2 rounded-md">
                {/* text */}
                <div className=" flex-1">
                  <p className=" bg-[#008069] p-[20px] rounded-[10px] mb-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloribus, fugiat ipsam dolores cum voluptas culpa facilis
                    animi quas vitae distinctio labore quo fugit, officia
                    tempora blanditiis tenetur, beatae nemo non.
                  </p>
                  {/* date & time */}
                  <span className=" text-[13px] text-right">1 min ago.</span>
                </div>
              </div>
            </div>
            <div ref={endRef}></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Chat;

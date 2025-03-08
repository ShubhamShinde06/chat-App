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
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/Firebase";
import { toast } from "react-toastify";

const Chat = () => {
  const {
    chatopen,
    setDetails,
    details,
    setChatOpen,
    chatUser,
    userData,
    setMessage,
    messageId,
    message,
    oppId
  } = useContext(ChatContext);

  const [Emoji, setEmoji] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    if (!messageId) return;
    const unSub = onSnapshot(doc(db, "messages", messageId), (res) => {
      setMessage(res?.data()?.messages || []);
    });
    return () => unSub();
  }, [messageId]);


  const sendMessage = async () => {
    if (!messageId || !oppId || !userData?.id) {
      console.error("Error: Required IDs are missing");
      return;
    }
  
    try {
      // Send the message
      await updateDoc(doc(db, "messages", messageId), {
        messages: arrayUnion({
          sId: userData.id,
          text: text,
          createdAt: new Date(),
        }),
      });
  
      // Reference to the current user's chat document
      const userChatRef = doc(db, "chats", userData.id);
      const oppChatRef = doc(db, "chats", oppId);
  
      // Get existing chat data
      const userChatSnap = await getDoc(userChatRef);
      const oppChatSnap = await getDoc(oppChatRef);
  
      const updateChatData = (chatSnap, chatRef, receiverId) => {
        if (chatSnap.exists()) {
          // Chat exists, update the specific chat entry
          const existingChats = chatSnap.data()?.chatsData || [];
          const updatedChats = existingChats.map(chat => 
            chat.message === messageId 
              ? { ...chat, lastMessage: text, updateAt: Date.now(), messageSeen: false }
              : chat
          );
  
          return updateDoc(chatRef, { chatsData: updatedChats });
        } else {
          // Chat doesn't exist, create a new entry
          return setDoc(chatRef, {
            chatsData: [
              {
                message: messageId,
                lastMessage: text,
                rId: receiverId,
                updateAt: Date.now(),
                messageSeen: false,
              },
            ],
          });
        }
      };
  
      // Update both users' chat lists
      await updateChatData(userChatSnap, userChatRef, oppId);
      await updateChatData(oppChatSnap, oppChatRef, userData.id);
  
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  
    setText("");
  };
  


  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  const converTimeStemp = (timestamp) => {
    let date = timestamp.toDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (hour > 12) {
      return hour - 12 + ":" + minute + "PM";
    } else {
      return hour + ":" + minute + "AM";
    }
  };

  return (
    <>
      {chatopen && (
        <div className="block flex-1 overflow-hidden relative">
          <div className="w-full h-[70px] bg-[#202C33] px-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <IoIosArrowBack
                className="lg:hidden text-white text-[20px]"
                onClick={() => setChatOpen(false)}
              />
              <div className="w-11 h-11 border rounded-full overflow-hidden">
                <img
                  src="https://ik.imagekit.io/0ao6bbymi/profile.jpeg"
                  alt="Profile"
                />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => setDetails(!details)}
              >
                <h3 className="text-[20px] text-white">
                  {chatUser.userData.name}
                </h3>
                <h6 className="text-[14px] text-[#7A8D9C]">10:04 pm</h6>
              </div>
            </div>
            <div className="flex gap-6 items-center text-white text-[20px]">
              {/* <FaPhoneAlt />
              <IoVideocam />
              <FaInfoCircle /> */}
            </div>
          </div>

          <div className=" w-full overflow-y-auto px-5 py-5 absolute top-[70px] bottom-[70px]">
            {message.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sId === userData.id ? "justify-end" : "justify-start"
                } mb-2 z-10`}
              >
                <div className="w-6 h-6 border rounded-full mr-1 overflow-hidden">
                  <img
                    src="https://ik.imagekit.io/0ao6bbymi/profile.jpeg?updatedAt=1735293505376"
                    alt=""
                  />
                </div>
                <div
                  className={`max-w-[60%] p-3 rounded-lg ${
                    msg.sId === userData.id
                      ? "bg-[#008069] text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  <p>{msg.text}</p>

                  <span className="text-xs text-gray-400 block mt-1 text-right">
                    {converTimeStemp(msg.createdAt)}
                  </span>
                </div>
              </div>
            ))}
            <div ref={endRef}></div>
          </div>

          <div className="w-full h-[70px] flex justify-between gap-4 items-center px-5 absolute bottom-0">
            <div className="md:flex items-center gap-4 text-white text-[20px] hidden">
              {/* <RiGalleryFill />
              <FaCamera />
              <FaMicrophone /> */}
            </div>
            <div className="text-[30px] text-white md:hidden">
              <IoMdAdd />
            </div>
            <div className="w-full h-[45px] rounded-md bg-[#2A3942]">
              <input
                type="text"
                placeholder="Type a message.."
                className="w-full h-full bg-transparent text-white pl-2 text-[20px] outline-none border-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-5">
              <MdEmojiEmotions
                className="text-white text-[25px] cursor-pointer"
                onClick={() => setEmoji(!Emoji)}
              />
              <button
                onClick={sendMessage}
                className="hidden md:block p-2 px-6 rounded-md border text-white hover:bg-[#008069]"
              >
                Send
              </button>
              <IoSend
                className="md:hidden text-[30px] text-[#008069] cursor-pointer"
                onClick={sendMessage}
              />
            </div>
          </div>

          {Emoji && (
            <div className="absolute bottom-[70px] right-0 z-10">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chat;

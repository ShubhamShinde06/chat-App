import React from "react";
import Sidebar from "../components/Sidebar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/Firebase";
import { IoMdSearch } from "react-icons/io";

const Addusers = () => {

   const inputHandler = async (e) => {
      try {
        const input = e.target.value;
        const userRef = collection(db, "users");
  
        const q = query(userRef, where("name", "==", input));
  
        const querySnap = await getDocs(q);
  
        if (!querySnap.empty) {
          console.log(querySnap.docs[0].data());
        }
      } catch (error) {
        console.log("error", error);
      }
    };

  return (
    <div className="lg:w-[97vw] lg:h-[95vh] w-full h-full bg-[#202C33] lg:rounded-xl flex overflow-hidden">
      <Sidebar />
      <div
        className={`w-full lg:w-[35%] xl:w-[25%] bg-[#111B21] py-5 px-3 text-white`}
      >
        <h1 className="font-bold text-2xl">Chats</h1>
        <div>
          <div className="w-full h-10 mt-6 flex items-center pl-2 rounded-md text-[#707F88] bg-[#202C33]">
            <IoMdSearch className="text-[20px] " />
            <input
              type="text"
              placeholder="Serach New Users.."
              className=" bg-transparent border-none outline-none w-full h-full p-2 flex-1 text-white"
              onChange={inputHandler}
            />
          </div>
        </div>
        <div className="mt-6 h-[80vh] w-full flex flex-col overflow-scroll overflow-x-hidden">
          <div className="w-full h-[70px] border-b-2 border-[#222D34] flex items-center pr-1 gap-4 mb-2 py-2 cursor-pointer">
            <div className=" w-[60px] h-[50px] border rounded-full"></div>
            <div className="w-full flex flex-col">
              <div className="w-full h-[25px] flex justify-between items-center">
                <h3 className="text-[20px]">Username</h3>
                <button className="px-2 py-1 rounded-xl text-xs bg-[#008069] text-white">Add User</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addusers;

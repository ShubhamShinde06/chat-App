import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext } from "react";
import { IoMdSearch } from "react-icons/io";
import { db } from "../lib/Firebase";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const { chatopen, userData, chatsdata, setUser } = useContext(ChatContext);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      console.log(input);
      const userRef = collection(db, "users");

      const q = query(userRef, where("name", "==", input));

      const querySnap = await getDocs(q);

      if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
        setUser(querySnap.docs[0].data());
        //console.log(querySnap.docs[0].data());
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <form className="w-full h-10 mt-6 flex items-center pl-2 rounded-md text-[#707F88] bg-[#202C33]">
        <IoMdSearch className="text-[20px] " />
        <input
          type="text"
          placeholder="Search"
          onChange={inputHandler}
          name="username"
          className=" bg-transparent border-none outline-none w-full h-full p-2 flex-1 text-white"
        />
      </form>
    </>
  );
};

export default Search;

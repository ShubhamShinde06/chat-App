import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../lib/Firebase";
import { IoMdSearch } from "react-icons/io";
import { ChatContext } from "../context/ChatContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from '../components/Loading'

const Addusers = () => {
  const { userData, chatsdata, isLoading, setIsLoading } = useContext(ChatContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  const inputHandler = async (e) => {
    try {
      const input = e.target.value.trim(); // Trim spaces
      if (!input) {
        setUser(null);
        return;
      }
  
      const userRef = collection(db, "users");
      const q = query(userRef, where("name", "==", input));
      const querySnap = await getDocs(q);
  
      if (querySnap.empty) return; // No user found
  
      const fetchedUser = querySnap.docs[0].data();
      
      if (fetchedUser.id === userData.id) return; // Don't set current user
  
      const userExist = chatsdata.some((user) => user.rId === fetchedUser.id);
  
      if (!userExist) {
        setUser(fetchedUser);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  

  const addChat = async () => {
    const messageRef = collection(db, "messages");
    const chatsRef = collection(db, "chats");
    setIsLoading(true)
    try {
      const newMessageRef = doc(messageRef);
  
      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        message: []
      });
  
      // Ensure the chat document exists before updating
      await setDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion({
          message: newMessageRef.id,
          lastMessage: "",
          rId: userData.id,
          updateAt: Date.now(),
          messageSeen: true
        })
      }, { merge: true });
  
      await setDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion({
          message: newMessageRef.id,
          lastMessage: "",
          rId: user.id,
          updateAt: Date.now(),
          messageSeen: true
        })
      }, { merge: true });

      setIsLoading(false)
      navigate('/')
  
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false)
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
          {
            user
            ?
            <div className="w-full h-[70px] border-b-2 border-[#222D34] flex items-center pr-1 gap-4 mb-2 py-2 cursor-pointer">
            <div className=" w-[60px] h-[50px] border rounded-full overflow-hidden">
              <img
                className="w-full h-full"
                src="https://ik.imagekit.io/0ao6bbymi/profile.jpeg?updatedAt=1735293505376"
                alt=""
              />
            </div>
            <div className="w-full flex flex-col">
              <div className="w-full h-[25px] flex justify-between items-center">
                <h3 className="text-[20px]">{user?.name}</h3>
                <button onClick={addChat} className="px-2 py-1 rounded-xl text-xs bg-[#008069] text-white">
                  {isLoading ? <Loading/> : 'Add User'}
                </button>
              </div>
            </div>
          </div>
          :
          <h1 className=" text-center">Add new Friend</h1>
          }
          
        </div>
      </div>
    </div>
  );
};

export default Addusers;

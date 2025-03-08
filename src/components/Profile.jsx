import React, { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../lib/Firebase";
import { ChatContext } from "../context/ChatContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";
import {toast} from 'react-toastify'

const Profile = () => {
  const { userData } = useContext(ChatContext);


  const [editName, setEditName] = useState(false);
  const [editAbout, setEditAbout] = useState(false);

  const [name, setName] = useState(userData?.name);
  const [about, setAbout] = useState(userData?.about);
  const [uid, setUid] = useState("");

  const Logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
      toast.error(error.code.split("/")[1].split("-").join(" "));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, {
        name: name,
        about: about,
      });
      toast.success('updated')
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().name) {
          setName(docSnap.data().name);
        }
        if (docSnap.data().about) {
          setAbout(docSnap.data().about);
        }
      }
    });
  }, []);

  return (
    <div className="w-full lg:w-[35%] xl:w-[25%] bg-[#111B21] py-5 px-3 text-white relative">
      <h1 className="font-bold text-2xl">Profile</h1>
      <div className="w-full flex flex-col px-5 gap-8 justify-center mt-10">
        <div className=" flex items-center justify-center">
          <div className="w-[200px] h-[200px] border rounded-full overflow-hidden">
            <img
              src="https://ik.imagekit.io/0ao6bbymi/profile.jpeg?updatedAt=1735293505376"
              alt=""
            />
          </div>
        </div>

        <form onSubmit={handleUpdate}>
          <div className="">
            <label htmlFor="" className="text-[#017D68]">
              Your name
            </label>
            <div className="w-full h-[50px] flex items-center">
              {editName ? (
                <input
                  type="text"
                  placeholder="Username.."
                  className="bg-transparent border-b-2 border-[#222D34] w-full h-full flex-1 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <div className="bg-transparent border-b-2 border-[#222D34] w-full h-full flex flex-1 outline-none items-center">
                  {name}
                </div>
              )}

              {editName ? (
                <RxCross2
                  onClick={() => setEditName(false)}
                  className="text-[#9CA3AF] text-[20px] cursor-pointer"
                />
              ) : (
                <FaRegEdit
                  onClick={() => setEditName(true)}
                  className="text-[#9CA3AF] text-[20px] cursor-pointer"
                />
              )}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="" className="text-[#017D68]">
              About
            </label>
            <div className="w-full h-[50px]  flex items-center">
              {editAbout ? (
                <input
                  type="text"
                  placeholder="Write some..."
                  className="bg-transparent border-b-2 border-[#222D34] w-full h-full flex-1 outline-none"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              ) : (
                <div className="bg-transparent border-b-2 border-[#222D34] w-full h-full flex flex-1 outline-none items-center">
                  {about}
                </div>
              )}

              {editAbout ? (
                <RxCross2
                  onClick={() => setEditAbout(false)}
                  className="text-[#9CA3AF] text-[20px] cursor-pointer"
                />
              ) : (
                <FaRegEdit
                  onClick={() => setEditAbout(true)}
                  className="text-[#9CA3AF] text-[20px] cursor-pointer"
                />
              )}
            </div>
          </div>

          {editAbout || editName ? (
            <div className="w-full flex justify-center">
              <button className="bg-[#008069] border border-[#222D34] rounded-2xl w-[50%] md:w-[92%] lg:w-[82%] h-[40px] outline-none  mt-5">
                Update
              </button>
            </div>
          ) : (
            ""
          )}
        </form>

        <button
          onClick={Logout}
          className="bg-[#008069] border border-[#222D34] rounded-2xl w-[85%] md:w-[92%] lg:w-[82%] h-[40px] outline-none absolute bottom-5"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;

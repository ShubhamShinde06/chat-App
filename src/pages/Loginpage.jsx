import React, { useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../lib/Firebase";
import { doc, setDoc } from "firebase/firestore";
import Loading from "../components/Loading";
import { CiLock, CiUnlock } from "react-icons/ci";

const Login = () => {
  const [password, setPassword] = useState(true);
  const [currentState, setCurrentState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const handleAvatr = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentState === "Sign Up") {
        const formData = new FormData(e.target);
        const { name, email, password } = Object.fromEntries(formData);

        try {
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );

          await setDoc(doc(db, "users", res.user.uid), {
            id: res.user.uid,
            name: name.toLowerCase(),
            email,
            about: "Hey, There i am using chat app",
            lastSeen: Date.now(),
            blocked: [],
          });
          await setDoc(doc(db, "userchats", res.user.uid), {
            chats: [],
          });

          onAuthStateChanged(auth, (user) => {
            //console.log(user);
            // setToken(user.accessToken);
            // localStorage.setItem("token", user.accessToken);
          });
          toast.success("Account create! You can chat now!");
        } catch (error) {
          console.log(error);
          toast.error(error.code.split("/")[1].split("-").join(" "));
        }
      } else {
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
          await signInWithEmailAndPassword(auth, email, password);

          onAuthStateChanged(auth, (user) => {
            //console.log(user.accessToken);
            // setToken(user.accessToken);
            // localStorage.setItem("token", user.accessToken);
          });

          toast.success(`Welcome back`);
        } catch (error) {
          console.log(error);
          toast.error(error.code.split("/")[1].split("-").join(" "));
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.code.split("/")[1].split("-").join(" "));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[calc(100vh)] bg-[#FCF5EB] overflow-hidden">
      {/* HEADER */}
      <div>
        <Header />
      </div>
      {/* PAGE_CONTENT */}
      <div className=" w-full h-[calc(100vh-80px)] flex justify-center items-center">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center w-[90%] sm:max-w-96 mt-14 gap-4 text-gray-800"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className=" prata-regular text-3xl">{currentState}</p>
            <hr className=" border-none h-[1.5px] w-8 bg-gray-800" />
          </div>
          {currentState === "Login" ? (
            ""
          ) : (
            <>
              <div className="w-[100px] h-[100px] border rounded-full overflow-hidden">
                <label htmlFor="file">
                  <img
                    src={
                      avatar.url ||
                      "https://ik.imagekit.io/0ao6bbymi/profile.jpeg?updatedAt=1735293505376"
                    }
                    alt=""
                  />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  className=""
                  onChange={handleAvatr}
                />
              </div>
              <input
                type="text"
                className="w-full px-3 py-3 border border-gray-800 rounded-full"
                placeholder="Name"
                required
                name="name"
              />
            </>
          )}

          <input
            type="email"
            className="w-full px-3 py-3 border border-gray-800 rounded-full"
            placeholder="Email"
            required
            name="email"
          />
          <div className="w-full px-3 py-3 border bg-[#FFFFFF] border-gray-800 rounded-full flex items-center justify-between">
            <input
              type={password ? "password" : "text"}
              className="flex-1 bg-transparent outline-none border-none"
              placeholder="Password"
              required
              name="password"
            />
            <div className="text-xl cursor-pointer">
              {password ? <CiLock onClick={()=>setPassword(false)} /> : <CiUnlock onClick={()=>setPassword(true)} />}
            </div>
          </div>

          <div className="w-full flex justify-end text-sm mt-[-8px]">
      
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className=" cursor-pointer"
              >
                Create account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className=" cursor-pointer"
              >
                Login here
              </p>
            )}
          </div>
          <button
            className="bg-[#008069] rounded-full text-white font-light px-8 py-2 mt-4 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
          >
            {currentState === "Login" ? (
              loading ? (
                <Loading />
              ) : (
                "Sign in"
              )
            ) : loading ? (
              <Loading />
            ) : (
              "Sign up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

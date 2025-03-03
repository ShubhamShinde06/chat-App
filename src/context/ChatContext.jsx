import { createContext, useEffect, useState } from "react";
import { auth, db } from "../lib/Firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

export const ChatContext = createContext()

const ChatContextProvider = (props) => {

    const [chatopen, setChatOpen] = useState(false)
    const [details, setDetails] = useState(false)

    const [userData, setUserData] = useState(null)
    const [chatsdata, setChatsData] = useState(null)

    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db,'users',uid)
            const userSnap = await getDoc(userRef)
            const userData = userSnap.data()
            setUserData(userData)

            await updateDoc(userRef,{
                lastSeen:Date.now()
            })
            setTimeout(async () => {
                if(auth.chats){
                    await updateDoc(userRef,{
                        lastSeen:Date.now()
                    })
                }
            },60000)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(userData){
            const chatRef = doc(db,'userchats',userData.id)
            const unSub = onSnapshot(chatRef,async (res) =>{
                const chatItems = res.data().chats
                const tempDate = []
                for(const item of chatItems){
                    const userRef = doc(db, 'users', item.rId)
                    const userSnap = await getDoc(userRef)
                    const userData = userSnap.data()
                    tempDate.push({
                        ...item,
                        userData
                    })
                }
                setChatsData(tempDate.sort((a,b)=> b.updatedAt - a.updatedAt))
                return () => {
                    unSub()
                }
            }) 
        }
    },[userData])
    
    const value = {
        chatopen, 
        setChatOpen,
        details, 
        setDetails,
        userData, 
        setUserData,
        chatsdata, 
        setChatsData,
        loadUserData
    }

    return (
        <>
            <ChatContext.Provider value={value}>
                {props.children}
            </ChatContext.Provider>
        </>
    )

}

export default ChatContextProvider
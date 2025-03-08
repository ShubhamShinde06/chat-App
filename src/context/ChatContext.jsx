import { createContext, useEffect, useState } from "react";
import { auth, db } from "../lib/Firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

export const ChatContext = createContext()

const ChatContextProvider = (props) => {

    const [chatopen, setChatOpen] = useState(false)
    const [details, setDetails] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null)
    const [chatsdata, setChatsData] = useState(null)
    const [oppId, setOppId] = useState(null)

    const [messageId, setMessageId] = useState(null)
    const [message, setMessage] = useState([])
    const [chatUser, setChatUser] = useState(null)

    const loadUserData = async (uid) => {
        setIsLoading(true)
        try {
            const userRef = doc(db,'users',uid)
            const userSnap = await getDoc(userRef)
            const userData = userSnap.data()
            setUserData(userData)
            setIsLoading(false)
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
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setIsLoading(true);
        
        if (userData) {
            const chatRef = doc(db, 'chats', userData.id);
            const unSub = onSnapshot(chatRef, async (res) => {
                const chatItems = res.data()?.chatsData || [];
                const tempDate = [];
    
                for (const item of chatItems) {
                    const userRef = doc(db, 'users', item.rId);
                    const userSnap = await getDoc(userRef);
                    const userData = userSnap.data();
                    tempDate.push({
                        ...item,
                        userData
                    });
                }
    
                setChatsData(tempDate.sort((a, b) => b.updatedAt - a.updatedAt));
                setIsLoading(false);
            });
    
            return () => {
                unSub();
                setIsLoading(false); // Cleanup loading state
            };
        } else {
            setIsLoading(false); // If no userData, stop loading
        }
    }, [userData]);
    
    
    const value = {
        chatopen, 
        setChatOpen,
        details, 
        setDetails,
        userData, 
        setUserData,
        chatsdata, 
        setChatsData,
        loadUserData,
        isLoading, 
        setIsLoading,
        user, 
        setUser,

        messageId, 
        setMessageId,
        message, 
        setMessage,
        chatUser, 
        setChatUser,
        oppId, setOppId
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
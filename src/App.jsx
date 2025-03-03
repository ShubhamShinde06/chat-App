import {Routes, Route, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Loginpage'
import Profilepage from './pages/Profilepage'
import Notification from './components/Notification'
import Addusers from './pages/Addusers'
import { useContext, useEffect } from 'react'
import { ChatContext } from './context/ChatContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/Firebase'

export default function App() {

  const { loadUserData} = useContext(ChatContext)

  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if(user) {
        navigate('/')
        await loadUserData(user.uid)
      } else {
        navigate('/login')
      }
    })
  },[])

  return (
    <>
      <div className=' bg-[#262524] w-full h-[calc(100vh)] flex items-center justify-center'>
        {
          // token === ""
          // ?
          // <Login/>
          // :
          <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/profile' element={<Profilepage/>} />
          <Route path='/add' element={<Addusers/>} />
          </Routes>
        }
        <Notification/>
      </div>
    </>
  )
}
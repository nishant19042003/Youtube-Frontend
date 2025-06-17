import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axiosInstance from './Apis/axiosInstance'


function App() {
  // In App.jsx or useAuth hook
    
    useEffect(() => {
      const fetchUser = async () => {
        
        try {
          const res = await axiosInstance.get('/users/profile') // sends cookie or auth token
          
        } catch (err) {
          console.log("User not logged in",err)
        }
      }

      fetchUser()
    }, [])

  return (
    <h1 className='bg-red-500 text-white text-3xl font-bold underline'>
      Hello world!jlfakjsdlkfjlkasjdflkjas;dlj
    </h1>
  )
}

export default App

import React, { Children, useEffect } from 'react'
import Navbar from '../Components/Home/Navbar/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';

const MainView = ({children}) => {
    const navigate = useNavigate()

    // useEffect(() => {
    //     navigate("/root")
    // }, [])
    
  return (
    <div className='flex flex-col h-screen '>
     <div className='w-full h-[65px] min-h-[64px]'>
      <Navbar />
     </div>
      <Outlet />
    </div>
  )
}

export default MainView;

import { useState, useEffect } from "react";
import notAttend from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-NotAttending.png'
import Attend from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-Attending.png'
import maybe from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-maybe.png'
import ToggleButton from './ToggleButton';
import { createEvent, updateEvent, sendEmailInvites } from "../../../../../redux/actionCreators/umeetActionCreator";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const EventShareModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const { umeetReducer } = useSelector(state=>state)

  const handleShare = ()=>{
    umeetReducer.emailSendSuccess = false

    async function processShare(array) {
      for (let i = 0; i < array?.length; i++) {
      
      const object = array[i];
      console.log(object)
      await dispatch(sendEmailInvites({
        "eventname": umeetReducer?.createData?.eventName , 
        "umail" : object }))
      }
    } 

    processShare(umeetReducer.inviteEmailsUI)

    onClose()          
  }

  // useEffect(()=>{    
  //   if(umeetReducer.emailSendSuccess){      
  //     toast.success('Emails sended success!')
  //   }       

  //   return ()=>umeetReducer.emailSendSuccess = false 
  // }, [umeetReducer.emailSendSuccess])

  return (
  <section className='absolut fixed z-20 justify-center items-center top-0 left-0 h-full w-full flex' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
   <div className='w-[86%] md:w-[42%] lg:w-[36%] xl:w-[26%] flex flex-col justify-between p-3 bg-white md:ml-[9%] mt-[4%] rounded-2xl'>
    <div className='text-[18px] text-gray-700 font-bold py-3 border-b flex justify-center items-center text-center'>Choose how you want to share this invitation</div>
    <div className='flex justify-between items-center py-4'>
     <span className='w-5/6 text-[15px] text-gray-600'>Do you want post event on Home Screen</span>
     <span className='w-1/6 pl-1'><ToggleButton /></span>
    </div>
    <div className='flex justify-between items-center py-4'>
     <span className='w-5/6 text-[15px] text-gray-600'>Do you want to Enable share options</span>
     <span className='w-1/6 pl-1'><ToggleButton /></span>
    </div>
    <div className='flex justify-center py-2'>
     <button onClick={handleShare} className='px-10 py-2 my-1 rounded-lg text-white border bg-[#649B8E]'>Confrim</button>
    </div>
   </div>
  </section>
  )
}

export default EventShareModal
import { useState } from "react";
import notAttend from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-NotAttending.png'
import Attend from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-Attending.png'
import maybe from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-maybe.png'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { cancelEvent } from "../../../../../redux/actionCreators/umeetActionCreator";
import { useDispatch, useSelector } from 'react-redux'

const EventDeleteModal = ({ onClose }) => {
  const [eventmessage, setEventmessage] = useState('')

  const dispatch = useDispatch() 
  const { umeetReducer } = useSelector(state=>state)

  const deleteData = {
    "id": umeetReducer.eventDetail ? umeetReducer.eventDetail.id : null,
    "eventstatusmessage": eventmessage
  }  

  console.log(deleteData)
  return (
  <section className='fixed z-20 justify-center items-center top-0 left-0 h-full w-full flex' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
   <div className='w-[86%] md:w-[40%] lg:w-[42%] xl:w-[30%] h-[50%] flex flex-col justify-between p-4 bg-white md:ml-[9%] mt-[4%] rounded-2xl'>
    <div className='flex justify-between border-b py-1 pb-2 text-gray-600'>
        <span className='text-[18px] text-gray-700 font-semibold'>Delete Event</span>
        <AiOutlineCloseCircle onClick={onClose} className='w-8 cursor-pointer hover:text-red-500 h-7'/>
    </div> 
    <textarea onChange={e=>setEventmessage(e.target.value)} rows='7' id='message' name='message' className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder='Tell the reason for that...'/>
    <button onClick={()=>dispatch(cancelEvent(deleteData))}  className='px-5 py-2 rounded-lg font-semibold my-1 text-white border bg-[#649B8E]'>Delete</button>
   </div>
  </section>
  )
}

export default EventDeleteModal
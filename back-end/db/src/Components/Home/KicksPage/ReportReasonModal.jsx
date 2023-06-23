import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { GrNotification } from 'react-icons/gr'

const ReportReasonModal = ({ onClose, reportPost, otherModal }) => {
  return (
    <section className='fixed justify-center items-center top-0 left-0 h-full w-full flex' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      {
        otherModal ?
          <div className='w-[40%] flex flex-col  p-4 bg-white ml-[9%] mt-[4%] rounded-2xl'>
            <textarea name="" id="" cols="30" rows="5" placeholder="Type Something..." className="border-none resize-none outline-0" ></textarea>
            <div class="border-solid border-b-2 border--600">

            </div>
            <div className='flex my-3 m-auto w-[19%]'>
              <button onClick={onClose} className='px-5 bg-[#0ea5e9] text-white border border-[#0ea5e9] py-2 mx-3 rounded-lg BG-[#0ea5e9] border-none'>SEND</button>
            </div>
          </div>
          :
          <div className='w-[40%] flex flex-col  p-4 bg-white ml-[9%] mt-[4%] rounded-2xl'>
            <p className='py-3 text-[18px] font-bold flex justify-center'>Report Post</p>
            <p className='my-3 text-center flex justify-center text-[#0ea5e9] font-bold'>Still Do you want to Report this post?</p>

            <div className='flex my-3'>
              <button onClick={reportPost} className='bg-[#0ea5e9] text-white font-bold border border-[#649b8e] px-5 w-1/2 mx-3 py-2 rounded-lg'>Yes</button>
              <button onClick={onClose} className='px-5 w-1/2 border border-[#0ea5e9] py-2 mx-3 rounded-lg text-[#0ea5e9]'>Cancel</button>
            </div>
          </div>
      }

    </section>
  )
}

export default ReportReasonModal
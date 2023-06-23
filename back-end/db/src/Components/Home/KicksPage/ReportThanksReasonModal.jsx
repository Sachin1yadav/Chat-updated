import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { GrNotification } from 'react-icons/gr'

const ReportThanksReasonModal = ({ onClose, reportPost, otherModal }) => {
  return (
    <section onClick={onClose} className='fixed justify-center items-center top-0 left-0 h-full w-full flex' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>

      <div className='w-[40%] flex flex-col  p-4 bg-white ml-[9%] mt-[4%] rounded-2xl'>
        <p className='py-3 text-[18px] font-bold flex justify-center'>Thankyou for letting us know </p>
        <p className='my-3 text-center flex justify-center text-[black] font-bolder'>Your feedback helps us keeping Uynite Safe.</p>


      </div>


    </section>
  )
}

export default ReportThanksReasonModal
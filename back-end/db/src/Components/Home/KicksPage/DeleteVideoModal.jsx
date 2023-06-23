import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { GrNotification } from 'react-icons/gr'

const DeleteVideoModal = ({ onClose }) => {
  const [count, setCount] = useState(1);

  return (
  <section className='absolut fixed justify-center items-center top-0 left-0 h-full w-full flex' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
   <div className='w-[25%] flex flex-col  p-4 bg-white ml-[9%] mt-[4%] rounded-2xl'> 

    <p className='py-2 text-[17px] text-center flex justify-center'>Are you sure want to delete this post?</p>

    <div className='flex'>
     <button className='bg-[#649b8e] text-white font-bold border border-[#649b8e] px-5 w-1/2 mx-3 py-2 rounded-lg'>Delete</button>
     <button onClick={onClose} className='px-5 w-1/2 border border-[#649b8e] py-2 mx-3 rounded-lg'>Cancel</button>    
    </div>

   </div>
  </section>
  )
}

export default DeleteVideoModal
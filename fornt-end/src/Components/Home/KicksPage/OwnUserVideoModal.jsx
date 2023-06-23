import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { GrNotification } from 'react-icons/gr'
import { MdOutlineBookmarks } from 'react-icons/md'

const OwnUserVideoModal = ({ onClose, handleEdit, handleDelete, handleCollection }) => {
  const [count, setCount] = useState(1);

  return (
    <section className='absolut fixed justify-center items-center top-0 left-0 h-full w-full flex' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className='w-[20%] flex flex-col  p-4 bg-white ml-[9%] mt-[4%] rounded-2xl'>
        <div className='flex justify-between border-b py-1 pb-2 text-gray-600'>
          <span className='text-[18px] text-gray-700'>Select a Group</span>
          <AiOutlineCloseCircle onClick={onClose} className='w-8 cursor-pointer hover:text-red-500 h-7' />
        </div>

        <section className='my-2'>
          <div onClick={handleEdit} className='flex py-3 cursor-pointer border-b hover:bg-blue-50'>
            <AiOutlineEdit className='w-7 h-7' />
            <span className='ml-3'>Edit</span>
          </div>
          <div onClick={handleDelete} className='flex py-3 cursor-pointer border-b hover:bg-blue-50'>
            <AiOutlineDelete className='w-7 h-7' />
            <span className='ml-3'>Delete</span>
          </div>
          <div className='flex py-3 cursor-pointer hover:bg-blue-50'>
            <GrNotification className='w-7 h-7 p-0.5' />
            <span className='ml-3'>Mute Notification</span>
          </div>
          <div onClick={handleCollection} className='flex py-3 cursor-pointer hover:bg-blue-50'>
            <MdOutlineBookmarks className='w-7 h-7' />
            <span className='ml-3'>Saved Collections</span>
          </div>
        </section>
      </div>
    </section>
  )
}

export default OwnUserVideoModal
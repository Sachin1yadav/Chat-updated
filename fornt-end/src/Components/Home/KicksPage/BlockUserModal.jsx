import { useState } from "react";
import { FaUserSlash } from 'react-icons/fa'

const BlockUserModal = ({ onClose, handleBlock }) => {
  return (
    <section className='fixed justify-center items-center top-0 left-0 h-full w-full flex' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className='w-[90%] md:w-[25%] flex flex-col   bg-white  mt-[4%]'>

        <p className='py-2 text-[17px] border-b font-medium text-center flex justify-center'>Are you sure to Block?</p>
        <div className='flex w-full my-3 justify-center items-center'>
          <FaUserSlash className='w-11 h-11 text-gray-800' />
        </div>

        <div className='font-medium text-start px-4'>
          <p className='my-2'> If you are friends, will be Un-friended</p>
          <p className='my-2'> If you are friends, whe/she can't send you requests</p>
          <p className='my-2'> You can't send invitations in U-Meet</p>
          <p className='my-2'> Your profile & posts will not be shown to him/her</p>
        </div>

        <div className='flex px-0'>
          <button onClick={handleBlock} className='bg-[#dd8e58] text-white font-bold border border-[#dd8e58] px-5 w-1/2 py-2'>Block</button>
          <button onClick={onClose} className='px-5 w-1/2 border border-[black] py-2  '>Cancel</button>
        </div>

      </div>
    </section>
  )
}

export default BlockUserModal
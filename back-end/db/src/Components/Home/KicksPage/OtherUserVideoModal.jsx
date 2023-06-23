import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import { FaUserSlash } from 'react-icons/fa'
import BlockUserModal from './BlockUserModal'
import ReportModal from './ReportModal'

const OtherUserVideoModal = ({ onClose, handleBlock }) => {
  const [blockUserModal, setBlockUserModal] = useState(false)
  const [reportModal, setReportModal] = useState(false)

  return (
    <section className=' text-gray-700 fixed text-center z-40 items-center justify-center top-0 left-0 h-full w-full flex' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className='w-[60%] md:w-[30%] flex flex-col  p-4 bg-white rounded-2xl'>
        <div className='flex justify-between border-b py-1 pb-2 text-gray-600'>
          <span className='text-[18px] text-gray-700'>Choose</span>
          <AiOutlineCloseCircle onClick={onClose} className='w-8 cursor-pointer hover:text-red-500 h-7' />
        </div>

        <section className='my-2'>
          <div onClick={() => setReportModal(true)} className='flex py-3 cursor-pointer border-b hover:bg-blue-50'>
            <AiOutlineInfoCircle className='w-7 h-7' />
            <span className='ml-3'>Report</span>
          </div>
          <div onClick={() => setBlockUserModal(true)} className='flex py-3 cursor-pointer hover:bg-blue-50'>
            <FaUserSlash className='w-7 h-7' />
            <span className='ml-3'>Block</span>
          </div>
        </section>
      </div>
      {blockUserModal && <BlockUserModal handleBlock={handleBlock} onClose={() => setBlockUserModal(false)} />}
      {reportModal && <ReportModal onClose={() => setReportModal(false)} />}
    </section>
  )
}

export default OtherUserVideoModal
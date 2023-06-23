import { useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'
import Dropdown from '../../Login/Content/Modal/Dropdown';

export default function SelectDropdown() {
  const [show, setShow] = useState(false)

  return (    
      <div>
        {/* <div className='relative flex hover:bg-gray-100 items-center text-[14px] justify-between text-gray-600 border rounded px-2 w-[150px] bg-gray-50 py-2' onClick={()=>setShow(!show)}>Select 
          <AiOutlineCaretDown className='ml-5 text-gray-300'/>
        </div>
        {
          show ? (
            <div className='absolute top-[121px] text-gray-700 flex flex-col bg-white z-10 rounded border-[1px] border-gray-200'>
             <span className='py-1.5 px-4 hover:bg-[#8ea1c4] hover:text-white cursor-pointer'>Friends</span>
             <span className='py-1.5 px-4 hover:bg-[#8ea1c4] hover:text-white cursor-pointer'>Create New Group</span>
             <span className='py-1.5 px-4 hover:bg-[#8ea1c4] hover:text-white cursor-pointer'>Relative</span>
             <span className='py-1.5 px-4 hover:bg-[#8ea1c4] hover:text-white cursor-pointer'>Classmates</span>
             <span className='py-1.5 px-4 hover:bg-[#8ea1c4] hover:text-white cursor-pointer'>Officemates</span>
             <span className='py-1.5 px-4 hover:bg-[#8ea1c4] hover:text-white cursor-pointer'>Party</span>
             <span className='py-1.5 px-4 hover:bg-[#8ea1c4] hover:text-white cursor-pointer'>Organization</span>
            </div>
          ) : null
        } */}
      <Dropdown
        style={'w-full'}
      />
        
      </div>
  );
}
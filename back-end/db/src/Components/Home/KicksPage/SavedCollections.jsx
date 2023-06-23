import video from '../../../Assets/Videos/v2.mp4';
import { AiOutlineCloseCircle, AiOutlinePlayCircle } from 'react-icons/ai'
import './kicks.css'

export default function SavedCollections({ onClose }){
	return (
	<section className='fixed justify-center items-center top-8 z-30 left-0 h-full w-full flex' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
    <div className='w-[42%] h-[88%] bg-white p-2 hideScroll overflow-y-scroll rounded-lg'>
    <div className='flex justify-between border-b mb-2 mt-1 py-1 text-gray-600'>
      <span className='text-[19px] text-[#649b8e] font-semibold flex justify-center w-11/12'>Saved Collections</span>
      <span className='w-1/12'>
       <AiOutlineCloseCircle onClick={onClose} className='w-8 cursor-pointer hover:text-red-500 h-7'/>
      </span>
    </div>
	<div className='grid grid-cols-3 gap-3'>
        {[1,2,34,5,3,4,5,5,6,8,3,3,3,3].map((elem)=>(
          <div className="cursor-pointer h-[160px] rounded-lg relative overflow-hidden">
            {/* <img src="./images/events.jpg" alt="" className="rounded-md object-cover h-[160px]"/> */}
          <video style={{ width: '100%', height: '100%', objectFit: 'cover' }} className=''>
            <source src={video} type="video/mp4" />
          </video>
          <AiOutlinePlayCircle className='absolute left-[42%] text-white w-8 h-8 top-[40%]'/>
          <span className='absolute bottom-[2%] text-[11px] right-[4%] text-white font-semibold'>02:00</span>
          </div>
        ))} 
    </div>  
    </div>
    </section>
    )
} 
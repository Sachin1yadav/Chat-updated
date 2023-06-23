import { AiOutlineCloseCircle } from "react-icons/ai";
import navigation from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet navigation.png'

export default function PreviewEvent({ onClose, selectedSpecificEvent,
 selectedImage, formState, profileReducer, eventMode, inputValue}){
 return (
  <section className='absolut z-20 fixed top-0 left-0 h-full w-full flex justify-center items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
    <div className="w-[96%] md:w-[55%] lg:w-[40%] xl:w-[37%] h-[96%] bg-white rounded-xl p-3">
        <div className="flex border-b pb-2 justify-between py-1">
          <div className='text-xl font-medium w-full flex justify-center'>{formState.eventName}</div>
          <span className="w-1/12">
            <AiOutlineCloseCircle
              onClick={onClose}
              className="w-8 text-gray-600 cursor-pointer hover:text-red-500 h-7"
            />
          </span>
        </div>

        <section className='mt-1 h-[92%] overflow-y-scroll'>
         <img src={selectedImage} alt="Selected" className='w-full h-[300px] rounded-xl object-cover' />
         <div className='flex my-3'>
	        <span className='w-1/3'>Hostedt BY</span>
	        <span className='w-2/3'>:<span className='ml-3 font-semibold'>{profileReducer.profile.fname}</span></span>
	      </div>
	      <div className={`flex mb-3`}>
	        <span className='w-1/3'>Mobile No</span>
	        <span className='w-2/3'>:<span className='ml-3 font-bold'>{formState.eventHostPhnNumber}</span></span>
	      </div>

	       {(eventMode == 'online') && (
	       <div className={`flex mb-3`}>
	        <div className='w-1/3'>Online</div>
	        <div className='w-2/3 flex text-[#649B8E]'>:<div className='ml-3 font-bold cursor-pointer'>{formState.eventAddress}</div></div>        
	       </div>
	       )}
	       {(eventMode == 'location') && (
	       <div className={`flex mb-3`}>
	        <div className='w-1/3'>Location</div>
	        <div className='w-2/3 flex'>:<div className='ml-3 font-bold'>{formState.eventAddress}</div><img src={navigation} className='w-8 h-8 cursor-pointer' /></div>        
	       </div>
	       )}

	       <div className='flex mb-3'>        
	        <span className='w-1/3'>Start Date & Time</span>
	        <div className='flex flex-col w-2/3'>
	         <div className=''>:<span className='ml-3 font-bold'>{formState.eventdateAndTime}</span></div>
	        </div>        
	       </div>
	       <div className='flex mb-3'>        
	        <span className='w-1/3'>End Date & Time</span>
	        <div className='flex flex-col w-2/3'>
	         <span className=''>:<span className='ml-3 font-bold'>{formState.eventdateAndTime}</span></span>
	        </div>        
	       </div>

	       <div className='flex pb-4'>
	        <span className='w-1/3'>About</span>
	        <span className='w-2/3'>:<span className='ml-3 font-bold'>{inputValue}</span></span>
	       </div>
 
        </section>
    </div>
  </section> 
 )
}
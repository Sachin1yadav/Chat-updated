import wishes from '../../../../Assets/Images/Umeet/wishesTemplate.webp'

export default function CreatedEvent({ myEvent, handleDeleteEvent, handleEditMyEvent, handleShareEvent }){
    return (
     <div className='p-4 bg-white rounded-xl w-[60%]'>
      <div className='mb-1 flex justify-center'>
       <span className='font-bold text-gray-600'>Evevnt Title</span>
      </div>
      <div className='flex py-3 my-2'>
       <img src={wishes} className='h-[300px] w-full object-cover' />
      </div>

      <div className=''>
       <div className='flex mb-3'>
        <span className='w-1/3'>Hostedt BY</span>
        <span className='w-2/3'>:<span className='ml-3 font-semibold'>Ravichandra Ashwin</span></span>
       </div>
       <div className='flex mb-3'>
        <span className='w-1/3'>Mobile No</span>
        <span className='w-2/3'>:<span className='ml-3 font-bold'>+1 8146369384</span></span>
       </div>
       <div className='flex mb-3'>
        <span className='w-1/3'>Food Availability</span>
        <span className='w-2/3'>:<span className='ml-3 font-bold'>Yes</span></span>
       </div>
       <div className='flex mb-3'>
        <span className='w-1/3'>Event Live Stream</span>
        <span className='w-2/3'>:<span className='ml-3 font-bold'>Yes</span></span>
       </div>
       <div className='flex mb-3'>
        <div className='w-1/3'>Location</div>
        <div className='w-2/3 flex'>:<div className='ml-3 font-bold'>168, Addrss Living, South Africa - 626987</div></div>
       </div>
       <div className='flex mb-3'>
        <span className='w-1/3'>Date & Time</span>
        <span className='w-2/3'>:<span className='ml-3 font-bold'>06:00 pm - 12.00 pm, 28th Apr 2023</span></span>
       </div>
       <div className='flex pb-4 border-b-2 border-gray-300'>
        <span className='w-1/3'>About</span>
        <span className='w-2/3'>:<span className='ml-3 font-bold'>Go like a fire</span></span>
       </div>
      </div>
      
      <div className='flex flex-col justify-end items-end py-2 pb-12'>
       {
        myEvent && (
        <>
         <button onClick={handleEditMyEvent} className='py-1 w-40 my-1.5 px-4 rounded text-[#649B8E] border border-[#649B8E]'>Edit Details</button>
         <button onClick={handleDeleteEvent} className='py-1 w-40 my-1.5 px-4 rounded text-[#649B8E] border border-[#649B8E]'>Delete Event</button>
        </>
        )
      }
       <button onClick={handleShareEvent} className='py-1 w-40 my-1.5 px-4 rounded text-[#649B8E] border border-[#649B8E]'>Share Invitation</button>
      </div>

     </div>
    )
}
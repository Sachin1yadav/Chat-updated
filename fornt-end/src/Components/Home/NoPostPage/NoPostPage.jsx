import React from 'react'

const NoPostPage = () => {
  return (
    <div className='w-[95%]  sm:w-[50%] lg:w-[40%] bg-[#C8C8C8] mx-auto px-4 flex flex-col items-center py-2 mb-2 h-[50%] justify-center rounded-lg'>
        <div className='w-[50%] sm:w-[40%] lg:w-[40%] bg-[#4B4B4B] font-bold text-sm py-2 text-white text-center rounded-lg my-4'>
            No Post 
        </div>
        <div className='w-full text-center'>Hay!</div>
        <div className='text-center'>Follow, Send friend requests and make relation with your friends to get more posts</div>
    </div>
  )
}

export default NoPostPage;

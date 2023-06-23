import React from 'react'

const PrivatePage = () => {
  return (
    <div className='w-full h-[300px] flex flex-col items-center justify-center bg-[url("./images/hide.png")] '>
      <h1 className='font-bold text-2xl text-red-500'>This account is Private</h1>
      <p className='font-bold text-3xl text-red-500'>Profile view is hidden by Username</p>
    </div>
  )
}

export default PrivatePage;

import React from 'react'
import PasswordInput from '../Login/Content/InputBox/PasswordInput';

const CreatenewPassword = () => {
  return (
    <div className="flex justify-around flex-col gap-2">
      <PasswordInput title="Enter New Password"/>
      <PasswordInput title="Re-Enter New Password"/>
      <div className="flex text-white justify-evenly w-full">
        <button className="bg-blue-400 w-[35%] py-2 rounded-xl text-xs font-bold">
          Save
        </button>
        <button
          className="border-2 border-blue-400 text-blue-400 w-[40%] py-2 rounded-xl text-xs font-bold"
        //   onClick={() => setDeactivateModal(false)}
        >
          Cancel
        </button>
      </div>
  </div>
  )
}

export default CreatenewPassword;

import { Typography } from '@material-tailwind/react';
import React from 'react'

const ConfirmationModal = ({title, button, handleAccept, closeModal, message}) => {
  return (
    <div
      className=" sm:w-[40%] lg:w-[30%] xl:w-[25%] bg-white flex flex-col rounded-lg  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <h1 className="text-center my-2 font-bold text-sm">{title}</h1>
      <hr />
      <div className="py-6 px-3">
      {
        message ? 
        <Typography>{message}</Typography>
        :
        <Typography>Are you sure to cancel this request?</Typography>
      }
      </div>
      <div className="border-2 text-gray-500 w-full flex justify-center rounded-b-lg">
        <button
          className="bg-[#05b7fd] text-white border-[1px] border-gray-500 w-[50%] rounded-bl-lg text-sm font-semibold py-1"
          onClick={handleAccept}
        >
          {button}
        </button>
        <button
          className="text-[#05b7fd] border-[1px] border-gray-500  w-[50%] rounded-br-lg text-sm font-semibold py-1"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal
import React from 'react'

const RejectionModal = ({onCloseModal,onResubmit}) => {
  return (
    <div
      className="bg-white w-[90%] sm:w-[40%] lg:w-[38%] h-[20%] px-4 flex flex-col justify-evenly  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <h1 className="font-bold">Verification</h1>
      <p className="text-[10px] sm:text-xs lg:text-sm">
        Your verification is rejected. Please re submit with proper details.
      </p>
      <div className="flex justify-end gap-2 pr-2 font-bold text-blue-400">
        <button className="text-xs" onClick={onCloseModal}>
          Cancel
        </button>
        <button className="text-xs" onClick={onResubmit}>
          Re-submit
        </button>
      </div>
    </div>
  );
}

export default RejectionModal;

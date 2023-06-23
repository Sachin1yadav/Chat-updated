import React from 'react'

const UnfriendModal = ({closeModalOption, handleUnfriend}) => {
    return (
      <div
        className="w-[80%] sm:w-[40%] lg:w-[30%] xl:w-[28%] bg-white flex flex-col  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50 rounded-lg"
      >
        <h1 className="text-center my-3 font-bold text-sm">
          Are you sure to Unfriend ?
        </h1>
        <hr />
        <div className="w-full py-6 flex justify-center">
          <img src="./images/unfriend.png" alt="" />
        </div>

        <div className="border-2 text-gray-500 w-full flex justify-center rounded-b-lg">
          <button
            className="bg-[#05b7fd] text-white border-[1px] border-gray-500 w-[50%] rounded-bl-lg text-sm font-semibold py-1"
            onClick={handleUnfriend}
          >
            Unfriend
          </button>
          <button
            className="text-[#05b7fd] border-[1px] border-gray-500  w-[50%] rounded-br-lg text-sm font-semibold py-1"
            onClick={closeModalOption}
          >
            Cancel
          </button>
        </div>
      </div>
    );
}

export default UnfriendModal;

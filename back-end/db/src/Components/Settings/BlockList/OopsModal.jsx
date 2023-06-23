import React from "react";

const OopsModal = ({ onOkClick }) => {
  return (
    <div
      className="w-[90%] sm:w-[50%] lg:w-[35%] h-[45%] lg:h-[50%] bg-white flex flex-col justify-center rounded-lg  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <img
          src="./images/events.jpg"
          alt=""
          className="w-[100px] h-[80px] rounded-md"
        />
        <h1 className="font-bold">Oops !</h1>
        <p className="text-center text-[10px] sm:text-xs xl:text-sm">
          Unblock this user from settings, to view this Profile
        </p>
        <button
          className="bg-blue-400 py-1 lg:py-2 w-[50%] sm:w-[70%] font-bold text-white rounded-md text-[8px] sm:text-[10px] lg:text-sm"
          onClick={onOkClick}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default OopsModal;

import React from "react";

const ThankuModal = () => {
  return (
    <div className="w-full h-full absolute">
      <div className="flex flex-col justify-center items-center w-[20%] bg-white gap-1 rounded-xl border-[1px] border-gray-500">
        <img src="./images/events.jpg" alt="" className="w-[30%] mt-5" />
        <h1 className="font-bold text-sm">Thank you for letting us know</h1>
        <p className="text-[10px] text-gray-500 w-[60%] mb-4 text-center">
          Your feedback helps us keeping Uynite Safe.
        </p>
      </div>
    </div>
  );
};

export default ThankuModal;

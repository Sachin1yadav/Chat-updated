import React from "react";

const UnionRequestNotification = ({ title }) => {
  return (
    <>
      <div className="flex h-[40px] w-full">
        <div className="">
          <img
            src="./images/events.jpg"
            alt=""
            className="w-[40px] h-[40px] rounded-full"
          />
        </div>
        <div className=" flex flex-1 flex-col justify-center ml-2">
          <div className="text-[11px] sm:text-[12px]">
            <span className="font-bold text-blue-400 text-xs sm:text-sm">Abhi </span>
            {title}
          </div>
          <div className="text-[9px] sm:text-[10px]">May 02 2023, 10:34 PM</div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#666567]"></div>
    </>
  );
};

export default UnionRequestNotification;

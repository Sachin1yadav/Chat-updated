import React from "react";

const OtherReport = () => {
  return (
    <div className="w-[30%] h-[40%] bg-white rounded-lg flex flex-col items-center justify-around px-4">
      <textarea name="" id="" cols="52" rows="8" className="text-sm pl-4 pt-4 outline-none" placeholder="Type something...">
        hwlloo
      </textarea>
      <div className="w-full bg-gray-500 h-[2px] "></div>
      <button
        className={`w-[30%] text-white font-bold py-2 text-xs rounded-lg bg-[#7991BD]`}
      >
        Send
      </button>
    </div>
  );
};

export default OtherReport;

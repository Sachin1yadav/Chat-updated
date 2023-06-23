import React from "react";
import textLogo from "../Login/Content/Login/./textLogo.png";
const Topbar = () => {
  return (
    <div className="w-[100vw] sm:w-[50vw] h-[90px] flex flex-col items-center justify-end px-4 gap-1">
      <img src={textLogo} alt="" className="w-[40%] sm:w-[20%] mb-2" />

      {/* font weight changed into bold to semi-bold & padding added */}

      <p className="w-[90%] font-semibold text-center md:text-sm text-[10px] text-[#6F6F6F]">
        Connecting back to your personal world.
      </p>
    </div>
  );
};

export default Topbar;

import React from "react";
import Icon from "../../Assets/Images/Logo.png";

const Loader = () => {
  return (
    <div className="flex ring-1 items-center justify-center absolute inset-0 h-full  bg-gray-300 opacity-50">
      <div className="opacity-100">
        <img className="w-full" src={Icon} />
      </div>
    </div>
  );
};

export default Loader;

import React from "react";
import { Link } from "react-router-dom";

const Button1 = ({ title, onClick, path, disabled }) => {
  return (
    <div className={`w-full flex justify-center`}>
      <button
        className={`${
          !disabled
            ? "text-black cursor-pointer bg-opacity-[100%] "
            : "text-[#7E8082] bg-opacity-[65%] cursor-default"
        } w-[70%] my-0.5 rounded-3xl py-2 font-bold text-xs border-none bg-[#48B2DB]`}
        onClick={onClick}
        disabled={disabled}
      >
        <Link
          to={path}
          className={`${!disabled ? "cursor-pointer" : "cursor-default"}`}
        >
          {title}
        </Link>
      </button>
    </div>
  );
};

export default Button1;

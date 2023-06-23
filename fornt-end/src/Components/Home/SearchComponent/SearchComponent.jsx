import React, { useState } from "react";
import { CgSmileMouthOpen } from "react-icons/cg";

const SearchComponent = ({
  bgColor,
  width,
  placeholder,
  classes,
  icon,
  handleChange,
  inputValue,
}) => {

  return (
    <div
      className={`w-full h-[58px] flex items-center justify-center rounded-xl`}
    >
      <div
        className={`${classes} w-full flex rounded-md justify-between items-center `}
        style={{ backgroundColor: bgColor, width: `${width}%` }}
      >
        <input
          value={inputValue}
          onChange={handleChange}
          type="text"
          placeholder={placeholder}
          className={` w-full rounded-md pl-3 py-2 outline-none bg-[${bgColor}]`}
          style={{ backgroundColor: bgColor }}
        />
        <span className="mr-2">
          {icon ? (
            <CgSmileMouthOpen className="cursor-pointer" size={28} />
          ) : (
            <img
              src="./images/Search.png"
              alt=""
              className="cursor-pointer w-[22px]"
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default SearchComponent;



import React, { useState } from "react";

const DropdownOptions = ({elem,radioBtn,setRadioBtn, handleCheckBtn}) => {
  
 
  return (
    <div className=" w-full px-4 py-2">
      <label htmlFor="" className="text-xs py-1 flex gap-1 font-bold">
        <input
          type="radio"
          name={elem?.title}
          id=""
          className="cursor-pointer"
          checked={radioBtn === elem?.title}
          onChange={()=>{
            handleCheckBtn(elem?.title)
            setRadioBtn(elem?.title);
          }}
        />
        {elem?.title}
      </label>
      <p className="text-[10px] text-gray-600 w-full px-4">
        {elem?.description}
      </p>
      <div className="w-[70%] h-[1px] bg-gray-500 mt-1"></div>
    </div>
  );
};

export default DropdownOptions;

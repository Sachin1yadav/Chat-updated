import React from "react";

const Button2 = ({ title, onClick, disabled, id,width }) => {
  return (
    <div className={`w-full flex justify-center `}>
      <button
        id={id}
        type="button"
        className={`${
          disabled
            ? "bg-opacity-[65%] text-[#7E8082] "
            : "bg-opacity-[100%] text-[black] "
        }  ${
          width ? `w-[${width}]` : "w-[70%]"
        } rounded-3xl py-2 font-bold text-xs bg-[#48B2DB]`}
        disabled={disabled}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default Button2;

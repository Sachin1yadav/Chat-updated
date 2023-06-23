import React from "react";

const Input = ({
  id,
  title,
  errorMessage,
  inputValue,
  onHandleChange,
  name,
  touched,
  onBlur,
  disabled,
  type,
  borderColor,
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* heigth of input changed & color of border changed
          margin added to input */}
      <input
        id={id}
        type={type ? type : "text"}
        name={name}
        placeholder={title}
        value={inputValue}
        className={`outline-none border-[1px] border-[#7E8082] rounded-[5px] w-full text-xs text-[#AEB2B1] !p-2 font-semibold`}
        onChange={onHandleChange}
        onBlur={onBlur}
        disabled={disabled}
        autocomplete="off"
      />
      {touched && errorMessage ? (
        <p className="text-[10px] text-[red] self-start mt-1 w-[80%] ">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

export default Input;

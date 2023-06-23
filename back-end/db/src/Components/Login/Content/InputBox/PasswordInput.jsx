import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import showPasswordIcon from "../../../../Assets/Images/showPassword.png";
import hidePasswordIcon from "../../../../Assets/Images/hidePassword.png";

const PasswordInput = ({
  title,
  errorMessage,
  inputValue,
  name,
  onBlur,
  touched,
  onHandleChange,
  disabled,
}) => {
  const [passwordType, setPasswordType] = useState("password");

  const onShowHidePassword = (event) => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <div className=" flex w-full items-center border-[1px] border-[#7E8082] rounded-[5px] text-[#AEB2B1]">
        {/* heigth of input changed */}
        <input
          type={passwordType}
          placeholder={title}
          name={name}
          value={inputValue}
          onBlur={onBlur}
          className="outline-none w-[90%] h-[34px] text-xs font-semibold border-none rounded-[5px] !p-2"
          onChange={onHandleChange}
          disabled={disabled}
        />

        {/* the color of icon changed */}

        {passwordType !== "password" ? (
          <img
            src={showPasswordIcon}
            alt=""
            className="w-[20px] h-[20px] mr-2"
            onClick={onShowHidePassword}
          />
        ) : (
          <img
            src={hidePasswordIcon}
            alt=""
            className="w-[20px] h-[20px] mr-2"
            onClick={onShowHidePassword}
          />
        )}
      </div>

      {touched && errorMessage ? (
        <p className="text-[10px] text-[red] self-start mt-1 w-[80%] ">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

export default PasswordInput;

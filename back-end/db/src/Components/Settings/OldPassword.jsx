import React, { useState } from "react";
import PasswordInput from "../Login/Content/InputBox/PasswordInput";

const OldPassword = ({OldPasswordChange, handlePasswordSave}) => {
  const [state, setState] = useState({})
  const { oldPassword, newPassword, confirmPassword} = state;
  const onHandleChange = (e) => {
    const { name, value} = e.target;
    setState({...state, [name]: value})
  }
  return (
    <div>
      <div className="flex mb-2">
        <div className="w-[90%]">
          <div className="text-xs">Old Password</div>
          <PasswordInput onHandleChange={onHandleChange} inputValue={oldPassword} name={'oldPassword'} />
        </div>
      </div>
      <div className="flex mb-2">
        <div className="w-[90%]">
          <div className="text-xs">New Password</div>
          <PasswordInput onHandleChange={onHandleChange} inputValue={newPassword} name={'newPassword'} />
        </div>
      </div>
      <div className="flex">
        <div className="w-[90%]">
          <div className="text-xs">Confirm New Password</div>
          <PasswordInput onHandleChange={onHandleChange} inputValue={confirmPassword} name={'confirmPassword'} />
        </div>
      </div>

      <button onClick={() => handlePasswordSave(state)} className="bg-blue-400 w-[80px] h-[35px] rounded-2xl text-white text-sm font-bold my-3">
        Save
      </button>
    </div>
  );
};

export default OldPassword;

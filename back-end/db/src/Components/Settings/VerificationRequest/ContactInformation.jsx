import React from "react";
import DropdownOptions from "./DropdownOptions";

const ContactInformation = ({ dataList, handleCheckBtn, handleClickSave }) => {
  return (
    <div
      className="w-full flex flex-col items-center"
      style={
        {
          // display: showDropDownList.contactInformation ? "block" : "none",
        }
      }
    >
      <div className=" w-full flex flex-col items-center px-2 gap-1">
        <h1 className="text-sm font-bold w-full">Note:</h1>
        <p className="text-xs w-[85%]">Public - Visible to Everyone</p>
        <p className="text-xs w-[85%]">Friends - Visible to all your Friends</p>
        <p className="text-xs w-[85%]">None - Only you</p>
      </div>
      {dataList.map((elem) => (
      <DropdownOptions key={elem?.name} elem={elem} handleCheckBtn={(optionValue) =>handleCheckBtn(optionValue, elem?.name)}/>
      ))}
      <button onClick={handleClickSave} className="bg-blue-400 w-[80px] h-[35px] rounded-2xl text-white text-sm font-bold  my-3">
        Save
      </button>
    </div>
  );
};

export default ContactInformation;

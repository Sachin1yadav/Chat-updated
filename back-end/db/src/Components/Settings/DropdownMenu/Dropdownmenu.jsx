import React, { useState } from "react";
import DropdownOptions from "./DropdownOptions";

const Dropdownmenu = ( { handleCheckBtn, type, handleClickSave }) => {
  const [radioBtn,setRadioBtn] = useState(null)
  const data = [
    { title: "Public", description: "Everyone who are registered with Uynite" },
    { title: "Friends", description: "All your friends connected in Uynite" },
    { title: "None", description: "Only you" },
  ];
  return (
    <>
      {data?.map((elem) => (
       <DropdownOptions elem={elem} key={elem?.title} handleCheckBtn= {(optionValue) => handleCheckBtn(optionValue, type)} setRadioBtn={setRadioBtn} radioBtn={radioBtn}/>
      ))}
      <button onClick={handleClickSave} className="bg-blue-400 w-[80px] h-[35px] rounded-2xl text-white text-sm font-bold my-3">
        Save
      </button>
    </>
  );
};

export default Dropdownmenu;

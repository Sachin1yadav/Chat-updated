import React from "react";
import dataList from "./data";


const BlockModal = ({closeModalOption, handleBlock}) => {
  return (
    <div
      className="w-[80%] sm:w-[40%] lg:w-[30%] xl:w-[25%] bg-white flex flex-col rounded-lg  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <h1 className="text-center my-4 font-bold text-sm">
        Are you sure to Block ?
      </h1>
      <hr />
      <div className="w-full px-3 flex justify-center flex-col items-center my-2 py-4">
        <img src="./images/blockConfirmation.png" alt="" className="w-[50px]" />
        <div className="flex flex-col gap-2 w-full">
          {dataList?.map((elem) => (
            <p className="font-semibold text-[10px]">{elem?.title}</p>
          ))}
        </div>
      </div>

      <div className="border-2 text-gray-500 w-full flex justify-center rounded-b-lg">
        <button
          onClick={handleBlock}
          className="bg-[#7991BD] text-white border-[1px] border-gray-500 w-[50%] rounded-bl-lg text-sm font-semibold py-1"
        >
          Block
        </button>
        <button
          className="text-[#7991BD] border-[1px] border-gray-500  w-[50%] rounded-br-lg text-sm font-semibold py-1"
          onClick={closeModalOption}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BlockModal;

import React from "react";
import dataList from "./data";
const ShareWithModal = ({
  handleCloseModal,
  setShowShareModal,
  showShareModal,
}) => {
  return (
    <div
      className="w-[90%] sm:w-[50%] py-2 lg:w-[25%] xl:h-[55%] bg-white rounded-xl  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <h1 className="font-bold text-sm py-2 text-center">Share With...</h1>
      <hr />
      <section className="flex flex-col px-4 gap-2 mt-2 h-[238px] overflow-y-scroll">
        {dataList?.map((elem) => (
          <>
            <div className="flex gap-2">
              <input type="radio" name="" id="" />
              <span className="text-xs font-bold">{elem?.name}</span>
            </div>
            <hr />
          </>
        ))}
      </section>
      <hr />
      <div className="flex justify-evenly h-[30px] mt-2">
        <button className="bg-[#6780AF] text-[10px] font-bold text-white px-8 rounded-md">
          Share now
        </button>
        <button
          className="border-[1.5px] border-[#6780AF] font-bold text-[10px] text-[#6780AF] px-8 rounded-md"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShareWithModal;

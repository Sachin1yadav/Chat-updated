import React from "react";

const UnionUpdateModal = ({ unionName, handleInputChange, updateUnion, handleCloseModal }) => {
  return (
    <div
      className="w-[30%] rounded-xl bg-white p-10 px-8  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <div className="flex gap-2 w-full">
        <img
          src="./images/events.jpg"
          alt=""
          className="w-[50px] h-[50px] mb-6"
        />
        <div className="flex-col flex ">
          <input
            className="text-sm font-bold outline-none w-full"
            value={unionName}
            onChange={handleInputChange}
          />
          <div className="bg-gray-600 w-[90%] h-[1px]"></div>
        </div>
      </div>
      <div className="flex justify-center gap-5 w-full">
        <button
          onClick={updateUnion}
          className="w-[35%] bg-blue-400 text-white font-bold py-1 text-xs rounded-lg"
        >
          Update
        </button>
        <button
          onClick={handleCloseModal}
          className="w-[35%] text-gray-800 bg-white border-[1px] font-bold py-1 text-xs rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UnionUpdateModal;

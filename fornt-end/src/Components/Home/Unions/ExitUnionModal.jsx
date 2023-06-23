import React from "react";

const ExitUnionModal = ({ onCloseModal, exitUnion }) => {
  return (
    <div
      className="w-[40%] flex flex-col justify-center gap-3 p-2 rounded-xl items-center bg-white  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <h1 className="font-bold text-sm text-center w-[90%]">
        Are you sure you want to Exist the union?
      </h1>
      <div className="w-full h-[2px] bg-gray-500"></div>
      <p className="text-sm text-center w-[90%]">
        Once Exit from Group, all members and group posts will be Delete
      </p>
      <div className="w-full flex justify-center gap-4">
        <button
          onClick={exitUnion}
          className="text-white text-xs py-2 font-bold bg-blue-500 rounded-lg w-[40%]"
        >
          Exit
        </button>
        <button
          className="text-xs font-bold py-2 text-blue-500 border-2 w-[40%] rounded-lg"
          onClick={onCloseModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ExitUnionModal;

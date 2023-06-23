import React from "react";

const DeactivateAccountModal = ({ setDeactivateModal }) => {
  return (
    <div
      className="w-[95%] sm:w-[50%] lg:w-[45%] bg-white border-2 flex flex-col items-center gap-3 py-3  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <h1 className="font-bold">De-Activate Account</h1>
      <div className="flex w-[90%] gap-1 my-2">
        <span className="text-blue-400 font-bold text-xs">Note:</span>
        <p className="text-xs">
          Once De-Activate your account your Posts, Likes, Comments, Profile,
          Friends, Kicks and Events will be hidden Until you login again
        </p>
      </div>
      <p className="text-[11px] sm:text-xs font-bold">
        You can deactivate your account once in a week
      </p>
      <p className="text-[10px] sm:text-xs text-blue-400 font-bold">
        Still do you want to De-Activate your account?
      </p>
      <div className="flex text-white justify-evenly w-full">
        <button className="bg-blue-400 w-[25%] py-2 rounded-xl text-xs font-bold">
          Yes
        </button>
        <button
          className="border-2 border-blue-400 text-blue-400 w-[25%] py-2 rounded-xl text-xs font-bold"
          onClick={() => setDeactivateModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeactivateAccountModal;

import React from "react";

const ConfirmReportModal = () => {
  return (
    <div className="w-[25%] h-[25%] rounded-lg bg-white flex flex-col items-center justify-center gap-4">
      <h1 className="font-bold">Report Post</h1>
      <p className="text-blue-400 text-sm">Still you want to report Post?</p>
      <div className="flex justify-center gap-5 w-full">
      <button
          className={`w-[30%] text-white font-bold py-1 text-xs rounded-lg bg-[#7991BD]`}
        //   onClick={onCreateUnion}
        >
         Yes
        </button>
        <button
          className={`w-[30%] text-white font-bold py-1 text-xs rounded-lg bg-[#7991BD]`}
        //   onClick={onCreateUnion}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmReportModal;

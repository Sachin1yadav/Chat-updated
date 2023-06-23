import React from "react";

const CustomGroupModal = ({setGroupModal}) => {
  const onCloseGroupModal = ()=>{
    setGroupModal(false)
  }
  return (
    <div className="flex w-[35%] bg-white items-center flex-col rounded-lg h-[400px]">
      <div className="flex w-full justify-between my-2 px-2">
        <span className="text-md font-bold">Custom Group</span>
        <button className="text-md font-semibold rounded-lg flex items-center text-white bg-[#6780AF] px-[30px] py-0.5">
          Save
        </button>
      </div>

      <div className="w-[95%] h-0.5 bg-gray-500"></div>

      <div className="flex gap-2 w-full my-2 flex-wrap py-2 ">
        <button className="bg-[#E4E4E4] mx-2 px-4 py-1 text-xs font-bold text-gray-500 rounded-md">
          Best Buddies
        </button>
        <button className="bg-[#E4E4E4] mx-2 px-4 py-1 text-xs font-bold text-gray-500 rounded-md">
          Chill Mama
        </button>
        <button className="bg-[#E4E4E4] mx-2 px-4 py-1 text-xs font-bold text-gray-500 rounded-md">
          Travel Mates
        </button>
     

        <img src="./images/mute.png" alt="" className="w-[30px]" />
      </div>
      <div className="w-[95%] h-0.5 bg-gray-500"></div>

      <div className="w-[95%] bg-[#E4E4E4] rounded-lg mt-2">
        <input
          type="text"
          className="bg-[#E4E4E4] w-[100%] outline-none py-1.5 pl-2 rounded-lg"
          placeholder="Name your group"
        />
      </div>

      <div className="flex w-full px-2 mt-4">
        <div className="flex flex-1">
          <img src="./images/mute.png" alt="" className="w-[25px]" />
          <span className="text-sm font-bold text-blue-400">
            Choose Friends
          </span>
        </div>
        <span className="text-sm font-bold text-blue-400 mr-2">Edit List</span>
      </div>

      <div className="bg-white w-[96%] flex justify-end gap-3">
        <button className="bg-[#6780AF] text-white w-[120px] text-sm py-1 rounded-xl mb-2 font-semibold mt-2">Create Group</button>
        <button className="bg-[#6780AF] text-white w-[120px] text-sm py-1 rounded-xl mb-2 font-semibold mt-2" onClick={onCloseGroupModal}>Cancel</button>
      </div>
    
    </div>
  );
};

export default CustomGroupModal;

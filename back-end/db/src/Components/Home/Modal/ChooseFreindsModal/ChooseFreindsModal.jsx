import React from "react";

const ChooseFreindsModal = () => {
  return (
    <section className="w-[22%] bg-white px-3 rounded-xl">
      <div className="flex py-2">
        <span className="flex-1 font-bold text-sm ">Choose Freinds</span>
        <span className="text-[#6780AF] text-[12px] font-semibold">Cancel</span>
      </div>

      <section className="w-full">
        <hr />
        <div className="flex justify-evenly my-3">
          <button className="bg-[#6780AF] text-white text-[12px] font-semibold border-[1.5px] border-[#6780AF] px-3 rounded-sm">
            Freinds
          </button>
          <button className="text-[#6780AF] text-[12px] font-semibold border-[1.5px] border-[#6780AF] px-3 rounded-sm">
            Relative
          </button>
          <button className="text-[#6780AF] text-[12px] font-semibold border-[1.5px] border-[#6780AF] px-3 rounded-sm">
            Classmates
          </button>
        </div>
        <hr />
      </section>

      <section className="w-full">
        <div className="flex  h-7 rounded-md bg-[#DDDDDD] items-center">
          <input
            type="input"
            className="bg-[#DDDDDD] rounded-md w-[88%] ml-1 outline-none pl-2"
            placeholder="Search"
          />
          <img src="./images/Search.png" alt="" className=" h-[65%]" />
        </div>
      </section>

      <section className="w-full flex gap-1 items-center py-3">
        <input type="checkbox" name="" id="" />
        <span className="text-[11px] font-semibold">Select all</span>
      </section>

      <section className="w-full h-[300px] overflow-y-scroll" >
        {[1, 2, 3, 4, 4, 2, 235].map(() => (
          <>
            <hr />
            <div className="w-full flex my-2">
              <div className="flex flex-1 gap-2 items-center ">
                <img
                  src="./images/events.jpg"
                  alt=""
                  className="w-[30px] h-[30px] rounded-full  "
                />
                <h1 className="text-sm font-semibold">Elisha K</h1>
              </div>
              <input type="checkbox" name="" id="" />
            </div>
            <hr />
          </>
        ))}
      </section>

        <hr />
      <section className="flex w-full items-center flex-col">
        <div className=" my-4 rounded-xl flex w-full py-1 gap-2">
           <div className=" w-[20%] flex rounded-full justify-center items-center bg-slate-500 h-[30px]">
            <img src="./images/groups.png " alt="" className="w-[30px] h-[30px]"/>
            <span className="text-white bg-green-600 rounded-full absolute w-3 h-3 flex items-center justify-center text-[10px] left-8">1</span>
           </div>
           <button className="bg-blue-400 px-[75px] rounded-xl py-1 text-white font-bold text-sm">Save</button>
        </div>
      </section>
    </section>
  );
};

export default ChooseFreindsModal;

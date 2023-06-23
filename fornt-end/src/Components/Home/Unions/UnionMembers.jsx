import React, { useState } from "react";
import Portals from "../../Portals/Portals";

const UnionMembers = ({ button, handleRemove }) => {
  const [state, setState] = useState({});
  const { modalOpen } = state;
  return (
    <>
      <div className="flex h-[50px] items-center w-full">
        <div className="">
          <img
            src="./images/events.jpg"
            alt=""
            className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] rounded-full"
          />
        </div>
        <div className=" flex flex-1 flex-col justify-center ml-2">
          <span className="font-bold  text-xs sm:text-sm">Elisa K</span>
        </div>

        <div className="flex gap-2 items-center cursor-pointer">
          <button
            className="px-5 bg-blue-400 text-white font-bold py-1 text-[10px] rounded-lg"
            onClick={() => setState({ ...state, modalOpen: true })}
          >
            {button}
          </button>
        </div>
      </div>

      {modalOpen && (
        <Portals>
          <div className=" w-[80%] sm:w-[40%] lg:w-[30%] xl:w-[25%] bg-white flex flex-col rounded-lg">
            <h1 className="text-center my-2 font-bold text-sm">Do you want to remove this user?</h1>
            <div className="border-2 text-gray-500 w-full flex justify-center rounded-b-lg">
              <button
                className="bg-[#7991BD] text-white border-[1px] border-gray-500 w-[50%] rounded-bl-lg text-sm font-semibold py-1"
                onClick={handleRemove}
              >
                Yes
              </button>
              <button
                className="text-[#7991BD] border-[1px] border-gray-500  w-[50%] rounded-br-lg text-sm font-semibold py-1"
                onClick={() => setState({...state, modalOpen: false})}
              >
                Cancel
              </button>
            </div>
          </div>
        </Portals>
      )}
    </>
  );
};

export default UnionMembers;

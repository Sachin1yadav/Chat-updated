import React from "react";
import dataList from "./data";
import { useMemo } from "react";

const ChangeRelationshipModal = ({
  closeModalOption,
  title,
  button,
  handleSendRequest,
  handleRelation,
  relationOption,
}) => {
  const isPersonal = true;

  // console.log(relationOption, "+++++++++++++++++++++");
  return (
    <div
      className=" w-[80%] sm:w-[40%] lg:w-[30%] xl:w-[25%] bg-white flex flex-col rounded-lg  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <h1 className="text-center my-2 font-bold text-sm">{title}</h1>

      {relationOption?.map((elem, index) => (
        <React.Fragment key={index}>
          <hr />
          <div className="flex gap-2 py-2 sm:py-3 lg:py-3 xl:py-4 px-4">
            <input
              name={elem.name}
              onChange={handleRelation}
              type="checkbox"
              className=""
              checked={elem.checked}
              disabled={elem.disable}
            />
            <span className="text-xs font-semibold">{elem.name}</span>
          </div>
          <hr />
        </React.Fragment>
      ))}
      {/* <div className="flex gap-2 py-4 px-4">
        <input
          onChange={handleRelation}
          type="checkbox"
          className=""
          checked={true}
        />
        <span className="text-xs font-semibold">ABC Union</span>
      </div> */}
      <div className="border-2 text-gray-500 w-full flex justify-center rounded-b-lg">
        <button
          className="bg-[#05b7fd] text-white border-[1px] border-gray-500 w-[50%] rounded-bl-lg text-sm font-semibold py-1"
          onClick={handleSendRequest}
        >
          {button}
        </button>
        <button
          className="text-[#05b7fd] border-[1px] border-gray-500  w-[50%] rounded-br-lg text-sm font-semibold py-1"
          onClick={closeModalOption}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangeRelationshipModal;

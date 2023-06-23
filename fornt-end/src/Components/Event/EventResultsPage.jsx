import React, { useState } from "react";
import EventResultContentBox from "./EventResultContentBox";
import Portals from "../Portals/Portals";

const EventResultsPage = () => {
  const [openDropdown, setOpenDropdown] = useState({
    fashionShow: false,
    dressContest: false,
  });

  const onHandleFashionShow = () => {
    setOpenDropdown({
      fashionShow: !openDropdown?.fashionShow,
    });
  };
  const onHandleDressContest = () => {
    setOpenDropdown({
      dressContest: !openDropdown?.dressContest,
    });
  };

  return (
    <>
      <div className="w-[95%] sm:w-[50%] lg:w-[40%] mt-1 px-4 bg-[#E4E7EC] mx-auto py-4 flex flex-col gap-4">
        <div
          className="px-2 flex py-2 rounded-lg gap-2 w-full bg-gray-400 cursor-pointer"
          onClick={onHandleFashionShow}
        >
          <h1 className="text-sm flex-1">Uynite Fashion Show 2020</h1>
          <img src="./images/groups.png" alt="" className="w-[20px] h-[20px]" />
        </div>

        {openDropdown?.fashionShow && (
          <div className="w-full">
            <EventResultContentBox />
          </div>
        )}

        <div
          className="px-2 flex py-2 rounded-lg gap-2 w-full bg-gray-400 cursor-pointer"
          onClick={onHandleDressContest}
        >
          <h1 className="text-sm flex-1">Indian Tradition Dress Contest</h1>
          <img src="./images/groups.png" alt="" className="w-[20px] h-[20px]" />
        </div>

        {openDropdown?.dressContest && (
          <div className="w-full">
            <EventResultContentBox />
          </div>
        )}
      </div>
    </>
  );
};

export default EventResultsPage;

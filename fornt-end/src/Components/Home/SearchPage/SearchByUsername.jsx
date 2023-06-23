import React from "react";

const SearchByUsername = () => {
  return (
    <div className="w-full bg-[#C8C8C8] h-full flex flex-col gap-4 overflow-y-scroll pt-2">
      {[1, 2, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 33, 5]?.map(() => (
        <div className="flex items-center gap-2">
          <img
            src="./images/events.jpg"
            alt=""
            className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] rounded-full"
          />
          <h1 className="font-bold text-xs sm:text-sm text-[#4B4B4B]">Abhishek</h1>
        </div>
      ))}
    </div>
  );
};

export default SearchByUsername;

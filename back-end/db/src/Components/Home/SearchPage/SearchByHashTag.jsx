import React from "react";

const SearchByHashTag = () => {
  return (
    <div className="w-full bg-[#C8C8C8] h-full flex flex-col gap-3 overflow-y-scroll">
      {[1, 2, 3, 4, 5,3,3,3,3,3,2,2,2,2,2,2,2,22,2,22,2]?.map(() => (
        <h1 className="font-bold text-sm text-[#4B4B4B]">#flowers</h1>
      ))}
    </div>
  );
};

export default SearchByHashTag;

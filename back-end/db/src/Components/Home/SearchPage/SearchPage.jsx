import React from "react";
import SearchComponent from "./../SearchComponent/SearchComponent";
import SearchByHashTag from "./SearchByHashTag";
import SearchByUsername from "./SearchByUsername";

const SearchPage = () => {
  return (
    <div className="w-[95%] sm:w-[50%] lg:w-[40%] bg-[#C8C8C8] mx-auto px-4 flex flex-col items-center py-2 h-[88.5%] mt-2 rounded-lg">
      <div className="w-full">
        <SearchComponent bgColor={"#FFFFFF"} />
      </div>
      {/* <SearchByHashTag /> */}
      <SearchByUsername />
      {/* <div className="w-full h-full flex items-center justify-center">
        <h1>Start Searching</h1>
      </div> */}
    </div>
  );
};

export default SearchPage;

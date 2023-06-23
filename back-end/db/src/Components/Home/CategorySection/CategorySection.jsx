import React, { useState } from "react";

const CatergorySection = ({selectedOption,setSelectedOption}) => {
 
  const data = [
    { title: "Posts" },
    { title: "Photos" },
    { title: "Videos" },
    { title: "Kicks" },
  ];
  return (
    <div className="flex-1 mx-3 bg-white flex justify-around py-2 mt-2 ml-1 rounded-xl">
      {data?.map((elem) => (
        <button
          key={elem.title}
          className={`bg-${
            selectedOption === elem?.title ? "[#7991BD]" : "[#E4E4E4]"
          } w-[22%] rounded-lg text-[#161616] text-xs font-bold py-1`}
          onClick={() => setSelectedOption(elem?.title)}
        >
          {elem.title}
        </button>
      ))}
    </div>
  );
};

export default CatergorySection;

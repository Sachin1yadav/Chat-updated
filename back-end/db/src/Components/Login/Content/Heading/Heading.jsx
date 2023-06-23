import React from "react";

const Heading = ({ title }) => {
  return (
    <div className="flex w-full justify-center">
      <h1 className="font-bold text-lg md:text-xl my-1.5 lg:mb-3 text-[#7E8082]">
        {title}
      </h1>
    </div>
  );
};

export default Heading;

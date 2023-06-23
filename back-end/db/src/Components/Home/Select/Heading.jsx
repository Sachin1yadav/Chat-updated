import React from "react";

const Heading = ({ title }) => {
  return (
    <div className="flex w-full justify-center">
      <h1 className="font-bold text-lg md:text-xl mb-2 lg:mb-4">
        {title}
      </h1>
    </div>
  );
};

export default Heading;

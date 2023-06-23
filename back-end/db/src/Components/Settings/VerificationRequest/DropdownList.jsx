import React from "react";

const DropdownList = () => {
  const data = [
    { name: "Blogger" },
    { name: "Business/Organisations" },
    { name: "Celebrity" },
    { name: "Politician" },
    { name: "Musician" },
    { name: "News/Media" },
    { name: "Sports" },
    { name: "Other" },
  ];
  return (
    <select className="w-full py-2 outline-none border-2 rounded-lg pl-2 text-[10px] sm:text-xs lg:text-sm flex gap-2 font-bold sm:font-normal">
      {data.map((elem, index) => (
        <option value={elem?.name} key={index} className="">
          {elem?.name}
        </option>
      ))}
    </select>
  );
};

export default DropdownList;

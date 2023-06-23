import React from "react";

const CountryCodeModal = ({
  countryList,
  setCountryData,
  closeCountryModal,
}) => {
  return (
    <div
      className="w-[95%] sm:w-[50%] lg:w-[30%] h-[74%] bg-white rounded-lg px-4 flex flex-col gap-2 pt-2 fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <h1>Select a country</h1>

      <input
        type="text"
        placeholder="Search..."
        className="border-b-2 border-[#48B2DB] text-[#7E8082] outline-none"
      />

      <div className="overflow-y-scroll flex flex-col gap-1">
        {countryList?.map((elem) => (
          <div
            className="w-full mb-1 flex cursor-pointer"
            onClick={() => {
              setCountryData(elem);
              closeCountryModal()
            }}
          >
            <img src="./images/groups.png" alt="" />
            <div className="flex flex-1">
              <span className="">
                {elem?.country} ({elem?.inisititete})
              </span>
            </div>
            <span className="pr-2"> +{elem?.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryCodeModal;

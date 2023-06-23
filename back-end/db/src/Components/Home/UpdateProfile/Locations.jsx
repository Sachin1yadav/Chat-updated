import React, { useMemo, useState } from "react";
import Input from "../../input/input";
import Dropdown from "../../Login/Content/Modal/Dropdown";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Accordion from "../../Accordion/Accordion";
import Dropdown2 from "../../Login/Content/Modal/Dropdown2";
import { useSelector } from "react-redux";
import AutocompletePlace from "../../googlemap/AutocompletePlace";
import DropdownComp from "../../common/DropdownComp";

const Locations = ({
  location,
  handleLocation,
  handleChange,
  handleCountry,
  country,
  states,
}) => {
      const reducerData = useSelector((state) => {
        return {
          countryList: state.authReducer.countryList,
          stateList: state.authReducer.stateList,
          districtList: state.authReducer.districtList,
          loksabhaList: state.authReducer.loksabhaList,
          assemblyList: state.authReducer.assemblyList,
        };
      });
      const {
        countryList,
        stateList,
        districtList,
        loksabhaList,
        assemblyList,

      } = reducerData;
  const { state, district, assembly, loksabha } = states;
  const countryName = ["India"];

  return (
    <>
      <DropdownComp
        style={"w-full"}
        label={"Country: "}
        name={"Select country"}
        keyName={'country'}
        selectedValue={country}
        options={countryList}
        handleChange={handleCountry}
      />
      <DropdownComp
        style={"w-full my-2"}
        label={"State"}
        name={"State"}
        options={stateList}
        selectedValue={state}
        keyName={"state"}
        handleChange={(value) => handleChange("state", value)}
      />
      {countryName?.includes(country?.country) && (
        <>
          <DropdownComp
            style={"w-[77%] my-2"}
            label={"District"}
            name={"District"}
            options={districtList}
            selectedValue={district}
            keyName={"distric"}
            handleChange={(value) => handleChange("district", value)}
          />
          <div className="flex gap-2">
            <DropdownComp
              style={"w-1/2 my-2"}
              label={"Loksabha"}
              name={"Loksabha"}
              keyName={"loksabha"}
              options={loksabhaList}
              selectedValue={loksabha}
              handleChange={(value) => handleChange("loksabha", value)}
            />
            <DropdownComp
              style={"w-full my-2"}
              label={"Assembly"}
              name={"Assembly"}
              keyName={"assembly"}
              options={assemblyList}
              selectedValue={assembly}
              handleChange={(value) => handleChange("assembly", value)}
            />
          </div>
        </>
      )}
      <div className="mt-2 flex">
        <div className="w-[180px]">Living Location</div>
        <div className="flex-1">
          <AutocompletePlace
            livePlace={(location) => handleLocation(location)}
            handleChangeLocation={handleLocation}
            value={location}
            placeholder={"Living Location"}
          />
        </div>
      </div>
    </>
  );
};

export default Locations
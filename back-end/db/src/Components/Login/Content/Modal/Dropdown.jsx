import { Fragment } from "react";
import { Listbox, Menu, Transition } from "@headlessui/react";
import { MdArrowDropDown } from "react-icons/md";
import { isEmpty } from "../../../Utility/utility";
import EmptyComponent from "../../../empty component/EmptyComponent";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
  label,
  up,
  style,
  name,
  options = [],
  handleChange,
  selectedValue,
  keyName,
  heading,
  inputValue,
  onHandleChange,
  filteredData,
  selectedOption,
}) {


  console.log("Opppppppp+++++++++---------=====",options);
  return (
    <div className="flex items-center w-full">
      {label && <div className="w-[40%] md:min-w-[165px] ">{label}</div>}
      <Listbox
        as="div"
        className={`relative inline-block ${style || "w-full my-1"}`}
        onChange={handleChange}
      >
        <div>
          <Listbox.Button
            className={`inline-flex w-full gap-x-1.5 rounded-md bg-white px-3 py-1.5 border-[1px] border-[#7E8082]  outline-none text-xs font-bold  ${
              selectedOption ? "text-black" : "text-gray-400"
            } shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
          >
            {selectedOption && selectedOption[keyName] || name}
            <MdArrowDropDown
              className="-mr-1 h-5 w-5 ml-auto text-gray-400"
              aria-hidden="true"
            />
          </Listbox.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100 top-100%"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Listbox.Options
            className={`
               ${
                 up ? "bottom-[44px]" : ""
               } h-[8rem] xl:h-[16rem] overflow-auto absolute z-10 mt-1 mb-2 w-[100%] lg:w-50 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            {isEmpty(options) ? (
              <EmptyComponent message={"Data not available"} />
            ) : (
              <div className="py-1">
                <div className="w-full px-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border-b-2 border-[#48B2DB] text-[#7E8082] outline-none"
                    value={inputValue}
                    onChange={onHandleChange}
                  />
                </div>
                {heading}
                {options
                  .filter((elem) => {
                    if (inputValue === "") {
                      return true;
                    } else {
                      return elem[keyName].toLowerCase().includes(inputValue);
                    }
                  })

                  ?.map((item, index) => {

                    console.log("============",item);
                    return (
                      <Listbox.Option key={index} value={item}>
                        {({ active }) =>
                          item?.onClick ? (
                            <Link
                              to={item?.link}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-[#707070] ",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {item[keyName]}
                            </Link>
                          ) : (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-[#707070] ",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {item[keyName]}
                            </a>
                          )
                        }
                      </Listbox.Option>
                    );
                  })}
              </div>
            )}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}

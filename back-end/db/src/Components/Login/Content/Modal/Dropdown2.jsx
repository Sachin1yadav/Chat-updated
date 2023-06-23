import { Fragment } from "react";
import { Listbox, Menu, Transition } from "@headlessui/react";
import { MdArrowDropDown } from "react-icons/md";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown2({
  label,
  name,
  options = [],
  handleCountry,
  country,
  style,
  inputValue,
  onHandleChange,
  param,
  selectedCountry,
  setCountry,
}) {
  // const countryFilteredList = countryList?;

  return (
    <div className="flex items-center my-1">
      {label && <div className="min-w-[165px]">{label}</div>}
      <Listbox
        as="div"
        className={`relative inline-block ${style || "w-[77%"} mt-[10px]`}
        onChange={handleCountry}
      >
        <div>
          <Listbox.Button
            className={`inline-flex w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm ${
              selectedCountry ? "text-black-400" : "text-gray-400"
            }  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
          >

            
            {selectedCountry?.country || name}
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
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Listbox.Options className="h-[8rem] xl:h-[16rem] overflow-auto absolute z-10 mt-2 w-[100%] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1 w-[100%]">
              <div className="w-full px-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-b-2 border-[#48B2DB] text-[#7E8082] outline-none"
                  value={inputValue}
                  onChange={onHandleChange}
                />
              </div>

              {options
                ?.filter((item) => {
                  if (inputValue === "") {
                    return true;
                  } else {
                    return item[param].toLowerCase().includes(inputValue);
                  }
                })
                ?.map((item, index) => {
                  return (
                    <Listbox.Option key={index} value={item}>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {item?.country}
                        </a>
                      )}
                    </Listbox.Option>
                  );
                })}
            </div>
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}

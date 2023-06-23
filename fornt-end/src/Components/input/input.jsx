import React from "react";

const Input = ({attributes, label, classes, labelclass}) => {
  return (
      <div className={`${classes} mb-2 items-center`}>
        <div className={`mr-3 whitespace-nowrap text-gray-900 ${labelclass || 'w-1/4'}`}>{label}</div>
        <div className="rounded-md flex-1 shadow-sm mt-0">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            {/* <span className="text-gray-500 sm:text-sm">$</span> */}
          </div>
          <input
            {...attributes}
             className="block w-full rounded-md border-0 py-1 px-2 text-gray-900 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"/>
          {/* <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
            </select>
          </div> */}
        </div>
      </div>

  );
};

export default Input;

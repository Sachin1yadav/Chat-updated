import React from 'react'
import dataList from './data';

const PreferredCategoriesModal = () => {
    return (
        <div className="w-[28%] bg-white flex flex-col rounded-lg">
          <h1 className="text-center my-2 font-bold text-sm mb-3">Select your preferred Kicks categories</h1>
    
        <div className='h-[200px] overflow-scroll'>
        {dataList.map((elem) => (
          <div className="flex gap-2 py-2 px-4 ">
              <input type="checkbox" className="" />
              <span className="text-xs font-semibold">{elem.name}</span>
            </div>
          ))}
        </div>
    
          <div className="border-2 text-gray-500 w-full flex justify-around rounded-b-lg py-2">
            <button className="text-white bg-orange-500 w-[40%] rounded-lg text-sm font-semibold py-1">Save</button>
            <button className="text-orange-500 border-[1px] border-orange-500  w-[40%] rounded-lg text-sm font-semibold py-1">Cancel</button>
          </div>
        </div>
      );
}

export default PreferredCategoriesModal;

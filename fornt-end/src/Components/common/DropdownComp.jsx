import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BsChevronDown } from 'react-icons/bs'

export default function DropdownComp({ label, options,keyName, name, selectedValue, handleChange, labelClass}) {
  return (
    <div className="w-full mb-2 items-center flex">
        { label && <div className={`mr-3 w-1/4 ${labelClass}`}>{label}</div>}
      <Listbox value={selectedValue} onChange={handleChange}>
        <div className="relative w-full flex-1 mt-1">
          <Listbox.Button className="relative flex gap-2 border border-1 border-gray-300 cursor-pointer w-full rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange sm:text-sm">
            { selectedValue?.icon ? 
              <img className='w-4' src={selectedValue?.icon}/> : ""
            }
            <span className="block truncate">{selectedValue?.[keyName] || name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <BsChevronDown/>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options?.map((item, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 px-4 ${
                      active ? 'bg-gray-300' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <div className='flex gap-2'>
                      {
                        item.icon && <img className='w-4' src={ item.icon }/>
                      }
                      <span
                        onClick={item?.onClick && item?.onClick}
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item?.[keyName]}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                        </span>
                      ) : null}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

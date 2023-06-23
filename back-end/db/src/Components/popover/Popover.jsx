import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";

function PopOver({
  button,
  options,
  openModalOption,
}) {
  return (
    <>
      <Popover className="relative">
        <Popover.Button className={"outline-0"}>{button}</Popover.Button>

        <Popover.Panel className="absolute z-10 w-max right-0 bg-white py-2 px-3 border rounded-md">
          <div className="flex flex-col">
            {/* <a href="/analytics">Analytics</a>
          <a href="/engagement">Engagement</a>
          <a href="/security">Security</a>
          <a href="/integrations">Integrations</a> */}
            {[]?.map((item) => {
              return (
                <Link
                  to=""
                  key={item?.name}
                  className="cursor-pointer w-full flex flex-col gap-1"
                  onClick={() => openModalOption(item?.name)}
                  >
                  <span>{item?.icon}</span> {item?.name}
                  <div className="w-[98%] h-[1px] bg-gray-500"></div>
                  </Link>
              );
            })}
          </div>

          <img src="/solutions.jpg" alt="" />
        </Popover.Panel>
      </Popover>
    
    </>
  );
}

export default PopOver;

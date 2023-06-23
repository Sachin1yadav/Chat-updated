import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
const AccordionToggle = () => {
  const [open, setOpen] = useState(0);
  const [val, setval] = useState("#000000");
  const [val2, setval2] = useState("#000000");

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Fragment>
      <Accordion open={open === 1} icon={<Icon id={1} open={open}  style={{magrin:"0px"}}/>}>
        <AccordionHeader style={{magrin:"0px"}}
          onClick={() => handleOpen(1)}
          className="w-[90%] text-gray-500 font-bold text-md"
        >
          Advanced Settings
        </AccordionHeader>
        <AccordionBody className="w-[90%]" style={{magrin:"0px"}} >
          <div className="advanced my-0">
            <div className="flex mx-3">
              <p className="mx-3 text-gray-500 font-bold">Background Color: </p>
              <div className="">
               
                <span className="border border-gray-400 mx-2 px-0.5">
                  {val2}
                </span>
                <input
                  type="color"
                  id="head"
                  name="head"
                  onChange={(e) => setval2(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mx-3">
              <p className="mx-4 text-gray-500 font-bold">Text Color: </p>
              <div className="ml-12">
              
                <span className="border border-gray-400 mx-2 px-0.5">
                  {val}
                </span>
                <input
                  type="color"
                  id="head"
                  name="head"
                  onChange={(e) => setval(e.target.value)}
                />
              </div>
            </div>
          </div>
        </AccordionBody>
        <hr className="w-[90%] h-0.5 bg-gray-300 border-0 rounded md:my-3 mb-3 dark:bg-black-900" />
      </Accordion>
    </Fragment>
  );
};

export default AccordionToggle;

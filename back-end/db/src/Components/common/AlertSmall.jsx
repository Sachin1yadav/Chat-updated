import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

const AlertSmall = ({ showAlert, message, onClick, button }) => {
  const [alert, setAlert] = useState();
//   useEffect(() => {
//     const timeOut = setTimeout(() => {
//       setAlert(false);
//     }, 1500);
//     return () => clearTimeout(timeOut);
//   }, [showAlert]);
  return (
    <>
      <Popover
        open={showAlert && alert}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <PopoverHandler>
          <Button
           className="p-0"
            variant="text"
          >
            {button}
          </Button>
        </PopoverHandler>
        {showAlert &&
        <PopoverContent className=" text-red-500 text-xs">{message}</PopoverContent>
        }
      </Popover>
    </>
  );
};

export default AlertSmall;

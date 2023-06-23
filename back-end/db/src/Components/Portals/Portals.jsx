import React from "react";
import { createPortal } from "react-dom";

const Portals = ({ children, closeModal }) => {
  return createPortal(
    <>
      <div
        onClick={closeModal}
        style={{ backgroundColor: "rgba(0,0,0,.6)" }}
        className="fixed top-0 w-[100%] h-[100%] z-20 flex items-center justify-center"
      ></div>
      {children}
    </>,
    document.getElementById("modal")
  );
};

export default Portals;

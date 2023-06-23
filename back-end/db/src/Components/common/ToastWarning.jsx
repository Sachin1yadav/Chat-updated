import React from "react";
import { toast } from "react-toastify";

const ToastWarning = (message, position) => {
  return (
    <>
      {toast(message, {
        position: position || "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })}
    </>
  );
};

export default ToastWarning;

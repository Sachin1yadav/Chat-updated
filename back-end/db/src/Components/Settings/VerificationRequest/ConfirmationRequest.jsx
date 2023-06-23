import React, { useState } from "react";
import Portals from "../../Portals/Portals";
import RejectionModal from "./RejectionModal";

const ConfirmationRequest = () => {
  const [confirmRequest, setConfirmRequest] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const intervalID = setTimeout(() => {
    setConfirmRequest(true);
  }, 5000);

  const onCloseModal = () => {
    setConfirmRequest(false);
  };

  const onResubmit = () => {
    setIsVerified(true);
    clearInterval(intervalID);
    setConfirmRequest(false);
  };
  return (
    <>
      <div className="w-[95%] sm:w-[50%] lg:w-[40%] mx-auto flex justify-center items-center bg-gray-300 flex-col h-full mt-2 rounded-xl">
        {!isVerified ? (
          <h1 className="w-[80%] text-center text-[13px] sm:text-xs lg:text-sm">
            Your verification is in under process and will be verified within
            3-4 business weeks.
          </h1>
        ) : (
          <h1 className="w-[80%] text-center text-[14px] sm:text-xs lg:text-sm">
            Your verification is done.
          </h1>
        )}
      </div>
      {confirmRequest && (
        <Portals closeModal={onCloseModal}>
          <RejectionModal onCloseModal={onCloseModal} onResubmit={onResubmit} />
        </Portals>
      )}
    </>
  );
};

export default ConfirmationRequest;

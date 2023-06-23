import React, { useState } from "react";
import ThankuModal from "../ThankuModal/ThankuModal";
import { createPortal } from "react-dom";
import dataList from "./data";
import Portals from "../../../Portals/Portals";

const ReportModal = ({ closeModal }) => {
  // else if (option === "Nudity or Sexual activity") {
  //   // showModal(true)
  // } else if (option === "Suicide related") {
  //   // showModal(true)
  // } else if (option === "Suicide related") {
  //   // showModal(true)
  // } else if (option === "Self-Injury") {
  //   // showModal(true)
  // } else if (option === "Eating Disorders") {
  //   // showModal(true)
  // } else if (option === "False Information") {
  //   // showModal(true)
  // } else if (option === "Scam or Fraud") {
  //   // showModal(true)
  // } else if (option === "Hate Speech or Symbols") {
  //   // showModal(true)
  // } else if (option === "Harassment") {
  //   // showModal(true)
  // } else if (option === "Self-Injury") {
  //   // showModal(true)
  // } else if (option === "Terrorism") {
  //   // showModal(true)
  // } else if (option === "Animal Abuse") {
  //   // showModal(true)
  // } else if (option === "Violence") {
  //   // showModal(true)
  // }

  const [showThanksModal, setShowThanksModal] = useState(false);

  const showThankuModal = () => {
    if (option === "Nudity or Sexual activity") {
      setShowThanksModal(true);
    }

    setShowReportModal(false);
    setTimeout(() => {
      setShowThanksModal(false);
    }, 6000);
  };

  console.log("dataList",dataList);
  return (
    <>
      <div className="bg-white w-[35%]  h-[400px] flex flex-col items-center gap-2 rounded-xl absolute">
        <h1 className="text-2xl font-bold mt-3">
          Why are you Reporting this Post ?
        </h1>
        <hr className="w-full h-[80%] text-[gray]" />
        {dataList.map((elem, index) => (
          <p
            key={index}
            className="text-[14px] text-gray-500 self-start pl-5 hover:bg-gray-200 w-[95%] ml-2 cursor-pointer"
          >
            {elem.name}
          </p>
        ))}
        <button
          className="w-[50%] h-8 text-white font-semibold rounded-lg mb-3 mt-2 bg-[#6780AF]"
          onClick={closeModal}
        >
          Report
        </button>
      </div>
      {showThanksModal && (
        <Portals>
          <ThankuModal />
        </Portals>
      )}
    </>
  );
};

export default ReportModal;

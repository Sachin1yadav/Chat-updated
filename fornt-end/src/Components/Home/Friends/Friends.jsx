import React, { useState } from "react";
import PostContent from "../PostContetnt/PostContent";
import ReportModal from "../Modal/ReportModal/ReportModal";

const Friends = () => {


  const showReportModels = (value) => {
    // setShowReportModel(value);
  };


  return (
    <div className="">
       
      <PostContent showModal={showReportModels}/>
     
    </div>
  );
};

export default Friends;

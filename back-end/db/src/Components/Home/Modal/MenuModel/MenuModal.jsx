import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuModalTabSelect } from "../../../../redux/actionCreators/userActionCreator";
import ReportModal from "../ReportModal/ReportModal";
import Portals from "../../../Portals/Portals";
import OriginalPostModal from "../OriginalPostModal/OriginalPostModal";
import "./menu.css";
import {
  deletePostByPostId,
  getAllPostWithLimit,
} from "../../../../redux/actionCreators/rootsActionCreator";
import { toasterFunction } from "../../../Utility/utility";
import { getPostHistory } from "../../../../redux/actionCreators/postActionCreator";

const MenuModal = ({ data, userStatus, closeModel, profileId, postId }) => {
  const { menuModalTab } = useSelector((state) => state.userReducer);
  const reducerData = useSelector((state) => {
    return {
      profile: state.profileReducer.profile
    }
  });
  const { profile} = reducerData
  const [showReportModal, setShowReportModal] = useState(false);
  const [originalPost, setOriginalPost] = useState(false);

  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const onHandleClick = async (option) => {
    if (option === "Report") {
      // console.log("showReportModal111", showReportModal);
      setShowReportModal(true);
      // console.log("showReportModa222", showReportModal);
    } else if (option === "History") {
      dispatch(getPostHistory(postId))
      setOriginalPost(true);
    } else if (option === "Delete Post") {
      const response = await dispatch(deletePostByPostId(profile?.id, postId));
      // console.log("Deleted", isDeleted);
      if (!response?.status) {
        return toasterFunction(response.message);
      }else{
        toasterFunction(response?.message)
        dispatch(getAllPostWithLimit(profile?.id));
      }
    }
    closeModel(option);
    dispatch(menuModalTabSelect(option));
  };
  return (
    <>
      <div className="w-[50%] sm:w-[30%] lg:w-[25%] xl:w-[20%] absolute border-2 border-gray-300 bg-white right-[9%] sm:right-[29%] lg:right-[32.8%] xl:right-[32.5%] mt-7 z-10">
        {data
          .filter((elem) => {
            if (userStatus === user.userId) {
              if (elem.samePostedUser === 0 || elem.samePostedUser === 1) {
                return elem;
              }
            } else {
              if (elem.samePostedUser === 1 || elem.samePostedUser === 2) {
                return elem;
              }
            }
          })
          ?.map((elem) => (
            <div
              key={elem.name}
              className="flex gap-2 border-b-2 border-gray-300 items-center mx-2 py-1 lg:py-1.5 cursor-pointer"
              style={{
                backgroundColor:
                  menuModalTab === elem.name ? "#7991BD" : "white",
              }}
              onClick={() => onHandleClick(elem.name)}
            >
              <img src={elem.icon} alt="" className="w-[18px] sm:w-[20px] lg:w-[25px] " />
              <span className="text-[9px] sm:text-[10px] text-gray-600 font-semibold">
                {elem.name}
              </span>
            </div>
          ))}
      </div>
      {/*<div className='absolute rightArrow lg:right-[32.8%] xl:right-[35.2%] mt-2 border-[3px] border-gray-200 p-3 w-4'>
       <div className='bg-white'></div>
      </div>*/}
    </>
  );
};

export default MenuModal;

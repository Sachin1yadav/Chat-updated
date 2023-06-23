import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { defaultEventScreen } from "../../../redux/actionCreators/eventActionCreator";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { defaultRootData } = useSelector((state) => state.eventReducer)
  const image = defaultRootData?.data?.postdata?.image.split(" @ ")
  const onHandleClick = () => {
    navigate("/event")
  }
  return (
    <div className="w-[95%] sm:w-[50%] lg:w-[40%] h-[400px] flex justify-center bg-white flex-col items-center rounded-lg mt-[10px] " onClick={onHandleClick}>
      <h1 className="text-lg font-bold mb-2 w-[90%]">{defaultRootData?.data?.postdata?.tital}</h1>
      <div className="w-full h-[75%] flex justify-center">
        <img src={image && image[1]} alt="" className="w-[90%] h-[100%] rounded-lg border border-gray-500" />
      </div>
      <p className="font-bold pb-[2px]">Total Post Made for this event: {defaultRootData?.data?.total_participant_count}</p>
    </div>
  );
};

export default HeroSection;
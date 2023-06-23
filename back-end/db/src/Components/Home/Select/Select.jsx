import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "./Heading";
import Option from "./Option";
import { useDispatch } from "react-redux";
import { defaultRootScreen } from "../../../redux/actionCreators/eventActionCreator";
import { getProfileById } from "../../../redux/actionCreators/profileAction";
import { isTabSelected } from "../../../redux/actionCreators/userActionCreator";

const Select = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('userCredential')
    const data = JSON.parse(user)
    
    const profile = dispatch(getProfileById(data?.id))
  }, [])

  const data = [
    {
      title: "Roots",
      description: "Connect & Share",
      icon: "./images/Roots.png",
      style: "bg-[#7092D2]",
      url: "/root",
    },
    {
      title: "Kicks",
      description: "Create short videos",
      icon: "./images/selectKicksIcon.png",
      style: "bg-[#DD8E58]",
      url: "/kicks",
    },
    {
      title: "U-Meet",
      description: "Schedule events & meet",
      icon: "./images/selectUmeet.png",
      style: "bg-[#649B8E]",
      url: "/umeet",
    },
    {
      title: "Reals",
      description: "Real People & Real Videos",
      icon: "./images/realsSelected.png",
      style: "bg-[#46B3BB]",
      url: "/reals",
    },
  ];

  const onHandleClick = (option) => {
     dispatch(isTabSelected(option?.title));
    navigate(option?.url);
  };

  return (
    <div className="lg:w-full h-screen rounded-[20px] flex flex-col justify-center items-center gap-4 px-4">
      <div className="bg-[#9BD9F1] border border-gray-400 rounded-lg p-4 pb-6">
        <Heading title="Select" />

        <div className="flex flex-col gap-4">
          {data?.map((elem) => (
            <Option
              key={elem?.title}
              title={elem?.title}
              description={elem?.description}
              icon={elem?.icon}
              style={elem?.style}
              click={() => onHandleClick(elem)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;

import React from "react";
import dataList from "./data";
import ProfileFooter from "./ProfileFooter";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { settingUserLoginData } from "../../../../redux/actionCreators/userActionCreator";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

const ProfileModal = ({profile}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onHandleClick = (option) => {
    if (option === "Logout") {
      localStorage.clear();
      // dispatch(settingUserLoginData(false, {}));
      navigate("/auth/login");
    } else if (option === "Unions's") {
      navigate("/unions");
    } else if (option === "Settings") {
      // dispatch(settingUserLoginData(false, {}));
      navigate("/settings");
    } else if (option === "Contact Us") {
      navigate("/contact-us");
    } else if (option === "Sponsored event results") {
      navigate("/events-result");
    }
  };

  return (
    <div className=" lg:w-[28%] xl:w-[22%] bg-white border border-gray-300 gap-2 flex flex-col rounded-xl absolute lg:left-[71%] xl:left-[77%] top-[95%] mt-2 h-[340px] z-50 ">
      <Link to="/profile">
        <div className="flex items-center gap-2 py-2  px-3">
          <img
            src={profile?.pimage}
            alt=""
            className="w-[48px] h-[48px] object-cover rounded-full"
          />

          <div className="flex flex-col">
            <span className="font-bold text-lg ml-1"> {profile?.fname || ""} {profile?.lname || ""}</span>
            <span className="text-sm text-gray-600 font-semibold">
              {profile?.job || ""}
            </span>
          </div>
        </div>
      </Link>
      <hr className="mb-2" />

      {dataList.map((elem) => (
        <div
          key={elem.name}
          className="flex items-center px-3 cursor-pointer"
          onClick={() => onHandleClick(elem.name)}
        >
          <span className="font-medium flex-1">{elem.name}</span>
          <MdArrowForwardIos className="w-5 text-gray-500" />
        </div>
      ))}
      <div className="mb-2">
        <ProfileFooter />
      </div>
    </div>
  );
};

export default ProfileModal;

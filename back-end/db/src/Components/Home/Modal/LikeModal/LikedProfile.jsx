import React from "react";
import User from "../../../../Assets/Images/user.png";
import { Link } from "react-router-dom";

const LikedProfile = ({ data }) => {
  const { profile, id } = data || {};
  return (
    <div className="w-full h-[55px] flex items-center ">
      <Link
        to={`profile/${id}`}
        className=" h-[50px] flex flex-1 items-center gap-2"
      >
        <img
          src={profile?.pimage || User}
          alt=""
          className="w-[45px] h-[45px] rounded-full bg-yello-500"
        />

        <span className="font-bold text-gray-600 text-sm">{`${profile?.fname} ${profile?.lname}`}</span>
      </Link>

      <div className=" h-[50px] flex items-center cursor-pointer">
        <button className="px-5 text-blue-400 bg-white border-[1px] border-blue-400 font-bold py-1 text-xs rounded-lg">
          Add friend
        </button>
      </div>
    </div>
  );
};

export default LikedProfile;

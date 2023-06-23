import React from "react";
import { Link } from "react-router-dom";

const ProfileFooter = () => {
  return (
    <div className="flex flex-col items-center h-[100px] bg-white rounded-xl">
      <div className="flex gap-8 justify-center items-center">
        <div className="font-medium text-xs ">
          <span>&copy;</span> 2022 Uynite.com
        </div>
        <select name="" id="" className="font-medium bg-white text-xs outline-none">
          <option value="english">English</option>
          <option value="english">Hindi</option>
          <option value="english">French</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-1">
        <span className="font-medium text-xs py-0.5">About us</span>
        <div className="bg-black w-[1px] h-[14px] hidden md:flex items-center justify-center"></div>
        <Link to="privacy-policy"> <span className="font-medium text-xs py-0.5">Privacy & Cookies</span></Link>
        <div className="bg-black w-[1px] h-[14px] hidden md:flex items-center justify-center"></div>
        <Link to="terms-and-conditions"> <span className="font-medium text-xs py-0.5">Terms & Conditions</span></Link>
        <div className="bg-black w-[1px] h-[14px] hidden md:flex items-center justify-center"></div>
        <span className="font-medium text-xs py-0.5">Services</span>
        <div className="bg-black w-[1px] h-[14px] hidden md:flex items-center justify-center"></div>
        <span className="font-medium text-xs py-0.5">Ads Management</span>
        <div className="bg-black w-[1px] h-[14px] hidden md:flex items-center justify-center"></div>
        <span className="font-medium text-xs py-0.5">Careers</span>
        <div className="bg-black w-[1px] h-[14px] hidden md:flex items-center justify-center"></div>
        <span className="font-medium text-xs py-0.5">Help</span>

      </div>

    </div>
  );
};

export default ProfileFooter;

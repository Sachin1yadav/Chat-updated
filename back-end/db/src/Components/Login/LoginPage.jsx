import React, { useState } from "react";
import Topbar from "../Topbar/Topbar";
import { Outlet, Navigate } from "react-router-dom";
import HumanIcon from "./Human.png";
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import "./login.css";
import networkLogo from "../../Assets/Images/networkLogo.png";

const LoginPage = () => {
  let userData = localStorage.getItem("userCredential");
  userData = JSON.parse(userData);
  if (userData?.isLoggedIn) {
    return <Navigate to="/select" />;
  }
  return (
    <>
      <div className="w-full flex justify-end bg-[#CDD6E8]">
        <Topbar />
      </div>
      <div className="w-full fullPage  h-[136vh] sm:h-[83vh]  lg:h-[82.8vh] xl:h-[90vh] sm:m-0 bg-[#CDD6E8]">
        <div className="w-full sm:h-[90%] flex flex-col md:flex-row ">
          <div className="md:w-[50%]  sm:py-8 flex items-center">
            <img src={networkLogo} className="w-full p-[10%]" alt="" />
          </div>
          {/* heigh of right page changed */}
          <div className="xs:w-[100%] md:w-[50%] flex justify-center items-center bg-[#CDD6E8] mt-[25px] xl:mt-0">
            <div className="bg-white w-[90%]  md:w-[80%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] lg:h-[100%] xl:h-[87%] 2xl:h-[50%] rounded-[20px] border-3">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;

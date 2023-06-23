import React, { useEffect, useState } from "react";
import Input from "../../Login/Content/InputBox/Input";
import ImageUploadDesign from "../ImageUploadDesign/ImageUploadDesign";
import LinkList from "./LinkList";
import DropdownList from "./DropdownList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { defaultCallOnVerficationPage } from "../../../redux/actionCreators/settingsActionCreator";

const VerificationRequest = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState({
    file1: null,
    file2: null,
  });
  const handleImage1 = (event) => {
    console.log("event.target.files[0]", event.target.files[0]);
    setFile({
      ...file,
      file1: event.target.files[0],
    });
  };

  const handleImage2 = (event) => {
    console.log("event.target.files[0]", event.target.files[0]);
    setFile({
      ...file,
      file2: event.target.files[0],
    });
  };
  const {profile} = useSelector((state)=>state.profileReducer)
const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(defaultCallOnVerficationPage(profile?.id));
  },[])
  return (
    <div className="bg-white border-2 w-[95%] sm:w-[50%] lg:w-[40%] mx-auto flex flex-col items-center px-4 gap-2 mt-1 rounded-xl pb-2">
      <h1 className="font-bold mt-2"> Welcome to verification process</h1>
      <p className="text-[10px] sm:text-xs lg:text-sm text-center">
        A Uynite Verified badged will be added next to your Profile Name, which
        makes your account as a Public Figure, Celebrity &amp; Global Brand.
      </p>
      <p className="text-[10px] sm:text-xs lg:text-sm text-blue-400 text-center mb-2">
        Submitting a request for verification does not guarantee that your
        Profile will get verified.
      </p>
      <Input title="xyz@gmail.com" />

      <DropdownList />

      <textarea
        name=""
        id=""
        className="rounded-lg text-xs p-2 border-2 w-full h-[120px]"
        placeholder="Tell us something about you..."
      ></textarea>

      <ImageUploadDesign
        title="*Upload Govt ID:"
        file={file.file1}
        handleImageChange={handleImage1}
      />
      <div className="w-full h-[2px] bg-gray-500"></div>
      <ImageUploadDesign
        title="*Upload Professional ID:"
        file={file.file2}
        handleImageChange={handleImage2}
      />

      <p className="w-full text-sm">
        Attach minimum 3 article which allows your profile is in public
        interest.
      </p>

      <p className="w-full text-sm">
        Note: 1.Paid or promotional contents won't be considered
      </p>
      <p className="w-full text-sm">
        2.Articles should be relevant to selected category
      </p>

      <LinkList />

      <div className=" flex gap-2">
        <input type="checkbox" name="" id="" className="cursor-pointer" />
        <p className="text-xs">
          I hereby declare that i have read and understood the
          <span className="text-blue-400"> Terms & Conditions</span>
        </p>
      </div>
      <div className="w-full h-[2px] bg-gray-500"></div>
      <button
        className="bg-blue-400 text-white w-[90%] text-sm py-2 font-bold rounded-lg"
        onClick={() => navigate("/confirmation-request")}
      >
        Submit
      </button>
    </div>
  );
};

export default VerificationRequest;

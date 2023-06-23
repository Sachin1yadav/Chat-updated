import React, { useState } from "react";
import Dropdownmenu from "./DropdownMenu/Dropdownmenu";
import PasswordInput from "../Login/Content/InputBox/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import ContactInformation from "./VerificationRequest/ContactInformation";
import SettingOptions from "./VerificationRequest/SettingOptions";
import Portals from "./../Portals/Portals";
import DeactivateAccountModal from "./VerificationRequest/DeactivateAccountModal";
import OldPassword from "./OldPassword";
import CreatenewPassword from "./CreatenewPassword";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addProfilePrivacy,
  checkOldPassword,
  updatePassword,
} from "../../redux/actionCreators/privacyAction";

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState(false);
  const reducerData = useSelector((state) => {
    return {
      profile: state.profileReducer.profile,
    };
  });
  const { profile } = reducerData;
  console.log("asjkhgasuyigasdjhgasdhjgfe", profile);
  const OldPasswordChange = () => {
    setOldPassword(true);
  };
  const [openDropdown, setOpenDropdown] = useState({
    changePassword: false,
    deActivate: false,
  });
  const [deActivateModal, setDeactivateModal] = useState(false);
  const onChangePassword = () => {
    setOpenDropdown({
      ...openDropdown,
      changePassword: !openDropdown.changePassword,
    });
  };

  const onDeactivateClick = () => {
    setDeactivateModal(true);
  };

  const onDeActivate = () => {
    setOpenDropdown({
      ...openDropdown,
      deActivate: !openDropdown.deActivate,
    });
  };

  const [state, setState] = useState({});
  const { privacy } = state;
  const options = [
    { title: "Public", value: "public" },
    { title: "Friends", value: "friends" },
    { title: "None", value: "none" },
  ];

  const dataList = [
    {
      title: "Email Address:",
      options,
      name: "email",
    },
    {
      title: "Phone Number:",
      options,
      name: "phone",
    },
    {
      title: "Date of Birth:",
      options,
      name: "dob",
    },
    {
      title: "Location:",
      options,
      name: "location",
    },
  ];

  const data = [
    {
      title: " Who can view your Contact Information ?",
      ChildComponent: ContactInformation,
      otherProps: { dataList },
      key: "contact",
    },
    {
      title: " Who can view your Profile ?",
      ChildComponent: Dropdownmenu,
      key: "profile",
    },
    {
      title: "Who can post on your Timeline ?",
      ChildComponent: Dropdownmenu,
      key: "timelinePost",
    },
    {
      title: "Who can view your Friend List ?",
      ChildComponent: Dropdownmenu,
      key: "friendList",
    },
  ];

  const handleCheckBtn = (optionValue, optionName) => {
    console.log(optionName, optionValue, "????????????????????????????");
    setState({ ...state, privacy: { ...privacy, [optionName]: optionValue } });
  };

  console.log(privacy);
  const handleClickSave = () => {
    const payload = {
      friendlist: privacy?.friendList,
      dob: privacy?.dob,
      email: privacy?.email,
      id: "630dbf9d67ceca0570e4bfca",
      location: privacy?.location,
      phonenumber: privacy?.phone,
      profileid: profile?.id,
      timeline: privacy?.timelinePost,
      updatedate: "Thu May 18 12:32:09 UTC 2023",
      viewprofile: privacy?.profile,
    };
    console.log("Proapppuyydd", payload);
    // dispatch({ type: "YYY"})
    dispatch(addProfilePrivacy(payload)).then((res) => {
      console.log("Resss", res);
      if (res?.status) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    });
  };

  const handlePasswordSave = (value = {}) => {
    const { confirmPassword, newPassword, oldPassword } = value;
    const userDetail = profile?.email ? profile?.email : profile?.mobile;

    const data = {
      uemail: userDetail,
      password: oldPassword,
    };
    console.log("DATttttttttt", data);
    const IsExistOldPassword = dispatch(checkOldPassword(data));
    if (!IsExistOldPassword?.status) {
      return toast.error(IsExistOldPassword?.message);
    }
    const payload = {
      uemail: userDetail,
      newPassword,
      confirmPassword,
    };

    console.log("DATtttpayloadtttttt", dpayloadta);
    dispatch(updatePassword(payload)).then((res) => {
      if (res?.status) {
        console.log("sdhliks;dfjoi;fsd");
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    });
  };

  const onHandleBlockedPage = () => {
    navigate("/blocklist-page");
  };
  return (
    <>
      <div className="w-[95%] sm:w-[50%] lg:w-[40%] bg-white border-2 mx-auto rounded-b-xl flex-col flex pb-4">
        {/* Privacy Section */}
        <section className="flex flex-col">
          <h1 className="text-md font-bold py-2 pl-2 bg-gray-500 ">Privacy</h1>
          {data?.map((elem) => (
            <SettingOptions
              handleClickSave={handleClickSave}
              type={elem?.key}
              key={elem?.key}
              elem={elem}
              handleCheckBtn={handleCheckBtn}
            />
          ))}
        </section>
        {/* --------------------------------------------- */}
        {/* Security Section */}
        <section className="flex flex-col gap-3 ">
          <h1 className="text-md font-bold bg-gray-500 w-full p-2">Security</h1>
          <div className="px-2 flex flex-col gap-2">
            <div
              className="flex cursor-pointer w-full py-1"
              id="changePassword"
              onClick={onChangePassword}
            >
              <h1 className="text-sm flex-1">Change your password</h1>
              <img
                src="./images/dropdown.png"
                alt=""
                className="w-[12px] h-[12px]"
              />
            </div>

            <div
              className="flex w-full"
              style={{
                display: openDropdown.changePassword ? "block" : "none",
              }}
            >
              {oldPassword ? (
                <CreatenewPassword />
              ) : (
                <OldPassword
                  handlePasswordSave={handlePasswordSave}
                  OldPasswordChange={OldPasswordChange}
                />
              )}
            </div>
          </div>
          <div className="px-2" onClick={onHandleBlockedPage}>
            <div className="flex cursor-pointer w-full my-2">
              <h1 className="text-sm flex-1">Blocked users</h1>
              <img
                src="./images/dropdown.png"
                alt=""
                className="w-[12px] h-[12px]"
              />
            </div>
          </div>
          <div className="px-2">
            <div
              className="flex cursor-pointer w-full my-2"
              onClick={onDeActivate}
            >
              <h1 className="text-sm flex-1">De-Activate Account</h1>

              <img
                src="./images/dropdown.png"
                alt=""
                className="w-[12px] h-[12px]"
              />
            </div>
            <div
              className="w-full flex flex-col"
              style={{
                display: openDropdown.deActivate ? "block" : "none",
              }}
            >
              <div className="flex w-[95%] gap-1 my-2 flex-col">
                <span className="text-blue-400 font-bold text-xs">Note:</span>
                <p className="text-xs">
                  Once De-Activate your account your Posts, Likes, Comments,
                  Profile, Friends, Kicks and Events will be hidden Until you
                  login again
                </p>
                <PasswordInput />
                <div className="flex text-white justify-end gap-2">
                  <button
                    className="bg-blue-400 w-[30%] sm:w-[25%] py-2 rounded-lg text-[10px] xl:text-xs"
                    onClick={onDeactivateClick}
                  >
                    De-Activate
                  </button>
                  <button className="bg-blue-400 w-[30%] sm:w-[25%] py-2 rounded-lg text-[10px] xl:text-xs">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[2px] bg-gray-500"></div>
          <div className="px-2">
            <Link to="/verification-request" className="text-sm">
              Do you want to get verified ?
            </Link>
          </div>
        </section>
      </div>

      {deActivateModal && (
        <Portals closeModal={() => setDeactivateModal(false)}>
          <DeactivateAccountModal setDeactivateModal={setDeactivateModal} />
        </Portals>
      )}
    </>
  );
};

export default Setting;

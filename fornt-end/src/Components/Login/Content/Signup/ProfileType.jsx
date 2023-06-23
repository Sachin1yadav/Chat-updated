import React, { useState, useEffect, useRef } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";

import Dropdown from "./Dropdown";
import Dropdown2 from "./Dropdown2";
import Input from "../InputBox/Input";
import user from "../../../../Assets/Images/user.png";
import {
  createProfile,
  getAssenbly,
  getCountryList,
  getDistrict,
  getLocationsList,
  getLoksabha,
  getOrgCategory,
  getStateList,
  isOtpValid,
  loginUser,
  uploadImage,
  userSingupInformation,
} from "../../../../redux/actionCreators/authActionCreator";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { toast } from "react-toastify";
import AutocompletePlace from "../../../googlemap/AutocompletePlace";
import { setDataOnStorage, toasterFunction } from "../../../Utility/utility";
import { imageUploadApi } from "../../../../redux/actionCreators/rootsActionCreator";
import Button2 from "../Button/Button2";
// import { *asYup } from 'yup';

const ProfileType = ({ modalType }) => {
  console.log("Modal Type", modalType);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orgCategory, setOrgCategory] = useState("");
  const ref = useRef();
  const reducerData = useSelector((state) => {
    return {
      organizationCategory: state.userReducer.orgCategory,
      userData: state.authReducer.signupData,
      countryList: state.authReducer.countryList,
      stateList: state.authReducer.stateList,
      districtList: state.authReducer.districtList,
      loksabhaList: state.authReducer.loksabhaList,
      assemblyList: state.authReducer.assemblyList,
    };
  });
  const {
    organizationCategory,
    userData,
    countryList,
    stateList,
    districtList,
    loksabhaList,
    assemblyList,
  } = reducerData;
  const [states, setState] = useState({});
  const [country, setCountry] = useState("");
  // let modalType = "Personal";
  const {
    selectedValue,
    imgFile,
    fname,
    lname,
    gender,
    dob,
    orgName,
    checkBox,
    state,
    district,
    loksabha,
    assembly,
    category,
    city,
    selectedCountry,
    selectedState,
    selectedDistrict,
    selectedLoksabha,
    selectedAssembly,
    selectedCategory,
  } = states;

  const isPersonal = modalType === "Personal";

  useEffect(() => {
    isPersonal ? dispatch(getCountryList()) : dispatch(getOrgCategory());
  }, []);
  const handleCountry = (val) => {
    setCountry("");
    setState({
      ...states,
      state: "",
      district: "",
      loksabha: "",
      assembly: "",
      city: "",
      selectedCountry: val,
    });

    dispatch(getStateList(val.code));
  };

  const orgCategoryFilteration = organizationCategory?.filter((item) => {
    if (orgCategory === "") {
      return true;
    }
    return item.category.toLowerCase().includes(orgCategory.toLowerCase());
  });

  const handleChange = (name, value) => {
    console.log("Value =========", value.statecode);
    const obj = {
      selectedState: getDistrict(value.statecode),
      selectedDistrict: getLoksabha(value.did),
      selectedLoksabha: getAssenbly(value.lid),
    };
    console.log("name", name);
    obj[name] && dispatch(obj[name]);
    if (value.length > 32) {
      setState({ ...states, [name]: value.slice(0, value.length - 1) });
    } else {
      setState({ ...states, [name]: value });
    }
  };
  const handleGender = (e) => {
    setState({ ...states, gender: e.target.id });
  };
  const handleDate = (e) => {
    setState({ ...states, dob: e.target.value });
  };
  const handleLiveLocationn = (location) => {
    // console.log(location, "LLLLLLLLL TTTTTTTTTTTTT");
    setState({ ...states, city: location });
  };
  const handleCreateProfile = async () => {
    const payload = {
      celibrity: false, //default value.
      countrycode: "+91", //default selected in signup screen..
      dob: moment(dob).format("YYYY-MM-DD"), //from user input
      email: userData.uemail, //from signup screen.
      fname: fname, //from user input BUSINESS NAME
      gender: gender,
      pimage: "", //if profile image is there, add the URL here.
      businesscategory: category?.category, //from user input selection.
      orgname: orgName,
      personalLastName: lname, //from user input – profile lnamein SLIDE 4
      personalname: fname, //from user input – profilefnamein SLIDE 4
      profiletype: isPersonal ? "Personal" : "Organization", //profile type, while we passing in signup screen
      updatedate: userData.datetime, //Current UTC time in milliseconds
      userid: userData.userId, // stored User ID from (Slide 3)
    };
    const payloads = {
      assembly: assembly?.assembly, //default value.
      celibrity: false,
      countrycode: "+91", //default selected in signup screen..
      country: country?.country,
      dob: moment(dob).format("YYYY-MM-DD"), //from user input
      email: userData.uemail, //from signup screen.
      fname: fname, //from user input BUSINESS NAME
      gender: gender,
      city: city,
      pimage: "", //if profile image is there, add the URL here.
      loksabha: loksabha?.loksabha,
      lname: lname, //from user input – profile lnamein SLIDE 4
      personalname: fname, //from user input – profilefnamein SLIDE 4
      profiletype: isPersonal ? "Personal" : "Organization", //profile type, while we passing in signup screen
      updatedate: userData.datetime, //Current UTC time in milliseconds
      userid: userData.userId, // stored User ID from (Slide 3)
    };
    const file = new FormData();
    file.append("file", imgFile);
    const data = isPersonal ? payloads : payload;
    if (
      isPersonal ? !(fname && dob) : !(category?.category && fname && orgName)
    ) {
      toasterFunction("Please enter required field");
      return;
    }
    imgFile
      ? dispatch(imageUploadApi(file)).then((res) => {
          data.pimage = res.data.path;
          dispatch(createProfile(data))
            .then(async (res) => {
              if (res.data.status) {
                toast.success(res.data.message);
                // navigate('/auth/login')
                try {
                  // dispatch(checkingIsEmailExist(email))
                  const userResponse = await dispatch(
                    loginUser({
                      uemail: userData.uemail,
                      password: userData.password,
                    })
                  );
                  console.log("userResponse", userResponse);
                  const userCredential = {
                    uemail: userResponse?.data.email,
                    isLoggedIn: userResponse?.data?.loginstatus,
                    token: userResponse?.data?.loginToken,
                    id: userResponse.data.id,
                  };
                  if (!userResponse?.status) {
                    navigate("/auth/login");
                    toast.error(userResponse.message);
                    return userResponse?.message;
                  }
                  // toast.success(userResponse?.message);
                  await setDataOnStorage(userCredential);
                  navigate("/select");
                } catch (error) {
                  console.log(error);
                }
              } else toast.error(res.data.message);
            })
            .catch((err) => {
              toast.error(err.message);
            });
        })
      : dispatch(createProfile(data))
          .then(async (res) => {
            if (res.data.status) {
              toast.success(res.data.message);
              // navigate('/auth/login')
              try {
                // dispatch(checkingIsEmailExist(email))
                const userResponse = await dispatch(
                  loginUser({
                    uemail: userData.uemail,
                    password: userData.password,
                  })
                );
                console.log("userResponse", userResponse);
                const userCredential = {
                  uemail: userResponse?.data.email,
                  isLoggedIn: userResponse?.data?.loginstatus,
                  token: userResponse?.data?.loginToken,
                  id: userResponse.data.id,
                };
                if (!userResponse?.status) {
                  toast.error(userResponse.message);
                  return userResponse?.message;
                }
                toast.success(userResponse?.message);
                await setDataOnStorage(userCredential);
                navigate("/select");
              } catch (error) {
                console.log(error);
              }
            } else toast.error(res.data.message);
          })
          .catch((err) => {
            toast.error(err.message);
          });
    // console.log(response);
  };
  const countryCode = ["1"];
  const removeProfilePic = () => {
    setState({ ...states, imgFile: "" });
  };

  const nameRules = /^(?=.*\d).{5,}$/;
  const validateName = (name) => {
    return nameRules.test(name);
  };
  const onNextClick = () => {
    const signupInfo = {
      imgFile,
      fname,
      lname,
      gender,
      dob,
      orgName,
      checkBox,
      profiletype: modalType,
    };
console.log("USERRRRRRRRRRRRRRRR", userData);

    dispatch(
      userSingupInformation({
        ...userData,
        ...signupInfo,
        profileType: modalType,
      })
    );
    dispatch(isOtpValid({ validOtp: true, userInfo: true }));
  };
  return (
    <div className="w-full rounded-[20px] flex flex-col h-full justify-evenly items-center gap-1 px-2 my-2">
      <div className="relative">
        <input
          id="profilePic"
          type="file"
          accept="image/*"
          className="hidden bg-blue-600"
          onChange={(e) => setState({ ...states, imgFile: e.target.files[0] })}
        />
        <label
          htmlFor="profilePic"
          className="flex justify-center items-center cursor-pointer w-[4rem] h-[4rem]  sm:w-[5rem] sm:h-[5rem] xl:w-[6rem] xl:h-[6rem] mx-auto rounded-full"
        >
          {imgFile ? (
            <>
              <img
                className={
                  "w-[rem] h-[rem] sm:w-[13rem] sm:h-[rem] lg:w-[rem] lg:h-[rem] xl:w-[6rem] xl:h-[6rem] mx-auto relative rounded-full block border-[2px] border-black"
                }
                src={URL.createObjectURL(imgFile)}
              />
            </>
          ) : (
            <img
              className={"w-full h-full border-[2px] border-black rounded-full"}
              src={user}
            />
          )}
        </label>
        {/* {imgFile && (
          <div
            className="absolute top-0 sm:top-2 right-[32%] sm:right[32%]  lg:right[36%] xl:right[33%] bg-white w-[24px] h-[24px] rounded-full border-1 border-white"
            // onClick={removeProfilePic}
          >
            <TiDeleteOutline size={24} />
          </div>
        )} */}
        <div className="">
          {/* bg-color, padding, font-weight of label changed */}
          <label
            htmlFor="profilePic"
            className="text-xs sm:text-sm lg:text-md opacity-1 cursor-pointer p-[4px 20px] rounded-xl text-[#6F6F6F] font-medium px-6"
          >
            {!isPersonal ? "Organization" : "Personal"}
          </label>
        </div>
      </div>

      {/* Input Fields  */}
      <div className="mx-auto w-[90%]">
        {/* last name field added */}
        <div className=" mb-1">
          <Input
            title="First Name*"
            name="fname"
            inputValue={states?.fname}
            onHandleChange={(e) => {
              if (e.target.value.length > 16) {
                setState({
                  ...states,
                  fname: e.target.value.slice(0, e.target.value.length - 1),
                });
              } else {
                setState({ ...states, fname: e.target.value });
              }
            }}
            className="w-full"
          />
        </div>
        {/* Lastname field was added */}
        <div className="mt-[2px]">
          <Input
            title="Last Name*"
            inputValue={states?.lname}
            name="lname"
            onHandleChange={(e) => {
              if (e.target.value.length > 16) {
                setState({
                  ...states,
                  lname: e.target.value.slice(0, e.target.value.length - 1),
                });
              } else {
                setState({ ...states, lname: e.target.value });
              }
            }}
            className="w-full"
            disabled={states?.fname === ""}
          />
        </div>
        {isPersonal ? (
          <>
            <input
              type="text"
              onChange={handleDate}
              className="w-full h-9 border-[1px] my-1 !p-2 text-[#AEB2B1] font-bold outline-none border-[#7E8082] rounded-[5px] text-xs"
              placeholder="Date of Birth*"
              max="2010-05-31"
              onFocus={() => (ref.current.type = "date")}
              onBlur={() => (ref.current.type = "text")}
              disabled={states?.fname === "" || states?.lname === ""}
              ref={ref}
            />
            {/* size of radio button incresed, accent color of button changed,
                    margin top of rdio button removed and margin added to input component*/}

            <div className="flex justify-between my-3 items-center">
              {/* input and label grouped in a div, padding added to label*/}
              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  name="gender"
                  id="Male"
                  className="h-5 w-4 accent-stone-500"
                  disabled={
                    states?.fname === "" ||
                    states?.lname === "" ||
                    states?.dob === undefined
                  }
                  onClick={(e) => handleGender(e)}
                />
                <label className="pl-2 text-sm sm:text-md">Male</label>
              </div>

              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  name="gender"
                  className="h-5 w-4 accent-stone-500"
                  id="Female"
                  disabled={
                    states?.fname === "" ||
                    states?.lname === "" ||
                    states?.dob === undefined
                  }
                  onClick={(e) => handleGender(e)}
                />
                <label className="pl-2  text-sm sm:text-md">Female</label>
              </div>

              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  name="gender"
                  className="h-5 w-4 accent-stone-500"
                  id="Other"
                  disabled={
                    states?.fname === "" ||
                    states?.lname === "" ||
                    states?.dob === undefined
                  }
                  onClick={(e) => handleGender(e)}
                />
                <label className="pl-2 text-sm sm:text-md">Other</label>
              </div>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              onFocus={() => (ref.current.type = "date")}
              onBlur={() => (ref.current.type = "text")}
              ref={ref}
              onChange={handleDate}
              className="w-full h-9 border-[1px] my-1 !p-2 text-[#AEB2B1] outline-none border-[#7E8082] rounded-[5px] text-xs font-bold"
              placeholder="Date of Birth*"
              max="2010-05-31"
            />

            <div className="flex justify-between items-center">
              {/* gender selection field, organization name added added */}
              <div className="flex my-2 justify-center items-center">
                <input
                  type="radio"
                  name="gender"
                  className="h-5 w-4 accent-stone-500"
                  id="Male"
                  onChange={(e) => handleGender(e)}
                />
                <label className="pl-2">Male</label>
              </div>

              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  name="gender"
                  className="h-5 w-4 accent-stone-500"
                  id="Female"
                  onChange={(e) => handleGender(e)}
                />
                <label className="pl-2">Female</label>
              </div>

              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  name="gender"
                  className="h-5 w-4 accent-stone-500"
                  id="Other"
                  onChange={(e) => handleGender(e)}
                />
                <label className="pl-2">Other</label>
              </div>
            </div>
          </>
        )}
        <div className="w-full flex flex-col mb-2">
          <div className="flex w-full gap-2 items-center justify-between relative">
            <input
              type="checkbox"
              name="checkbox"
              value={states?.checkBox}
              className="transparent"
              onChange={(e) =>
                setState({
                  ...states,
                  checkBox: !states?.checkBox,
                })
              }
              disabled={
                states?.fname === "" ||
                states?.lname === "" ||
                states?.dob === undefined ||
                states?.gender === undefined
              }
            />
            <p className="text-[10px] font-semibold text-[#7E8082] w-full">
              I agree to all
              <Link to="/auth/reals" className="text-[#05B7FD]">
                &nbsp; Terms, Data, Cookies & Privacy.
              </Link>
            </p>
            <br />
          </div>
          {/* {formik.touched.termsAndConditions &&
          formik.errors.termsAndConditions ? (
            <p className="text-[10px] text-[red] self-start w-[80%] ">
              {formik.errors.termsAndConditions}
            </p>
          ) : null} */}
        </div>
        <div className="w-full mb-4">
          <Button2
            title="Next"
            width="100%"
            disabled={
              states?.fname === "" ||
              states?.lname === "" ||
              states?.dob === undefined ||
              states?.gender === undefined ||
              states?.checkBox === false
            }
            onClick={onNextClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileType;

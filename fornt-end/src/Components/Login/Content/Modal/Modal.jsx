import Dropdown from "./Dropdown";
import React, { useEffect, useState, useRef } from "react";
import Dropdown2 from "./Dropdown2";
import Input from "../InputBox/Input";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TbPhotoPlus } from "react-icons/tb";
import user from "../../../../Assets/Images/user.png"
import {
  createProfile,
  getAssenbly,
  getCountryList,
  getDistrict,
  getLocationsList,
  getLoksabha,
  getOrgCategory,
  getStateList,
  loginUser,
  uploadImage,
} from "../../../../redux/actionCreators/authActionCreator";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import AutocompletePlace from "../../../googlemap/AutocompletePlace";
import { setDataOnStorage, toasterFunction } from "../../../Utility/utility";
import { TiDelete, TiDeleteOutline } from "react-icons/ti";
import Button2 from "../Button/Button2";
import { imageUploadApi } from "../../../../redux/actionCreators/rootsActionCreator";

const Modal = ({ modalType, handleClose }) => {
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
  const [country, setCountry] = useState("");
  const [states, setState] = useState({});
  const {
    imgFile,
    selectedValue,
    fname,
    lname,
    orgName,
    gender,
    dob,
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
  // let autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), { })
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
    console.log("Value =========",value.statecode);
    const obj = {
      selectedState: getDistrict(value.statecode),
      selectedDistrict: getLoksabha(value.did),
      selectedLoksabha: getAssenbly(value.lid),
    };
    console.log("name",name);
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

  return (
    {
      /* corner radius added to componenet */
    },
    (
      <div
        className=" bg-white w-[95%] sm:w-[95%] lg:w-[95%] h-[100vh] sm:h-[88%] lg:h-[90%] xl:w-[75%]  xl:h-[95%]  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50 text-center py-2"
        style={{
          // transform: "translate(-50%, -50%)",
          boxShadow: "0px 10px 8px #3f3f3fd9",
        }}
      >
        <h2 className="font-semibold text-xl border-b-[3px] border-grey-400 py-2">
          Let's Create Profile
        </h2>
        <div className="flex bg-white flex-col md:flex-row my-4 h-[118vh] sm:h-[80%]">
          <div className="md:w-1/2 mr-4 border-r-[3px] border-grey-400">
            {/* font-weight removed, font-size reduced, padding added,*/}
            <h2 className="text-xl py-3">Add Profile Picture</h2>
            <div className="relative">
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setState({ ...states, imgFile: e.target.files[0] })
                }
              />
              <label
                htmlFor="profilePic"
                className="flex justify-center items-center cursor-pointer w-[10rem] h-[10rem] sm:w-[13rem] sm:h-[13rem] lg:w-[14rem] lg:h-[14rem] xl:w-[15rem] xl:h-[15rem] mx-auto rounded-full bg-gray-200"
              >
                {imgFile ? (
                  <>
                    <img
                      className={
                        "w-[10rem] h-[10rem] sm:w-[13rem] sm:h-[13rem] lg:w-[14rem] lg:h-[14rem] xl:w-[15rem] xl:h-[15rem] mx-auto relative rounded-full block border-[1px] border-gray-500"
                      }
                      src={URL.createObjectURL(imgFile)}
                    />
                  </>
                ) : (
                  <img
                    className={
                      "w-full h-full"
                      // "w-[10rem] h-[10rem] sm:w-[13rem] sm:h-[13rem] lg:w-[14rem] lg:h-[14rem] xl:w-[15rem] xl:h-[15rem] mx-auto relative rounded-full block"
                    }
                    src={user}
                  />
                )}
              </label>
              {imgFile && (
                <div
                  className="absolute top-0 sm:top-2 right-[32%] sm:right[32%]  lg:right[36%] xl:right[33%] bg-white w-[24px] h-[24px] rounded-full border-1 border-white"
                  onClick={removeProfilePic}
                >
                  <TiDeleteOutline size={24} />
                </div>
              )}
              <div className="pt-6">
                {/* bg-color, padding, font-weight of label changed */}
                <label
                  htmlFor="profilePic"
                  className="text-xs sm:text-sm lg:text-lg cursor-pointer p-[4px 20px] rounded-xl py-2 text-[#05B7FD] font-medium mt-6 px-6"
                >
                  {!isPersonal ? "Organization" : "Personal"}
                </label>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 max-w-[25rem] px-2 relative bg-white">
            <div className="mx-auto">
              {/* last name field added */}
              <div className="mt-[9px] mb-1">
                <Input
                  title="First Name*"
                  name="fname"
                  inputValue={states?.fname}
                  onHandleChange={(e) => {
                    if (e.target.value.length > 16) {
                      setState({
                        ...states,
                        fname: e.target.value.slice(
                          0,
                          e.target.value.length - 1
                        ),
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
                        lname: e.target.value.slice(
                          0,
                          e.target.value.length - 1
                        ),
                      });
                    } else {
                      setState({ ...states, lname: e.target.value });
                    }
                  }}
                  className="w-full"
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
                        onClick={(e) => handleGender(e)}
                      />
                      <label className="pl-2">Male</label>
                    </div>

                    <div className="flex justify-center items-center">
                      <input
                        type="radio"
                        name="gender"
                        className="h-5 w-4 accent-stone-500"
                        id="Female"
                        onClick={(e) => handleGender(e)}
                      />
                      <label className="pl-2">Female</label>
                    </div>

                    <div className="flex justify-center items-center">
                      <input
                        type="radio"
                        name="gender"
                        className="h-5 w-4 accent-stone-500"
                        id="Other"
                        onClick={(e) => handleGender(e)}
                      />
                      <label className="pl-2">Other</label>
                    </div>
                  </div>
                  {isPersonal && (
                    <div className="w-full text-center text-[#7E8082] ">
                      <p>
                        We are collecting your location details to send event
                        invitations
                      </p>
                    </div>
                  )}
                  {/* <Dropdown name={"Date of birth"} options={[]} /> */}
                  <Dropdown2
                    style={"w-full"}
                    name={"Country*"}
                    // country={country}
                    inputValue={country}
                    options={countryList}
                    handleCountry={handleCountry}
                    selectedCountry={selectedCountry}
                    onHandleChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    setCountry={setCountry}
                    param="country"
                  />

                  {/* created Dropdown2 component, when selecting country new dropdowns are shown ,
                    for this local state added, a function created for
                    getting value from child componenet*/}

                  {selectedCountry ? (
                    <>
                      <div className="flex flex-col">
                        <div className="flex flex-col sm:flex-row  gap-[5px]">
                          <Dropdown
                            name={"State*"}
                            options={stateList}
                            selectedValue={state}
                            keyName={"state"}
                            inputValue={states?.state}
                            handleChange={(value) => {
                              handleChange("state", "");
                              handleChange("selectedState", value);
                            }}
                            selectedOption={selectedState}
                            onHandleChange={(e) =>
                              setState({
                                ...states,
                                state: e.target.value,
                              })
                            }
                          />

                          {console.log(
                            "selectedCountry?.code",
                            selectedCountry?.code
                          )}
                          {countryCode?.includes(selectedCountry?.code) && (
                            <Dropdown
                              name={"District*"}
                              options={districtList}
                              selectedValue={district}
                              keyName={"distric"}
                              inputValue={states?.district}
                              handleChange={(value) => {
                                handleChange("district", "");
                                handleChange("selectedDistrict", value);
                              }}
                              onHandleChange={(e) =>
                                setState({
                                  ...states,
                                  district: e.target.value,
                                })
                              }
                              selectedOption={selectedDistrict}
                            />
                          )}
                        </div>
                        {countryCode?.includes(selectedCountry?.code) && (
                          <>
                            <div className="flex flex-col sm:flex-row gap-[5px]">
                              <Dropdown
                                name={"Loksabha*"}
                                keyName={"loksabha"}
                                options={loksabhaList}
                                selectedValue={loksabha}
                                selectedOption={selectedLoksabha}
                                inputValue={states?.loksabha}
                                handleChange={(value) => {
                                  handleChange("loksabha", "");
                                  handleChange("selectedLoksabha", value);
                                }}
                                onHandleChange={(e) =>
                                  setState({
                                    ...states,
                                    loksabha: e.target.value,
                                  })
                                }
                              />
                              <Dropdown
                                name={"Assembly*"}
                                keyName={"assembly"}
                                options={assemblyList}
                                selectedValue={assembly}
                                selectedOption={selectedAssembly}
                                inputValue={states?.assembly}
                                handleChange={(value) => {
                                  handleChange("assembly", "");
                                  handleChange("selectedAssembly", value);
                                }}
                                onHandleChange={(e) =>
                                  setState({
                                    ...states,
                                    assembly: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </>
                        )}

                        <div className=" relative">
                          {/* <Input id='autocomplete' title="Living Location*" className="w-full" onHandleChange={ handleLiveLocationn}/> */}
                          <AutocompletePlace
                            livePlace={handleLiveLocationn}
                            map={false}
                            placeholder={"Living location"}
                            types={"cities"}
                            
                          />
                          {/* <input id="autocomplete" type="text"/> */}
                        </div>
                      </div>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  {/* as per documentation the address, intro, website
                    input fields are removed */}
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

                  <Input
                    type="search"
                    inputValue={states?.orgName}
                    title="Organization Name*"
                    onHandleChange={(e) =>
                      handleChange("orgName", e.target.value)
                    }
                  />
                  <Dropdown
                    name={"Organization Category*"}
                    options={organizationCategory}
                    handleChange={(value) => {
                      handleChange("category", "");
                      handleChange("selectedCategory", value);
                    }}
                    selectedOption={selectedCategory}
                    selectedValue={category}
                    keyName={"category"}
                    inputValue={orgCategory}
                    filteredData={orgCategoryFilteration}
                    onHandleChange={(e) => setOrgCategory(e.target.value)}
                  />
                </>
              )}
            </div>

            {/* create button positioned to top level div */}
            <div className="flex justify-center">
              <button
                className="flex justify-center"
                onClick={handleCreateProfile}
                // disabled={!states?.orgName && !states?.selectedOption}
              >
                <label
                  htmlFor=""
                  className="bg-[#48B2DB] w-52 text-xs sm:text-sm flex justify-center py-1 rounded-xl cursor-pointer mt-2 text-black font-medium"
                >
                  Create Profile
                </label>
              </button>
            </div>
          </div>
        </div>

        {/* <span
          className="absolute top-[5%] lg:right-[3rem] sm:top-[8%] xl:right-[12rem] xl:top-[12%] cursor-pointer"
          onClick={() => handleClose()}
        > 
          <AiOutlineCloseCircle size={25} className="text-gray-600" />
        </span>
        */}
      </div>
    )
  );
};

export default Modal;

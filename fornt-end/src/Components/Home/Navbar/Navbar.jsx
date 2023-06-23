import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import ProfileModal from "../Modal/ProfileModal/ProfileModal";
import NotificationModal from "../Modal/NotificationModal/NotificationModal";
import FriendsModal from "../Modal/FriendsModal/FriendsModal";
import { dataList, data } from "./data";
import { useSelector, useDispatch } from "react-redux";
import { isTabSelected } from "../../../redux/actionCreators/userActionCreator";
import { BsChevronCompactDown } from "react-icons/bs";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../Assets/Images/Logos.png"
import User from "../../../Assets/Images/user.png";
import "./navbar.css";
import { getUsers } from "../../../redux/actionCreators/friendsAction";
import ItemList from "../../common/ItemList";
import { debounce } from "../../Utility/utility";
import ProfileMenu from "./ProfileMenu";
import MenuDropdown from "../../common/MenuDropdown";

const Navbar = () => {
  const [profileModal, setProfileModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [friendsModal, setFriendsModal] = useState(false);
  const [state, setState] = useState({});
  const { searchInput = "" } = state;
  const { usersList } = useSelector((state) => state.friendReducer || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userFriendsModal = () => {
    setFriendsModal(!friendsModal);
  };
  
  const profile = useSelector((state) => state?.profileReducer?.profile);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 900;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile, location.pathname]);

  const userProfileModal = () => {
    setProfileModal(!profileModal);
  };

  const userNotificationModal = () => {
    setNotificationModal(!notificationModal);
  };

  const onHandleClick = (option) => {


    console.log("shdoisdjpsd",option);
    if (option.name === "Friends") {
      userFriendsModal();
    } else if (option.name === "Notifications") {
      userNotificationModal();
    } else {
      navigate(option.url);
    }
  };

  const handleFriendOption = (item) => {
    console.log(item);
    if (item === "Find Friend") {
      navigate(`/find-friend`);
    } else if (item === "My Friends") {
      navigate(`/myfriend`);
    } else if (item === "Friend Request") {
      navigate(`/friend-request`);
    }
  };

  const onClickSlectedTab = (option) => {
    dispatch(isTabSelected(option?.url));
    navigate(option.url);
  };

  function searchUser(value) {
    dispatch(getUsers(value));
  }
  const processChange = debounce((e) => searchUser(e));

  const handleChange = (e) => {
    const { value } = e.target;
    setState({ ...state, searchInput: value });
    if (value.startsWith("#")) {
    } else {
      // dispatch(getUsers())
      processChange(value);
    }
  };

  const handleListItem = (item) => {
    setState({ ...state, searchInput: "" });
    navigate(`/profile/${item?.id}`);
  };

  return (
    <section className="h-[65px] w-full fixed flex bg-white z-10 responsive_navbar2">
      {/* -------------------------------------------------------------------------------------------------------------------------------------------------- */}
      {/* Left Section */}
      <div className="flex h-[65px] flex-row justify-center items-center w-[28%]">
        {/* Logo Section */}

        <Link to="/root" className="w-[50px] mx-2 sm:mx-[14px] ml-5 lg:ml-0">
          <img
            src={Logo}
            alt=""
            className="w-[30px] h-[30px] lg:w-[52px] lg:h-[52px] "
          />
        </Link>

        {/* Search Bar Section */}
        <div className="hidden lg:flex w-[80%] h-[38px] rounded-xl items-center justify-center gap-2 border-[1px] border-[#C8C8C8] ">
          <input
            value={searchInput}
            type="text"
            className=" w-[88%] outline-none py-1 pl-3"
            placeholder="Search..."
            onChange={handleChange}
          />
          <img
            src="./images/Search.png"
            alt=""
            className="w-5 h-5 cursor-pointer"
          />
          {searchInput && (
            <div className="bg-white h-[400px] overflow-y-scroll overflow-x-hidden">
              {usersList?.map((item) => {
                return (
                  <ItemList
                    user
                    item={item}
                    handleListItem={() => handleListItem(item)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* --------------------------------------------------------------------------------------- */}
      <div className="responsive_navbar lg:w-[44%]">
        {/* Root */}
        <section className="w-full flex h-full items-end rounded-tl-xl rounded-tr-xl relative">
          <div className=" h-[80%] flex w-full rounded-t-md bg-white items-end px-2 pb-1 gap-0 lg:gap-3 md:px-2">
            {dataList?.map((elem) => (
              <div
                className="flex flex-col items-center w-[25%] sm:w-full px-2"
                onClick={() => onClickSlectedTab(elem)}
              >
                <div
                  className={`h-full flex items-center justify-center ${
                    isMobile ? "w-full text-center pt-1" : "w-[35px]"
                  }`}
                >
                  <img
                    src={
                      location.pathname?.includes(elem?.url)
                        ? elem?.afterIcon
                        : elem?.iconBefore
                    }
                    alt=""
                    className="w-[27px] lg:w-[35px]"
                  />
                </div>

                <div className="flex flex-col justify-center w-[85px] items-center">
                  <h1
                    className={`text-sm font-bold  ${
                      isMobile ? "text-center" : ""
                    }`}
                    style={{
                      color: location.pathname?.includes(elem?.url)
                        ? elem?.color
                        : "#6E6E6E",
                    }}
                  >
                    {elem?.name}
                  </h1>
                  <div
                    className="w-[80%] h-[2px]"
                    style={{
                      backgroundColor: location.pathname?.includes(elem?.url)
                        ? elem?.color
                        : "white",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ---------------------------------------------------------------------------------------------------- */}
      <div className="w-full lg:w-[28%] flex justify-end">
        <div className="w-[80%] flex justify-between items-center h-full px-4">
          {/* Peoples */}

          {/* U-Straem and Interests are removed */}

          {data?.map((elem) => (
            <div
              key={elem?.name}
              className="flex flex-col items-center justify-center gap-1 cursor-pointer relative text-[12px]"
              onClick={() => onHandleClick(elem)}
            >
              {elem?.name === "Friends" ? (
                <>
                  <MenuDropdown
                    classes={"mt-2"}
                    handleOption={handleFriendOption}
                    placement={"bottom-start"}
                    button={
                      <>
                        <img
                          src={elem?.icon}
                          className="ml-2 h-[25px] lg:h-[30px]"
                        />
                        {/* <div className=" font-bold">{elem?.name}</div> */}
                      </>
                    }
                    options={[
                      { name: "My Friends" },
                      { name: "Find Friend" },
                      { name: "Friend Request" },
                    ]}
                    itemClass={"font-bold"}
                  />
                </>
              ) : (
                <>
                  <img
                    src={elem?.icon}
                    alt={elem?.name}
                    className="h-[21px] lg:h-[26px] profile_img"
                  />
                  {/* <div className=" font-bold">{elem?.name}</div> */}
                </>
              )}
            </div>
          ))}

          {/* User Profile */}
          <div
            className="flex flex-col max-w-[250px] items-center cursor-pointer relative justify-center"
            onClick={userProfileModal}
          >
            {/* <img
              src={profile?.pimage || User}
              alt=""
              className="rounded-full object-cover w-[35px] h-[35px]"
            />
            <BsChevronCompactDown className="" /> */}

            <ProfileMenu data={profile} />
          </div>
          {/* {profileModal && <ProfileModal profile={profile} />} */}
          {notificationModal && <NotificationModal />}
          {/* {friendsModal && <FriendsModal setFriendsModal={setFriendsModal} />} */}
        </div>
      </div>
    </section>
  );
};

export default Navbar;

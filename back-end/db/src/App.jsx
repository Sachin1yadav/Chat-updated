import React, { useEffect } from "react";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import { Routes, Route, useActionData } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import Signup from "./Components/Login/Content/Signup/Signup";
import Login from "./Components/Login/Content/Login/Login";
import NewPassword from "./Components/Login/Content/NewPassword/NewPassword";
import EnterCode from "./Components/Login/Content/EnterCode/EnterCode";
import User from "./Components/User/User";
import Friends from "./Components/Home/Friends/Friends";
import WelcomePage from "./Components/Login/Content/WelcomePage/WelcomePage";
import { useDispatch, useSelector } from "react-redux";
import { settingUserLoginData } from "./redux/actionCreators/userActionCreator";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ThankuModal from "./Components/Home/Modal/ThankuModal/ThankuModal";
import SharePostModal from "./Components/Home/Modal/SharePostModal/SharePostModal";
import UserProfilePage from "./Components/Home/ProfilePage/ProfilePage";
import VerifiedAccount from "./Components/Home/VerifiedAccount/VerifiedAccount";
import OriginalPostModal from "./Components/Home/Modal/OriginalPostModal/OriginalPostModal";
import CreatePostModal from "./Components/Home/Modal/CreatePostModal/CreatePostModal";
import UpdateProfile from "./Components/Home/UpdateProfile/UpdateProfile";
import Kicks from "./Components/Home/KicksPage/Kicks";
import SearchKicksPage from "./Components/Home/SearchKicksPage/SearchKicksPage";
import MyFriendsPage from "./Components/Home/MyFriendsPage/MyFriendsPage";
import FindFriendsPage from "./Components/Home/SearchFriendPage/SearchFriendsPage";
import FriendRequestPage from "./Components/Home/SearchFriendPage/SearchFriendsPage";
import MainView from "./Layouts/MainView";
import ChatPages from "./Components/Home/ChatPages/ChatPages";
import Select from "./Components/Home/Select/Select";
import Umeet from "./Components/Home/Umeet/Umeet/Umeet";
import Event from "./Components/Event/Event";
import CommentBox from "./Components/Home/PostContetnt/PostCard/CommentBox/CommentBox";
import CommentMenuModal from "./Components/Home/Modal/CommentMenuModal/CommentMenuModal";
import SignupOtp from "./Components/Login/Content/EnterCode/SignupOtp";
import ProfilePage from "./Components/Home/ProfilePage/ProfilePage";
import axios from "axios";
import Setting from "./Components/Settings/Setting";
import VerificationRequest from "./Components/Settings/VerificationRequest/VerificationRequest";
import ConfirmationRequest from "./Components/Settings/VerificationRequest/ConfirmationRequest";
import BlockListPage from "./Components/Settings/BlockListPage";
import Locations from "./Components/googlemap/Locations";
import Unions from "./Components/Home/Unions/Unions";
import UnionsSearchList from "./Components/Home/Unions/UnionsSearchList";
import SingleUnionPage from "./Components/Home/Unions/SingleUnionPage";
import CreateUnion from "./Components/Home/Unions/CreateUnion";
import ContactUs from "./Components/Home/ContactUs/ContactUs";
import EventResultsPage from "./Components/Event/EventResultsPage";
import HashTagPage from "./Components/Home/SearchPage/HashTagPage";
import TermsAndConditions from "./Components/Home/ProfilePage/TermsAndConditionPage/TermsAndConditions";
import PrivacyPolicy from "./Components/Home/ProfilePage/PrivacyPolicy/PrivacyPolicy";
import { getProfileById } from "./redux/actionCreators/profileAction";
import Reals from "./screens/Reals/Reals";
import ProfileType from "./Components/Login/Content/Signup/ProfileType";
import CountrySelection from "./Components/Login/Content/Signup/CountrySelection";
import UserKicks from "./Components/Home/KicksPage/UserKicks";

const App = () => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.common["Content-Type"] = "application-json";
  axios.defaults.headers.common["Accept-Language"] = "en";
  const dispatch = useDispatch();
  const { isOtpValid, signupData, userInfo } = useSelector(
    (state) => state.authReducer
  );
  let userData = localStorage.getItem("userCredential");
  userData = JSON.parse(userData);

  const isUserLoggedIn = () => {
    if (userData === null) {
      dispatch(settingUserLoginData(false, {}));
    } else {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Content-Type"] = "application-json";
      axios.defaults.headers.common["Accept-Language"] = "en";
      dispatch(
        settingUserLoginData(userData?.isLoggedIn, {
          email: userData.uemail,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getProfileById(userData?.id));
    isUserLoggedIn();
  }, []);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("../../firebase-messaging-sw.js")
      .then((res) => {
        console.log("service worker registration successfull");
      })
      .catch((err) => console.log("service worker registration failed", err));
  }

  console.log("sdbjnnnnnnnnnnnnnnnnUser Info >>>>>>>",userInfo);
  return (
    <>
      <Routes>
        <Route path="/auth" element={<LoginPage />}>
          <Route path="signup" element={<Signup />} />

          <Route path="welcome" element={<WelcomePage />} />
          <Route path="reals" element={<Reals />} />
          <Route exact path="login" element={<Login />} />
          {/* <Route exact path="login" element={<ProfileType />} /> */}
          {/* <Route exact path="login" element={} /> */}

          <Route exact path="forgetpassword" element={<NewPassword />} />
          <Route
            exact
            path="entercode"
            element={<EnterCode title="Enter Code" />}
          />
          <Route
            exact
            path="verification"
            element={<EnterCode title="Email verification" />}
          />
          <Route
            exact
            path="verification/signup"
            element={
              isOtpValid?.validOtp && !isOtpValid?.userInfo ? (
                <ProfileType modalType={userInfo?.profileType} />
              ) : isOtpValid?.validOtp && isOtpValid?.userInfo ? (
                <CountrySelection modalType={userInfo?.profileType} />
              ) : (
                <SignupOtp title="Email verification" />
              )
            }
          />
          <Route exact path="createUser" element={<UpdateProfile />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="select" element={<Select />} />
          <Route path="/" element={<MainView />}>
            <Route path="/root" element={<Home />} />
            <Route path="kicks" element={<Kicks />} />
            <Route path="kicks/:segment" element={<Kicks />} />

            <Route path="veiwallkicks" element={<SearchKicksPage />} />
            <Route path="user-kicks/:id" element={<UserKicks />} />

            <Route path="myfriend" element={<MyFriendsPage />} />
            <Route
              path="find-friend"
              element={<FindFriendsPage isFriend={false} />}
            />
            <Route exact path="profile" element={<UserProfilePage />} />
            <Route path="profile/:id" element={<UserProfilePage isOthers= {true} />} />
            <Route
              path="friend-request"
              element={<FriendRequestPage isFriend={true} />}
            />
            <Route path="chat-page" element={<ChatPages />} />
            <Route path="umeet" element={<Umeet />} />
            <Route path="profile-page" element={<ProfilePage />} />
            <Route path="event" element={<Event />} />
            <Route path="events-result" element={<EventResultsPage />} />

            <Route path="edit-profile" element={<UpdateProfile />} />
            <Route path="settings" element={<Setting />} />
            <Route
              path="verification-request"
              element={<VerificationRequest />}
            />
            <Route
              path="confirmation-request"
              element={<ConfirmationRequest />}
            />
            <Route path="blocklist-page" element={<BlockListPage />} />

            <Route path="unions" element={<Unions />} />
            <Route path="unions-searchlist" element={<UnionsSearchList />} />
            <Route path="single-unions-page" element={<SingleUnionPage />} />
            <Route path="create-union" element={<CreateUnion />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="hashtag-page" element={<HashTagPage />} />
            <Route
              path="terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="reals" element={<Reals />} />

            {/* <Route path="user" element={<User />} /> */}
            {/* <Route path="friends" element={<Friends />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

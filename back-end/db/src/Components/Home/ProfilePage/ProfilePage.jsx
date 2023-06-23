import React, { useState } from "react";
import ProfileImageSection from "./ProfileImageSection/ProfileImageSection";
import CategorySection from "../CategorySection/CategorySection";
import PostForm from "../PostForm/PostForm";
import PostContent from "../PostContetnt/PostContent";
import AboutSection from "./AboutSection/AboutSection";
import PrivatePage from "./PrivatePage/PrivatePage";
import GridBoxes from "../GridBoxes/GridBoxes";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkFriend, getEducationDetail, getFollower, getFollowing, getFriendProfile, getProfileById, updateProfile } from "../../../redux/actionCreators/profileAction";
import { getUserDataFromLocalStorage, toasterFunction } from "../../Utility/utility";
import { useMemo } from "react";
import { checkingIsEmailExist } from "../../../redux/actionCreators/authActionCreator";
import { userData } from "../dataList";

import { getFriendsList } from "../../../redux/actionCreators/friendsAction";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import PostCard from "../PostContetnt/PostCard/PostCard";
import { createPost } from "../../../redux/actionCreators/postActionCreator";
import moment from "moment";
import { getUserPostList, imageUploadApi } from "../../../redux/actionCreators/rootsActionCreator";

const ProfilePage = ({ isOthers }) => {
  const [selectedOption, setSelectedOption] = useState("Posts");
  const dispatch = useDispatch();
  const params = useParams();

  
  const reducerData = useSelector((state) => {
    return {
      following: state?.profileReducer?.following,
      followers: state?.profileReducer?.followers,
      friends: state?.friendReducer?.friends,
      profileDetail: state?.profileReducer?.profileDetail?.data,
      friendDetail: state.profileReducer.friendDetail,
      profile: state.profileReducer.profile 
    }
  });
  const { following, followers, friends, friendDetail, profile} = reducerData;
  const isOther = isOthers && params?.id !== profile?.id

    const user = useMemo(() => {
    return  isOther ? { id: params?.id} : profile;
  }, [isOther, params.id])

  const isPersonal = isOther ? friendDetail?.profiletype === 'personal' : profile?.profiletype === "Personal";
  const [state, setState ] = useState({})
  const { coverImg, profileImg, showEditModal} = state
  useEffect(() => {
     isPersonal ? getEducation(): '';

    dispatch(checkingIsEmailExist())
     isOther ? dispatch(getFriendProfile(user?.id)).then((res) => {
       const payload ={
         ownProfileId: profile?.id,
         othersProfileId: user?.id,
       }
       dispatch(checkFriend(payload))
      if (!res.status) {
        toasterFunction(res.message);
        // toast.error(res.message)
      }
      else{
      }
    }): "";
    dispatch(getFollowing(user?.id));
    dispatch(getFollower(user?.id));
    dispatch(getFriendsList(user?.id));
    // dispatch
    dispatch(getUserPostList(user?.id));

  }, [params?.id]);


  function getEducation (){
    dispatch(getEducationDetail(user?.id))
  }
  return (
    <div className="w-full flex flex-col sm:flex-row justify-evenly bg-[#E4E7EC] mt-2">
      <section className="flex sm:w-[50%] flex-col mt-2 items-center lg:items-end">
        <ProfileImageSection
          data={ isOther ? friendDetail : profile }
          friends={friends}
          following={following}
          followers={followers}
          coverImg={coverImg}
          profileImg={profileImg}
          isOther={isOther}
          isPersonal={isPersonal}
        />

        {/* About Section */}
        <AboutSection isOther={isOther} data={isOther ? friendDetail : profile} />
      </section>
      <section className="flex sm:w-[50%] flex-col items-center">
        {/* Category Section */}
        <section className="w-full sm:w-[90%] flex items-center justify-between">
          <CategorySection
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </section>

        <section className="w-full mt-3 rounded-xl flex justify-center sm:w-[92%] lg:w-full xl:w-[93%]">
          <GridBoxes selectedOption={selectedOption} />
        </section>
      </section>
    </div>
  );
};

export default ProfilePage;

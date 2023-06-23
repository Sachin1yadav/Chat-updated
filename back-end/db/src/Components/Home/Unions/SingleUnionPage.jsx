import React from "react";
import UnionMembers from "./UnionMembers";
import { useDispatch, useSelector } from "react-redux";
import { unionsMembersTab } from "../../../redux/actionCreators/userActionCreator";
import { useEffect } from "react";
import { getInviteeList, getUnionMembers, removeUserFromUnion } from "../../../redux/actionCreators/unionActionCreator";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SingleUnionPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { unionMembersTab } = useSelector((state) => state.userReducer);
  const reducerData = useSelector((state) => {
    return {
      memberList: state.unionReducer.memberList,
      unionInviteeList: state.unionReducer.unionInviteeList,
      activePost: state.rootsReducer.activePost,
      profile: state.profileReducer.profile,
    }
  });
  const { profile, activePost, memberList, unionInviteeList} = reducerData

  useEffect(() => {
    dispatch(getUnionMembers(profile.id))
    dispatch(getInviteeList('id'))
  }, [])
  const onUnionMembersTabSelected = (option) => {
    dispatch(unionsMembersTab(option));
  };

  const handleRemove = (item) => {
    // console.log(item);
    const payload = {
      groupId: activePost?.groupId,
      profileId: item?.id
    }
    dispatch(removeUserFromUnion(payload)).then((res) => {
      if(res?.status){
        toast.success(res.message)
      }else {
        toast.error(res.message)
      }
    })

  }
  const membersTab = ["Members", "Invited Members"];
  return (
    <div className="w-[95%] sm:w-[50%] lg:w-[40%] bg-[#E4E7EC] mx-auto flex flex-col items-center gap-2 px-4 h-[89%] mt-1">
      <div className="flex gap-2 w-full h-[40px] py-2 mb-2">
        <img src="./images/events.jpg" alt="" className="w-[30px] h-[30px]" />
        <div className="flex-col flex flex-1">
          <h1 className="text-xs font-bold">{activePost?.groupName}</h1>
          <p className="text-gray-500 text-[10px]">
            {activePost?.count} Joined
          </p>
        </div>
        <button
          className="px-5 bg-blue-400 text-white font-bold py-1 text-[10px] rounded-lg"
          onClick={() => navigate("/unions-searchlist")}
        >
          Invite +
        </button>
      </div>

      <div className="w-full flex items-center">
        <div className="">
          <img
            src="./images/events.jpg"
            alt=""
            className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] rounded-full"
          />
        </div>
        <div className=" flex flex-1 flex-col justify-center ml-4">
          <span className="font-bold text-xs sm:text-sm">
            Abhi Personal Profile
          </span>
          <em>
            <p className="text-[9px] sm:text-[10px]  font-bold text-green-700">
              Admin
            </p>
          </em>
        </div>
      </div>

      <div className="flex justify-center gap-5 w-full">
        {membersTab?.map((elem) => (
          <button
            key={elem}
            className="w-[35%] bg-blue-400 text-white font-bold py-1 text-[10px] sm:text-xs rounded-lg"
            style={{
              backgroundColor: unionMembersTab === elem ? "#7991BD" : "#666567",
            }}
            onClick={() => onUnionMembersTabSelected(elem)}
          >
            {elem}
          </button>
        ))}
      </div>

      <div className="w-full h-full overflow-y-scroll mb-2 flex flex-col gap-3">
        {unionMembersTab === "Members" &&
          memberList?.map((item) => (
            <UnionMembers
              data={item}
              button="Remove"
              handleRemove={() => handleRemove(item)}
            />
          ))}

        {unionMembersTab === "Invited Members" &&
          unionInviteeList?.map((item) => (
            <UnionMembers
              data={item}
              button="Cancel"
              handleRemove={() => handleRemove(item)}
            />
          ))}
      </div>
    </div>
  );
};

export default SingleUnionPage;

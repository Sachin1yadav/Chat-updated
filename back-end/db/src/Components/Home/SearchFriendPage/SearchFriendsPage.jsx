import React, { useEffect, useState } from "react";
// import ChooseFreindsModal from "../Modal/ChooseFreindsModal/ChooseFreindsModal";
import Portals from "../../Portals/Portals";
import ChangeRelationshipModal from "../Modal/ChangeRelationshipModal/ChangeRelationshipModal";
import { useNavigate } from "react-router";
import { debounce } from "../../Utility/utility";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptFriendRequest,
  addFriend,
  findFriends,
  getMutualFriends,
  getRequestsList,
  getSuggestedFriends,
  getUserByMail,
  getUsers,
  removeFriend,
} from "../../../redux/actionCreators/friendsAction";
import user from "../../../Assets/Images/user.png";
import Loader from "../../common/Loader";
import moment from "moment/moment";
import { useMemo } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../../common/ConfirmationModal";
import { getMyUnion } from "../../../redux/actionCreators/unionActionCreator";
import { startFollowing } from "../../../redux/actionCreators/profileAction";

const SearchFriendsPage = ({ isFriend }) => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reducerData = useSelector((state) => {
    return {
      userList: state.friendReducer.usersList,
      profile: state.profileReducer.profile,
      requestList: state.friendReducer.requestList,
      unionList: state.unionReducer.myUnionList,
      mutualFriend: state.friendReducer.mutualFriends?.content,
    };
  });
  const { userList, profile, requestList, unionList, mutualFriend } =
    reducerData;
    const isPersonal = profile?.profiletype === 'Personal'
 

  const [sendRequest, setSendRequest] = useState(false);
  const [state, setState] = useState({ usersList: userList || []});
  const [searchQuery, setSearchQuery] = useState();
  const {
    acceptRequest,
    requestModal,
    activeProfile,
    loading,
    relationOptions,
    cancelModal,
    usersList,
    friendRequestList = requestList
  } = state;

  useEffect(() => {
    dispatch(getMyUnion(profile?.id));
    const params = {
      pageNumber: 0,
      pageSize: 20
    }
    if (isFriend) {
      dispatch(getRequestsList(profile?.id));
    } else {
      dispatch(getSuggestedFriends(profile?.id, params))
    }
    setSearchQuery("");
  }, [isFriend]);

  const options = useMemo(async () => {
    const union = unionList.map((item) => ({
      name: item.groupName,
      key: item.groupId,
      union: true
    }));

    const forPersonalAcc = [
      { name: "Friends", key: "friend", checked: true, disable: true },
      { name: "Relative", key: "relative", checked: false },
      { name: "Classmate", key: "classmate", checked: false },
      { name: "Officemate", key: "officemate", checked: false },
      ...union,
    ];
    const forOrgAcc = [
      { name: "Friend", key: "friend", checked: true, disable: true },
      ...union,
    ];
    setState({...state, relationOptions: isPersonal ? forPersonalAcc: forOrgAcc})
  }, [unionList]);
  
  const onSendRequest = () => {
    setSendRequest(true);
  };


  const onHandleCloseModal = () => {
    // setSendRequest(false);
    setState({ ...state, requestModal: false, cancelModal: false});
  };

  function showProfileDetail(id) {
    navigate(`/profile/${id}`);
  }
  const handleSendRequest = () => {
  const payloads = {
      myprofileid: profile?.id,
      followerprofileid: activeProfile?.id,
      datetimes: moment().format("YYYY-MM-DDTHH:mm:ss"),
    };
    dispatch(startFollowing(payloads));
    const { id, fname, lname } = profile || {};
    const data = relationOptions.flatMap((item) =>
      item.checked ? item.key : false
    );
    const userCredential = JSON.parse(localStorage.getItem('userCredential'));
    console.log(data.some((item) => item?.key === 'classmate'), data);
    const group = data?.filter((item) => item.union)
    let payload = {
      // private String friendtype;
      // private Boolean classment;
      // private Boolean relative;
      // private Boolean collgues;
      // private Boolean isFriend;
      // private Boolean party;
      // private Boolean org;
      // private String profileid;
      // private String userid;
      // private String requesttype;
      // private String reqdatetime;

      id: profile?.id,
      fname: fname,
      lname: lname,
      friendprofileid: activeProfile?.id,
      friendtype: "Friend",
      profileid: id,
      requesttype: "Send",
      isFriend: "true",
      
      classment: data.includes("classmate"),
      collgues: data.includes("officemate"),
      relative: data.includes("relative"),

      isFriend: true,
      party: "",
      groupsUpdate: group?.map((item) => (
        {
          groupId: item.key,
          groupName: item.name,
          isAdd: false,
          isRemove: false,
          profileid: activeProfile.id
        }
      )),
      userid: userCredential.id,
      reqdatetime: new Date().getTime(),
    };
    dispatch(addFriend(payload)).then((res) => {
      if (res.status) {
        toast.success(res?.message);
        setState({ ...state, requestModal: false });
      } else {
        toast.error(res?.message);
      }
    });
  };

  function searchUser(value) {
    setState({ ...state, loading: true });
    // var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const isEmail = value.match(validRegex);
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    if (isEmail) {
      dispatch(getUserByMail(value)).then((res) => {
        setState({ ...state, loading: false, usersList: res.data });
      });
    } else {
      dispatch(findFriends(value, profile.id)).then((res) => {
        if(true){
          setState({ ...state, usersList: res.data, loading: false });
        }
      });
    }
  }
  const processChange = debounce((e) => searchUser(e));
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if(isFriend){
      const list = requestList?.filter((item) => `${item.profile?.fname} ${item.profile?.lname}`.toLowerCase().includes(value?.toLowerCase()));
      setState({...state, friendRequestList: list})
    }else {
      value?.length > 2 && processChange(value);
    }
  };

  const sendFriendRequest = (id) => {
    console.log(id);
  };

  const handleRelation = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    // console.log(name, value);
    const selected = relationOptions.map((item) => {
      return item?.name === name ? { ...item, checked: value } : item;
    });
    setState({ ...state, relationOptions: selected });
  };

  const onCLoseModal = () => {
    setState({ ...state, acceptRequest: false, activeProfile: {} });
  };
  const handleConfirmationModal = (item) => {
    setState({ ...state, cancelModal: true, activeProfile: item });
  };
  const handleCancelRequest = () => {
    const payload = {
      profileid: profile?.id,
      // friendprofileid: activeProfile?.id
      friendprofileid: activeProfile.profile?.id,
    };
    dispatch(removeFriend(payload)).then((res) => {
      if (res?.status) {
        dispatch(getRequestsList(profile?.id))
        toast.success(res?.message);
        onHandleCloseModal(false);
      } else {
        toast.error(res?.message);
      }
    });
  };
  const handleAcceptRequest = () => {
    const { fname, lname, id } = activeProfile;
    const data = relationOptions.flatMap((item) =>
    item.checked ? item.key : false
  );
    const ownPayload  = {

      id: activeProfile?.profile.id,
      fname: profile?.fname,
      lname: profile?.lname,
      isFriend: true,
      friendprofileid: activeProfile?.profile.id,
      friendtype: "Friend",
      profileid: profile.id,
      requesttype: "Accepted",
      groupsUpdate: [],
      
      classment: data.includes("classmate"),
      collgues: data.includes("officemate"),
      relative: data.includes("relative"),

      reqdatetime: new Date().getTime(),
    }
    const payload = {
      id: activeProfile.friend?.id,
      fname: activeProfile.profile?.fname,
      lname: activeProfile.profile?.lname,
      isFriend: true,
      friendprofileid: profile.id,
      friendtype: "Friend",
      profileid: activeProfile?.profile.id,
      requesttype: "Accepted",
      groupsUpdate: [],

      classment: activeProfile?.friend?.classment,
      collgues: activeProfile?.friend?.collgues,
      relative: activeProfile?.friend?.relative ,

      reqdatetime: new Date().getTime(),
    };
    dispatch(acceptFriendRequest(ownPayload))
    dispatch(acceptFriendRequest(payload)).then((res) => {
      if (res?.status) {
        setState({...state, acceptRequest: false})
        toast.success(res.message);
        dispatch(getRequestsList(profile?.id))
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <>
      <div className="w-[100%] mt-2 flex-1 bg-[#E4E7EC] flex justify-center py-2 ">
        <div className="flex w-[95%] sm:w-[50%] lg:w-[40%] relative bg-white rounded-md flex-col items-center">
          {/* Search Section */}
          <section className=" w-[95%] flex rounded-md justify-between items-center bg-[#E4E7EC] my-2">
            <input
              disabled={loading}
              name="searchQuery"
              value={searchQuery}
              onChange={handleSearch}
              type="text"
              placeholder="Search ..."
              className="w-[94%] rounded-md pl-3 py-1.5 bg-[#E4E7EC] outline-none"
            />
            {/* search icon size reduced */}
            <span className="pr-3" onClick={() => searchUser(searchQuery)}>
              <img src="./images/Search.png" alt="" className="w-[19px]" />
            </span>
          </section>

          {/* Unknown Friends List Section */}
          <section className=" w-[95%] flex rounded-md flex-col mt-2 overflow-y-scroll">
            {loading && <Loader />}
            {!searchQuery && !isFriend ? (
              <>
                <div className="text-bold text-center text-[#05b7fd] mb-3">
                  Suggestions
                </div>
              </>
            ) : (
              ""
            )}
            {(isFriend
              ? friendRequestList
              : !searchQuery
              ? mutualFriend
              : usersList
            )?.map((item) => {
              const {
                fname = "",
                lname = "",
                id,
                profiletype,
                pimage,
              } = isFriend ? item?.profile : item || {};
              const { requesttype} = item?.friend || {}
              const isOrganization = profiletype === "Organization";
              return (
                <>
                  <div
                    className="cursor-pointer hover:bg-gray-300 flex w-full flex-col"
                    key={id}
                  >
                    <div className="bg-gray-500 w-full h-[1px] mb-1"></div>
                    <div className="flex items-center py-1 pr-[8px]">
                      <div
                        className="flex items-center gap-2 flex-1"
                        onClick={() => showProfileDetail(id)}
                      >
                        <img
                          src={pimage || user}
                          alt=""
                          className="w-[45px] h-[45px] rounded-full"
                        />
                        <span className="font-semibold text-[14px]">
                          {`${fname} ${lname}`}
                        { isFriend && <div className="font-normal italic text-xs">friend request {requesttype === 'Send' ? 'sent' : 'received'}</div>}
                        </span>
                      </div>
                      {!isOrganization && (
                        <div className="flex gap-2">
                          <img src="" alt="" />
                          {isFriend && item?.friend?.requesttype === 'Received' ? (
                            <img
                              src="./images/acceptFriendRequest.png"
                              alt=""
                              className="w-[30px] h-[30px] cursor-pointer"
                              onClick={() =>
                                setState({
                                  ...state,
                                  acceptRequest: true,
                                  activeProfile: item,
                                })
                              }
                              // onClick={onAcceptRequest}
                            />
                          ) :
                              !isFriend ?
                          <img
                              src="./images/SendFriendRequest.png"
                              alt=""
                              className="w-[30px] h-[30px] cursor-pointer"
                              onClick={() =>
                                setState({
                                  ...state,
                                  requestModal: true,
                                  activeProfile: item,
                                })
                              }
                            />
                            : ""}
                          
                          {isFriend && (
                            <img
                              src="./images/cancelRequest.png"
                              alt=""
                              className="w-[30px] h-[30px] cursor-pointer"
                              onClick={() => handleConfirmationModal(item)}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <hr className="border border-gray-50" /> */}
                </>
              );
            })}
          </section>
        </div>
      </div>

      {requestModal && (
        <Portals closeModal={onHandleCloseModal}>
          <ChangeRelationshipModal
            button="Send Request"
            title="Wanna Send Friend Request"
            relationOption={relationOptions}
            handleSendRequest={handleSendRequest}
            handleRelation={handleRelation}
            closeModalOption={onHandleCloseModal}
          />
        </Portals>
      )}

      {isFriend && acceptRequest && (
        <Portals closeModal={onCLoseModal}>
          <ChangeRelationshipModal
            relationOption={relationOptions}
            handleRelation={handleRelation}
            handleSendRequest={handleAcceptRequest}
            button="Accept Request"
            title="Confirm Friend Request"
            closeModalOption={onCLoseModal}
          />
        </Portals>
      )}
      {cancelModal && (
        <Portals closeModal={() => setState({ ...state, cancelModal: false })}>
          <ConfirmationModal
            title={"Are you sure?"}
            button={"Yes"}
            closeModal={() => setState({ ...state, cancelModal: false })}
            handleAccept={handleCancelRequest}
          />
        </Portals>
      )}
    </>
  );
};

export default SearchFriendsPage;

import React, { useMemo, useState } from "react";
import CommentMenuModal from "../Modal/CommentMenuModal/CommentMenuModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import UnfriendModal from "../Modal/UnfriendModal/UnfriendModal";
import Portals from "../../Portals/Portals";
import ChangeRelationshipModal from "../Modal/ChangeRelationshipModal/ChangeRelationshipModal";
import BlockModal from "../Modal/BlockModal/BlockModal";
import MenuDropdown from "../../common/MenuDropdown";
import User from "../../../Assets/Images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { getMyUnion } from "../../../redux/actionCreators/unionActionCreator";
import {
  getFriendsList,
  removeFriend,
  updateRelation,
} from "../../../redux/actionCreators/friendsAction";
import { toast } from "react-toastify";
import { blockUser } from "../../../redux/actionCreators/settingsActionCreator";

const FriendList = ({ icon, desc, handleMenuClick, data = {} }) => {
  const dispatch = useDispatch();
  const {
    fname,
    lname,
    id,
    profiletype = "Personal",
    userid,
    pimage,
  } = data.profile || {};
  const name = fname + lname;
  const action = [
    { name: "Un-Friend" },
    { name: "Change Relationship" },
    { name: "Block" },
  ];
  const friend = data?.friend;
  const relations = [
    friend?.isFriend && "friend",
    friend?.classment && "classmate",
    friend?.collgues && "colleague",
    friend?.relative && "relative",
  ];
  const profile = useSelector((state) => state.profileReducer.profile);

  const options = useMemo(() => {
    // dispatch(getMyUnion(profileid))
    const forPersonalAcc = [
      { name: "Friends", key: "friend", checked: true, disable: true },
      {
        name: "Relative",
        key: "relative",
        checked: relations.includes("relative"),
      },
      {
        name: "Classmate",
        key: "classmate",
        checked: relations.includes("classmate"),
      },
      {
        name: "Officemate",
        key: "officemate",
        checked: relations.includes("colleague"),
      },
    ];
    const forOrgAcc = [
      { name: "Friend", key: "friend", checked: true, disable: true },
    ];
    return {
      relation: profiletype === "Personal" ? forPersonalAcc : forOrgAcc,
    };
  }, []);

  const { relation } = options;

  const [state, setState] = useState({});
  const { relationOption = relation, selectedItem } = state;

  const handleRelation = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    const selected = relationOption?.map((item) => {
      return item?.name === name ? { ...item, checked: value } : item;
    });
    setState({ ...state, relationOption: selected });
  };
  const [modalType, setModalType] = useState({
    unFriend: false,
    changeRelationship: false,
    block: false,
  });
  const openModalOption = (optionName) => {
    if (optionName === "Un-Friend") {
      setModalType({
        ...modalType,
        unFriend: true,
      });
    } else if (optionName === "Change Relationship") {
      setModalType({
        ...modalType,
        changeRelationship: true,
      });
    } else {
      setModalType({
        ...modalType,
        block: true,
      });
    }
  };

  const closeModalOption = () => {
    setModalType({
      ...modalType,
      unFriend: false,
      changeRelationship: false,
      block: false,
    });
  };

  const handleUnfriend = () => {
    // console.log(data, selectedItem);

    const payload = {
      profileid: profile?.id,
      friendprofileid: selectedItem?.id,
    };
    dispatch(removeFriend(payload)).then((res) => {
      if (res?.status) {
        closeModalOption();
        toast.success(res?.message);
        dispatch(getFriendsList(profile?.id));
        setModalType({ ...modalType, unFriend: false });
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleUpdateRelation = () => {
    const userid = JSON.parse(localStorage.getItem('userCredential')).id
    const relations = relationOption.flatMap(
      (item) => item.checked && item?.name
    );

    const payloads = {
      classment: relations.includes("Classmate"),
      collgues: relations.includes("Officemate"),
      fname: profile?.fname,
      friendprofileid: selectedItem?.id,
      friendtype: "Friend",
      org: false,
      isFriend: true,
      party: true,
      lname: profile?.lname,
      profileid: profile?.id,
      relative: relations.includes("Relative"),
      reqdatetime: new Date().valueOf(),
      requesttype: "Accepted",
      "groupsUpdate":[],
      id: data.friend?.id,
      userid: userid,
    };

    const relation = relationOption?.find(
      (item) => item?.checked && !item.disable
    );
    const payload = {
      user1: profile?.id,
      user2: selectedItem?.id,
      relation: relation?.name,
    };
    dispatch(updateRelation(payloads)).then((res) => {
      if (res?.status) {
        setModalType({...modalType, changeRelationship: false});
        dispatch(getFriendsList(profile?.id))
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    });
  };

  const handleBlock = (data) => {
    const payload = {
      blockedid: id,
      myprofileid: profile.id,
    };
    dispatch(blockUser(payload)).then((res) => {
      if (res?.status) {
        dispatch(getFriendsList(profile.id));
        toast.success(res.message);
        setModalType({ ...modalType, block: false });
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <div className="flex hover:bg-gray-300 h-[50px] px-4 items-center py-2 relative">
        {/* {openMenuModal && <CommentMenuModal data={data} leftPosition={50} topPosition={34}/>} */}

        <Link to={`/profile/${userid}`} className="">
          <img
            src={pimage || User}
            alt=""
            className="w-[45px] h-[45px] rounded-full"
          />
        </Link>
        <Link
          to={`/profile/${userid}`}
          className=" flex flex-1 flex-col justify-center ml-4"
        >
          <span className="font-medium ">
            {name ? `${fname} ${lname || ""}` : "User"}
          </span>
          {
            <p className="text-[12px] font-bold text-gray-500">
              {relations.map((item) => {
                return <span className="mr-1">{item ? `${item}, ` : ""}</span>;
              })}
            </p>
          }
        </Link>
        {icon ? (
          <div>
            <MenuDropdown
              button={
                <div
                  onClick={() =>
                    setState({ ...state, selectedItem: data?.profile, friendid: data?.friend?.id })
                  }
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <BsThreeDotsVertical className="" size={18} />
                </div>
              }
              options={[
                { name: "Un-Friend" },
                { name: "Change Relationship" },
                { name: "Block" },
              ]}
              handleOption={openModalOption}
            />
          </div>
        ) : null}
      </div>

      {modalType.unFriend && (
        <Portals closeModal={closeModalOption}>
          <UnfriendModal
            handleUnfriend={handleUnfriend}
            closeModalOption={closeModalOption}
          />
        </Portals>
      )}
      {modalType.changeRelationship && (
        <Portals closeModal={closeModalOption}>
          <ChangeRelationshipModal
            title="Change Relationship"
            button="Update"
            closeModalOption={closeModalOption}
            relationOption={relationOption}
            handleRelation={handleRelation}
            handleSendRequest={handleUpdateRelation}
          />
        </Portals>
      )}
      {modalType.block && (
        <Portals closeModal={closeModalOption}>
          <BlockModal
            handleBlock={handleBlock}
            closeModalOption={closeModalOption}
          />
        </Portals>
      )}
    </>
  );
};

export default FriendList;

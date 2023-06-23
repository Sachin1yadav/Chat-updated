import React, { useEffect, useState } from "react";
import SearchComponent from "../Home/SearchComponent/SearchComponent";
import Portals from "../Portals/Portals";
import OopsModal from "./BlockList/OopsModal";
import { useDispatch, useSelector } from "react-redux";
import { getBlockedUser } from "../../redux/actionCreators/privacyAction";
import {
  blockedFriendList,
  searchBlockedFriend,
  unBlockFriend,
} from "../../redux/actionCreators/settingsActionCreator";
import profileReducer from "./../../redux/reducers/profileReducer";

const BlockListPage = () => {
  const dispatch = useDispatch();
  const [unblockModal, setUnBlockModal] = useState(false);
  const [state, setState] = useState({});
  const { blockedUser } = state;
  const { profile } = useSelector((state) => state.profileReducer);
  const { friendBlockList, searchBlockedFriend } = useSelector(
    (state) => state.settingReducer
  );
  console.log("searchBlockedFriend", searchBlockedFriend);
  useEffect(() => {
    dispatch(getBlockedUser()).then((res) => {
      if (res?.status) {
        setState({ ...state, blockedUser: res?.data });
      }
    });

    dispatch(blockedFriendList(profile?.id));
  }, []);
  const onUnblockClick = (userDetails) => {
    console.log("userDetail[[[[[[[]]]]]]", userDetails);
    console.log("userDetail[[[[[[[2222222]]]]]]", userDetails?.friendprofileid);

    dispatch(
      unBlockFriend(userDetails?.friend?.profileid, userDetails?.profile?.id)
    );
    setUnBlockModal(true);
  };

  const onOkClick = () => {
    setUnBlockModal(false);
  };
  const [onInputChange, setOnInputChange] = useState("");
  const onHandleChange = (event) => {
    setOnInputChange(event.target.value);
    dispatch(searchBlockedFriend(profile?.id, onInputChange));
  };

  return (
    <>
      <div className="w-[95%] sm:w-[50%] lg:w-[40%] mx-auto bg-[#E4E7EC] px-3 h-[88%] mt-[5px] flex gap-3 flex-col pt-2 ">
        <SearchComponent
          bgColor="white"
          placeholder="Search here to unblock"
          classes={"border-2"}
          handleChange={onHandleChange}
          inputValue={onInputChange}
        />

        <div className="flex flex-col gap-3 overflow-y-scroll pb-2 ">
          {friendBlockList?.length ? (
            friendBlockList?.map((elem) => (
              <div className="flex gap-2" key={elem?.friend?.id}>
                <div className="flex-1 flex items-center gap-2">
                  <img
                    src={
                      elem?.profile?.pimage
                        ? elem?.profile?.pimage
                        : "./images/events.jpg"
                    }
                    alt=""
                    className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] rounded-full"
                  />
                  <span className="text-[10px] sm:text-xs lg:text-sm font-bold">
                    {elem?.profile?.fname}
                  </span>
                </div>
                <button
                  className="text-blue-400 text-[8px] sm:text-[10px] lg:text-xs border-2 font-bold py-1 w-[15%] rounded-sm border-blue-400 self-end"
                  onClick={() => onUnblockClick(elem)}
                >
                  Unblock
                </button>
              </div>
            ))
          ) : (
            <h1 className="w-full text-center"> There Is No Blocked Friend</h1>
          )}
        </div>
      </div>

      {unblockModal && (
        <Portals closeModal={onOkClick}>
          <OopsModal onOkClick={onOkClick} />
        </Portals>
      )}
    </>
  );
};

export default BlockListPage;

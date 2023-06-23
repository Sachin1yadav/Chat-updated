import React, { useEffect } from "react";
import LikeIcon from "../../../../Assets/Images/afterLike.png";
import LikedProfile from "./LikedProfile";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { getPostLike } from "../../../../redux/actionCreators/postActionCreator";
import { useState } from "react";
const LikeModal = ({ closeLikeModal }) => {
  const dispatch = useDispatch();
  const reducerData = useSelector((state) => {
    return {
      // allLikesList: state.postReducer.postLikes,
      activePost: state.rootsReducer.activePost,
    };
  });
  const { activePost, postLikes } = reducerData;
  const [state, setState] = useState({});
  const { allLikesList } = state;
  useEffect(() => {
    let payload = {
      pageNumber: 0,
      pageSize: 10,
    };
    dispatch(getPostLike(activePost?.id, payload)).then((res) => {
      if (res?.status) {
        setState({ ...state, allLikesList: res.data });
      }
    });
  }, []);
  return (
    <div
      className="w-[95%] sm:w-[50%] lg:w-[30%] h-[74%] bg-white rounded-3xl px-4 flex flex-col gap-2 pt-2 fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <div className="flex w-full  items-center">
        <div className="flex-1 gap-1 items-center flex justify-center">
          <img src={LikeIcon} alt="" className="w-[30px] h-[30px]" />
          <h1>{allLikesList?.content?.length || 0} Likes</h1>
        </div>
        <RxCrossCircled
          size={20}
          className="cursor-pointer"
          onClick={closeLikeModal}
        />
      </div>
      <div className="w-full h-[1px] bg-gray-500"></div>
      <div className="w-full h-full overflow-y-scroll">
        {allLikesList?.content?.map((item) => {
          return <LikedProfile data={item} />;
        })}
      </div>
    </div>
  );
};

export default LikeModal;

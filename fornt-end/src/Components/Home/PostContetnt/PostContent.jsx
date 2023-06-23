import React, { useRef, useState } from "react";
import PostCard from "./PostCard/PostCard";
import ReportModal from "../Modal/ReportModal/ReportModal";
import userData from "../dataList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPostWithLimit,
  getPostList,
} from "../../../redux/actionCreators/rootsActionCreator";
import useObserver from "../../Utility/custom/useObserver";

const PostContent = ({ data, showModalFunc, width, userData }) => {
  const ref = useRef({})
  const dispatch = useDispatch();
  const reducerData = useSelector((state) => {
    return {
      profile: state.profileReducer.profile,
      postList: state.rootsReducer.postList || [],
    };
  });
  const { profile, postList = [] } = reducerData;
  const observe = useObserver(ref, fetchData );
  const [state, setState] = useState({})
  const { index = 0, getList} = state

  useEffect(() => {
    const params = {
      index : index ? index + 1 : 0,
      size: 10
  }
    dispatch(getAllPostWithLimit(profile?.id, params)).then((res) => {
      if(res.status){
        setState({...state, index: 1})
      }
    });
  }, []);

  function fetchData () {
    const params = {
      index : index ? index + 1 : 0,
      size: 10
  }
    dispatch(getAllPostWithLimit(profile?.id, params)).then(res => {
      if(res?.status) setState({...state, index: index + 1})
    })
  }
  return (
    <div className="w-full flex items-center justify-center flex-col cursor-pointer">
      {postList?.map((elem, index) => (
        <div ref={(index+1) % 10 === 0 ? ref: null} className=" sm:w-[50%] lg:w-[40%] flex items-center justify-center flex-col px-2">
          <PostCard
            key={elem?.id}
            item={elem}
            userData={userData}
            showModal={showModalFunc}
            width={width}
          />
        </div>
      ))}
    </div>
  );
};

export default PostContent;

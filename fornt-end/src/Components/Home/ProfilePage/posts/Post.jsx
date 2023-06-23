import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInstancePost,
  getUserPostList,
} from "../../../../redux/actionCreators/rootsActionCreator";
import PostForm from "../../PostForm/PostForm";
import PostCard from "../../PostContetnt/PostCard/PostCard";
import userData from "../../dataList";
import { isEmpty } from "../../../Utility/utility";
import EmptyComponent from "../../../empty component/EmptyComponent";
import { useParams } from "react-router-dom";

const Post = () => {
  // 6451d620e3601831e45125da
  const reducerData = useSelector((state) => {
    return {
      profile: state.profileReducer.profile || {},
      postList: state.profileReducer.userPostList || [],
    };
  });
  const { profile, postList = [] } = reducerData;
  const params = useParams()
  const isOther = params.id ? params.id !== profile?.id : false

  return (
    <div className="flex flex-col justify-center items-center ">
    {
      !isOther &&
      <div className="w-full flex py-1 sm:w-[50%] lg:w-[100%] rounded-lg pl-2 mt-2">
        <PostForm rightIcon />
      </div>
    }
      {
        isEmpty(postList)
          ?
          <div>
            <EmptyComponent message={'No post'} />
          </div>
          :
          postList?.map((post) => {
            const { userData, id } = post;
            return (
              <div key={id} className="w-full flex items-center justify-center flex-col ">
                <PostCard userData={userData || []} item={post} />
              </div>
            );
          })
      }
    </div>
  );
};

export default Post;

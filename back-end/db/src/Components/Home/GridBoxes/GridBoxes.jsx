import React from 'react'
import Post from '../ProfilePage/posts/Post';
import PostPhotos from "../ProfilePage/posts/PostPhotos";
import PostVideo from "../ProfilePage/posts/PostVideo";
import PostKicks from "../ProfilePage/posts/PostKicks";
import { useSelector } from 'react-redux';
import { useMemo } from 'react';


const GridBoxes = ({selectedOption}) => {

  const { userPostList } = useSelector((state) => state.profileReducer);

  const data = useMemo(() => {
    const photo = userPostList?.filter((item) => {
      return item?.image
    })
    const video = userPostList?.filter((item) => {
      return item?.video
    })
    return {photo: photo,
      video: video
    };
  }, [userPostList?.length])

  return (
    <div className="w-[95%] sm:w-[95%] lg:w-[85%] xl:w-[95%] flex text-center rounded-xl">
      {
        <div className="rounded-lg w-full">
          {selectedOption === "Posts" && <Post />}
          {selectedOption === "Photos" && <PostPhotos data={data?.photo} />}
          {selectedOption === "Videos" && <PostVideo data={data?.video} />}
          {selectedOption === "Kicks" && <PostKicks />}
        </div>
      }
    </div>
  );
}

export default GridBoxes;

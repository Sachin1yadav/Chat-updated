import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import ButtonComponent from "./ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import Participate from "./Participate";
import EventPostCard from "./EventPostCard";
import {
  defaultEventScreen,
  getAllEventPost,
  getAllTrendingPost,
} from "../../redux/actionCreators/eventActionCreator";
import { getAllPostWithLimit } from "../../redux/actionCreators/rootsActionCreator";
import { sponseredTabSelected } from "../../redux/actionCreators/userActionCreator";
import PostCard from "../Home/PostContetnt/PostCard/PostCard";

const Event = () => {
  const btnData = [
    { name: "Post" },
    { name: "Trending" },
    { name: "Participate" },
  ];
  const { defaultEventData, defaultRootData, allEventsPost, allTrendingPost } =
    useSelector((state) => state.eventReducer);

  // const {postList} = useSelector((state)=>state.rootsReducer)
  useEffect(() => {
    if (Object.keys(defaultRootData)?.length) {
      dispatch(defaultEventScreen(defaultRootData?.data?.postdata?.id));
      dispatch(
        getAllEventPost(
          defaultRootData?.data?.postdata?.id,
          defaultRootData?.data?.postdata?.profileid
        )
      );
      dispatch(
        getAllTrendingPost(
          defaultRootData?.data?.postdata?.id,
          defaultRootData?.data?.postdata?.profileid
        )
      );
    }
  }, [defaultRootData]);
  const dispatch = useDispatch();

  const image = defaultEventData?.data?.image.split(" @ ").splice(1);
  const { eventTabSelected } = useSelector((state) => state.userReducer);

  const onSelectedTab = (option) => {
    console.log("option", option);
    dispatch(sponseredTabSelected(option));
  };
  return (
    <div className="w-full bg-[#EAE9E7] flex flex-col flex-1 items-center">
      <div className="header h-16 w-[95%] sm:w-[50%] lg:w-[40%] mt-2 rounded-md flex justify-center items-center text-lg text-white font-bold bg-[#7991BD]">
        <h1>
          {defaultEventData?.data?.tital
            ? defaultEventData?.data?.tital
            : "Travel"}
        </h1>
      </div>
      <div className="slider w-[95%] sm:w-[50%] lg:w-[40%] bg-[#EAE9E7] mt-2">
        <Carousel>
          {image?.map((img) => (
            <img
              key={img}
              src={img ? img : "./images/events.jpg"}
              alt=""
              className="w-[100%] h-[70vh] object-cover rounded-[20px]"
            />
          ))}
        </Carousel>
      </div>
      <div className="flex justify-center gap-2 mt-5 h-16 items-center w-[95%] sm:w-[50%] lg:w-[40%] rounded-lg bg-white">
        {btnData?.map((elem, index) => (
          <ButtonComponent
            key={index}
            name={elem?.name}
            index={index}
            onClick={onSelectedTab}
          />
        ))}
      </div>
      <div className="w-[95%] sm:w-[50%] lg:w-[40%] flex flex-col items-center justify-center gap-4 mt-2">
        {eventTabSelected === "Post" &&
          allEventsPost?.map((item) => (
              <div className="  w-full flex items-center justify-center flex-col">
                <PostCard item={item} />
              </div>
            ))
        }

        {eventTabSelected === "Trending" &&
          allTrendingPost !== null &&
          // allTrendingPost?.map((post) =>
          //   Object.values(post?.data)?.map((item, index) => (
          //     <EventPostCard key={index} item={item} />
          //   ))
          allTrendingPost?.map((item) => (
              <div className=" w-full flex items-center justify-center flex-col">
                <PostCard item={item} />
              </div>
            ))
          }

        {eventTabSelected === "Participate" && <Participate />}
      </div>
    </div>
  );
};

export default Event;

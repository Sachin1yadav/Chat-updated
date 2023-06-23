import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getLatestKicks } from "../../../redux/actionCreators/kicksActionCreator";
import user from '../../../Assets/Images/user.png'

const SliderSection = () => {
  // const { kicksList } = useSelector((state) => state.rootsReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const reducerData = useSelector((state) => {
    return {
      kicksList: state.kicksReducer.latestKicks,
      profile: state.profileReducer.profile,
    };
  });
  const { kicksList = { content: [] }, profile } = reducerData;

  useEffect(() => { }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <div className="flex flex-col w-[95%] sm:w-[50%]  lg:w-[40%] relative">
      <div className="flex justify-between w-full p-2">
        <span className="font-bold text-sm">Recent Kicks</span>
        <span className="text-sm text-[#788eb7] font-medium">
          <Link to="/kicks/Latest">View All</Link>
        </span>
      </div>
      <Carousel
        responsive={responsive}
        arrows={true}
        containerClass={`w-full h-[200px] z-[1]`}
      >
        {kicksList?.content?.map((data) => {
          const { profile, video, image } = data || {};
          const shortName = ` ${profile?.fname} ${profile?.lname}`;
          return (
            <div className="w-[91%] h-[200px] relative bg-black rounded-2xl overflow-hidden ml-1">
              {/* <div> */}
                <Link to={'/kicks'} className="h-full">
                  {
                    image ?
                      <>
                        {/* <picture
                          height={"100%"}
                          className="h-full overflow-hidden"
                          width={"200px"}
                        > */}
                          {/* <source src={image} type="video/mp4"></source> */}
                          <img className="h-full w-full" src={image} />
                        {/* </picture> */}
                      </>
                      :
                      <>
                        <video
                          height={"100%"}
                          className="h-full"
                          width={"200px"}
                          src={video}
                          muted
                          typeof="video/mp4"
                        >
                          <source src={video} type="video/mp4"></source>
                        </video>
                      </>
                  }

                </Link>
                {/* title name tag added */}
                <div className="absolute cursor-pointer bottom-[10px] mx-2 items-center flex gap-2">

                <img
                  src={profile?.pimage || user}
                  alt=""
                  className="w-9 h-9 rounded-full "
                  onClick={() => navigate(`/profile/${profile.id}`)}
                />
                <span onClick={() => navigate(`/profile/${profile.id}`)}
                  className=" text-white font-medium text-[13px]">
                  {`${shortName?.length > 6 ? shortName.slice(0, 6) : shortName} `}
                </span>
                </div>
              {/* </div> */}
            </div>
          );
        }) || []}
      </Carousel>
    </div>
  );
};

export default SliderSection;

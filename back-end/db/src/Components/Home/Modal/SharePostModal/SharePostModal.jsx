import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Portals from "../../../Portals/Portals";
import ShareWithModal from "../ShareWithModal/ShareWithModal";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../../Login/Content/Modal/Dropdown";
import { privacyList } from "../CreatePostModal/CreatePostModal";
import { getMyUnion } from "../../../../redux/actionCreators/unionActionCreator";
import Loader from "../../../common/Loader";
import { sharePost } from "../../../../redux/actionCreators/postActionCreator";
import moment from "moment";
import user from "../../../../Assets/Images/user.png";
import { getAllPostWithLimit } from "../../../../redux/actionCreators/rootsActionCreator";
import DropdownComp from "../../../common/DropdownComp";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const SharePostModal = ({ handleClose }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const reducerData = useSelector((state) => {
    return {
      activePost: state.rootsReducer.activePost || {},
      profile: state.profileReducer.profile || {},
      myUnionList: state.unionReducer.myUnionList,
    };
  });
  const { activePost, profile, myUnionList } = reducerData;
  const { text, image } = activePost;
  const isPersonal = profile?.profiletype === "Personal";

  const unions = myUnionList.map((item) => {
    return { name: item?.groupName };
  });
  const postPrivacyList = isPersonal
    ? [...privacyList, ...unions]
    : [{ name: "Friends" }, ...unions];

  const [state, setState] = useState({});
  const { postPrivacy = {name: 'Public'}, content, loading } = state;

  useEffect(() => {
    dispatch(getMyUnion(profile?.id));
  }, []);

  const handlePostPrivacy = (selectedValue) => {
    if (selectedValue?.name === "Friends") {
      setState({ ...state, alert: true, postPrivacy: selectedValue });
    } else {
      setState({ ...state, alert: true, postPrivacy: selectedValue });
    }
  };

  const handleShare = () => {
    setState({ ...state, loading: true });
    const payload = {
      shareto: postPrivacy?.name,
      type: "personal",
      template: "template1",
      userid: "",
      postid: activePost.id,
      sharetext: content,
      suggesttemp: "sugest1",
      utag: null,
      delete: false,
      close: "close",
      profileid: profile?.id,
      postprofileid: profile?.id,
      sharedpostid: activePost.id,
      location: "",
      postdate: moment().format("DD-MM-YYYY HH:mm:ms"),
    };
    dispatch(sharePost(payload)).then((res) => {
      if (res.status) {
        handleClose();
        setState({ ...state, loading: false });
        dispatch(getAllPostWithLimit(profile.id));
      }
    });
  };
  return (
    <>
      <div
        className="w-[95%] sm:w-[50%] lg:w-[30%] bg-white flex-col flex items-center rounded-xl fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
      >
        {loading && <Loader />}
        {/* Top Section */}
        <section className="flex w-full justify-between my-2 px-3">
          {/* <span className="text-md font-bold">Custom Group</span> */}
          {/* <button
            className="text-xs sm:text-md font-semibold rounded-lg flex items-center text-white bg-[#6780AF] px-[30px] py-0.5"
            onClick={onClickOnNext}
          >
            Next
          </button> */}
          <div className="flex w-[46px] h-[46px]">
            {/* due to img broke dynamic src commented */}
            <img
              src={profile?.pimage ? profile?.pimage : user}
              alt=""
              className="w-full h-full rounded-full mt-1 object-cover"
            />
          </div>
          <div className="flex flex-col flex-1 justify-center ml-2">
            <div className="flex items-center">
              {/*font weight removed*/}
              <span className="ml-1 font-bold">
                {`${profile?.fname || "User"} ${profile?.lname || ""}`}
              </span>
              <div className="text-xs ml-2 font-semibold mt-0.5">
                {profile?.job}
              </div>
            </div>
          </div>
        </section>
        <div className="w-[95%] h-0.5 bg-gray-500"></div>
        <section className="flex w-full px-5">
          <span className="w-[100px] text-xs sm:text-[10px] flex items-center">
            Share with
          </span>

          {/* <SelectDropdown /> */}
          <DropdownComp
                selectedValue={postPrivacy}
                handleChange={handlePostPrivacy}
                name="Manage who can see your post"
                options={[
                  ...postPrivacyList,
                  {
                    name: "Create your own union",
                    onClick: () => navigate('/create-union'),
                  },
                ]}
                heading={
                  <Typography
                    disabled
                    variant="small"
                    className="p-3 w-full bg-gray-300"
                  >
                    Manage who can see your post
                  </Typography>
                }
                keyName="name"
              />
        </section>
        {/* Message Section */}
        <section className="flex w-full justify-between px-2 lg:py-1 xl:py-2 lg:h-[90px] xl:h-[120px]">
          <textarea
            value={content}
            onChange={(e) => setState({ ...state, content: e.target.value })}
            type="text"
            className="w-[98%] h-[80px] lg:h-[80px] xl:h-[100px] outline-none pl-2 text-black mt-1 text-xs rounded-lg  lg:pt-1 xl:pt-2 bg-gray-300"
            placeholder="Write something..."
          />
        </section>

        {/* Content Section */}
        <section className="flex w-full justify-between px-2">
          <p className="text-[14px] mt-1 text-gray-800 text-semibold">{text}</p>
        </section>
        {image && (
          <>
            <hr />
            <div className="w-[95%] h-[1px] bg-gray-500 my-2"></div>

            {/* Image Slider Section */}
            <section className="flex w-full justify-between px-2">
              <Carousel
                responsive={responsive}
                containerClass={`w-full h-full flex items-center`}
                itemClass="carousel-item-padding-40-px"
                showDots={true}
                // renderDotsOutside
              >
                {image?.split("@")?.map((elem, index) => (
                  <div
                    key={index}
                    className="rounded-lg p-2 relative flex items-center justify-center"
                  >
                    <img
                      src={elem}
                      alt=""
                      className="w-[95%] object-cover h-[220px] rounded-lg"
                    />
                  </div>
                ))}
              </Carousel>
            </section>
          </>
        )}

        {/* Button Section */}

        <section className="w-full gap-3 px-6 flex justify-center my-2">
          <button
            className="w-1/2 text-[#6780AF] border-[1px] border-[#6780AF] text-sm font-semibold py-0.5 rounded-md"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="w-1/2 bg-[#6780AF] text-white border-[1px] border-[#6780AF] text-sm font-semibold py-0.5 rounded-md"
            onClick={handleShare}
          >
            Share
          </button>
        </section>
      </div>
    </>
  );
};

export default SharePostModal;

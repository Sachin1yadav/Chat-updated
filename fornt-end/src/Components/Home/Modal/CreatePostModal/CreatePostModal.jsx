import React, { useEffect } from "react";
import MainCarousel from "../../SliderSection/MainCarousel";
import AccordionToggle from "../../Accordian/AccordianToggle";
import SelectDropdown from "./SelectDropdown";
import { Autocomplete } from "@react-google-maps/api";
import Dropdown from "../../../Login/Content/Modal/Dropdown";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  updatePost,
} from "../../../../redux/actionCreators/postActionCreator";
import moment from "moment";
import {
  getAllPostWithLimit,
  imageUploadApi,
} from "../../../../redux/actionCreators/rootsActionCreator";
import Loader from "../../../common/Loader";
import { toast } from "react-toastify";
import AutocompletePlace from "../../../googlemap/AutocompletePlace";
import { Alert, Typography } from "@material-tailwind/react";
import user from "../../../../Assets/Images/user.png";
import { getMyUnion } from "../../../../redux/actionCreators/unionActionCreator";
import ImageEditor from "../../../Roots/ImageEditor";
import DropdownComp from "../../../common/DropdownComp";
import globe from '../../../../Assets/Images/globe.png';
import friends from '../../../../Assets/Images/friendsIcon.png';
import home from '../../../../Assets/Images/home.png';
import books from '../../../../Assets/Images/books.png';
import person from '../../../../Assets/Images/personIcon.png';
import union from '../../../../Assets/Images/unionIcon.png'

export let privacyList = [
  { name: "Public", icon: globe },
  { name: "Friends" , icon: friends},
  { name: "Relatives", icon: home },
  { name: "Classmates", icon: books },
  { name: "Officemates", icon: person},
];
const CreatePostModal = ({
  // setShowCreatePostModal,
  title,
  handleCloseModal,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const reducerData = useSelector((state) => {
    return {
      profile: state.profileReducer.profile,
      activePost: state.rootsReducer.activePost,
      myUnionList: state.unionReducer.myUnionList,
    };
  });
  const { profile, activePost, myUnionList } = reducerData;
  const name = profile?.fname + profile?.lname;
  const [state, setState] = useState({});
  const { selectedFile } = state;
  const isEdit = title === "Edit";
  const isPersonal = profile?.profiletype === "Personal";

  const {
    postPrivacy = isEdit ? activePost?.shareto : { name: "Public", icon: globe },
    postContent = isEdit ? activePost?.text : "",
    location = isEdit ? activePost?.location : state?.location,
    uploadFileList = [],
    alert,
    loading,
    allFiles = isEdit ? activePost?.image?.split("@") : "",
  } = state;

  const [ImageFile, setImageFile] = useState(isEdit ? [activePost?.image] : []);
  const [VideoFile, setVideoFile] = useState([]);

  useEffect(() => {
    dispatch(getMyUnion(profile?.id));
  }, []);

  const handlePostContent = (e) => {
    setState({ ...state, postContent: e.target.value });
  };

  const handleImageChange = async (e) => {
    if (e === "delete") {
      setImageFile("");
      setVideoFile("");
    } else {
      const fileList = e.target.files;

      const fileArray = Array.from(fileList);
      fileArray.forEach((element) => {
        if (element?.type?.includes("image")) {
          setImageFile((ImageFile) => [...ImageFile, element]);
        } else {
          setVideoFile((VideoFile) => [...VideoFile, element]);
        }
      });

      if (fileArray.length > 5) {
        return toast.error("You can't select more than 5 images");
      } else {
        const video = fileArray.filter((item) => item?.type?.includes("video"));
        if (video.length > 1) {
          return toast.error("You can't select more than one video");
        }
      }
      // uploadAllImages(fileArray);
      setState({ ...state, allFiles: fileArray });
    }
  };

  async function handleCreatePost() {
    if (allFiles) {
      setState({ ...state, loading: true });
      await Promise.all(
        allFiles?.map((item) => {
          return dispatch(imageUploadApi(item));
        })
      ).then((res) => {
        const paths = res.map((item) => item.path);
        console.log(paths, "UPLODAD");
        createPosts(paths);
        setState({ ...state, uploadFileList: [...uploadFileList, paths] });
      });
    } else createPosts();
  }

  const unions = myUnionList.map((item) => {
    return { name: item?.groupName, icon: union };
  });
  const postPrivacyList = isPersonal
    ? [...privacyList, ...unions]
    : [{ name: "Friends" }, ...unions];
  const handlePostPrivacy = (selectedValue) => {
    if (selectedValue?.name === "Friends") {
      setState({ ...state, alert: true, postPrivacy: selectedValue });
    } else {
      setState({ ...state, alert: true, postPrivacy: selectedValue });
    }

    // setTimeout(() => {
    //   setState({ ...state, postPrivacy: selectedValue, alert: false });
    // }, 1000);
    // setState({ ...state, postPrivacy: selectedValue });
  };

  const createPosts = async (images) => {
    if (allFiles?.length > 5) {
      return toast.error("You can't post more than 5 images/video");
    } else if (VideoFile?.length > 1) {
      return toast.error("You can't post more than 1 video");
    }
    // await uploadAllImages();
    const payload = {
      shareto: postPrivacy?.name,
      type: "personal",
      template: "template1",
      image: images?.join("@"),
      text: postContent,
      suggesttemp: "sugest1",
      utag: null,
      delete: false,
      close: "close",
      profileid: profile?.id,
      city: location,
      location: location,
      postdatetime: new Date().getTime(),
      updatpostdatetime: new Date().getTime(),
    };
    const updatePayload = {
      profileid: profile?.id,
      shareto: postPrivacy?.name,
      type: "personal",
      template: "template1",
      image: images?.join("@"),
      text: postContent,
      suggesttemp: "sugest1",
      utag: null,
      delete: false,
      close: "close",
      id: activePost?.id,
      location: location,
      postdatetime: new Date().getTime(),
      updatpostdatetime: new Date().getTime(),
    };

    isEdit
      ? dispatch(updatePost(updatePayload)).then((res) => {
          handleCloseModal();
          dispatch(getAllPostWithLimit(profile?.id));
        })
      : dispatch(createPost(payload)).then((res) => {
          if (res?.status) {
            toast.success(res.message);
            handleCloseModal();
            dispatch(getAllPostWithLimit(profile?.id));
          } else {
            toast.error(res.message);
          }
        });
  };

  const handleRemove = (itemName) => {
    const filteredData = allFiles.filter((item) => {
      return item.name !== itemName.name;
    });
    setState({ ...state, allFiles: filteredData });
  };
  const handlePlace = (location) => {
    setState({ ...state, location });
  };
  const handleLocation = (value) => {
    setState({ ...state, location: value });
  };
  const handleCrop = (elem) => {
    setState({ ...state, selectedFile: elem });
    console.log(elem);
  };

  const handleSaveEdit = (file) => {
    // setState({...state, allFiles: })
    const fileList = allFiles.filter((item) => item.name !== file.name);
    setState({ ...state, allFiles: [...fileList, file], selectedFile: "" });
  };
  return (
    <div
      className="bg-white w-[90%] sm:w-[80%] lg:w-[77%] sm:h-[70%] lg:h-[75%] xl:h-[80%] xl:w-[70%] py-[10px] px-2 sm:px-4 rounded-2xl fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      {/* create post */}
      <div className="flex justify-between">
        <div className="w-full">
          <h3 className=" text-sm sm:text-md font-bold">{title} Post</h3>
        </div>
        <div className="flex">
          <button
            onClick={handleCreatePost}
            className="bg-[#6780AF] py-1 w-[100px] text-white text-sm px-3 font-semibold  sm:font-bold sm:px-5 rounded-full "
          >
            {isEdit ? "Update" : "Post"}
          </button>
          <button
            className="bg-transparent text-[#6780AF] py-1 w-[100px]  font-semibold px-3 text-sm  sm:font-bold sm:px-5 mx-3 border border-[#6780AF] rounded-full"
            onClick={handleCloseModal}
          >
            Discard
          </button>
        </div>
      </div>
      <hr className="w-100 h-[2px] sm:h-1 bg-gray-200 border-0 rounded my-2 sm:my-3 dark:bg-gray-900" />
      {loading && <Loader />}
      <div className="grid sm:grid-cols-2 gap-2 ">
        <div className="">
          <div className="lg:w-[75%] xl:w-[70%] ">
            <section className="flex items-center my-2 gap-2">
              <img
                src={profile?.pimage || user}
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
              <span className="font-bold">
                {name ? `${profile?.fname} ${profile?.lname}` : "User"}
              </span>
            </section>
            <section className="flex items-center relative ">
              <span className=" text-xs w-[40%] sm:text-[10px] lg:w-[30%] xl:w[22%] flex items-center">
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
              {/* {alert && (
                <div className="absolute z-40 -bottom-8 right-0">
                  <Alert
                    variant="outlined"
                    className="z-[50] bg-transparent text-gray-600"
                  >
                    You do not have {postPrivacy?.name}
                  </Alert>
                </div>
              )} */}
            </section>
          </div>
          <div className="absolute sm:left-2/4 sm:ml-0.5 sm:w-0.5 h-[70%] top-[90px] bg-gray-300"></div>
          <div className="leftSide">
            {/* comment */}
            <div className="comment">
              <textarea
                value={postContent}
                onChange={(e) =>
                  e.target.value.length < 800 && handlePostContent(e)
                }
                placeholder="Write something..."
                className="px-4 pt-2 outline-none bg-[#E4E7EC] w-[95%] rounded-lg my-4 resize-none lg:h-[100px] xl:h-[125px]"
              ></textarea>
            </div>
            {/* add location */}
            <div className="w-full p-2 text-sm  items-center placeholder-gray-500">
              {/* <input
                type="text"
                placeholder="Add Location"
                className="flex-1  p-2 outline-none"
              /> */}
              <AutocompletePlace
                placeholder={"Add location"}
                value={location}
                livePlace={handlePlace}
                handleChangeLocation={handleLocation}
              />
            </div>
          </div>
        </div>
        <div>
          <MainCarousel
            isEdit={isEdit}
            files={allFiles}
            handleImageChange={handleImageChange}
            handleRemove={handleRemove}
            selectFile={handleCrop}
          />
        </div>
        {selectedFile && !isEdit && (
          <div className="absolute h-[400px] mt-10 bg-white inset-0 z-[99999]">
            <ImageEditor
              file={selectedFile}
              cancleEdit={() => setState({ ...state, selectedFile: "" })}
              saveEdit={handleSaveEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePostModal;

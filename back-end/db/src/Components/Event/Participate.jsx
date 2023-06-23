import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ImageIcon from "@mui/icons-material/Image";
import { imageUploadApi } from "../../redux/actionCreators/rootsActionCreator";
import { addEventPost } from "../../redux/actionCreators/eventActionCreator";
import { toasterFunction } from "../Utility/utility";
import { sponseredTabSelected } from "../../redux/actionCreators/userActionCreator";

const Participate = () => {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formError, setFormError] = useState("");
  const { profile } = useSelector((state) => state.profileReducer);
  console.log("ProfileId", profile);
  // Function for timestamp
  // const timestamp = (date) => {
  //   const now = moment();
  //   const postDate = moment(date);
  //   const diff = now.diff(postDate, "minutes");

  //   if (diff < 1) {
  //     return "just now";
  //   } else if (diff < 60) {
  //     return `${diff} minutes ago`;
  //   } else if (diff < 1440) {
  //     return `${Math.floor(diff / 60)} hours ago`;
  //   } else if (diff < 10080) {
  //     return `${Math.floor(diff / 1440)} days ago`;
  //   } else {
  //     return postDate.format("DD/MM/YYYY");
  //   }
  // };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };
  const { defaultEventData } = useSelector((state) => state.eventReducer);

  const imageUrl = defaultEventData?.data?.image.split(" @ ");

  const onHandleSubmit = async () => {
    const uploadedImage = await dispatch(imageUploadApi(file));
    if (!uploadedImage?.status) {
      return toasterFunction("Something went wrong Image not uploaded");
    }

    const participantsData = {
      active: defaultEventData?.data?.active,
      commentcount: 0,
      delete: defaultEventData?.data?.delete,
      id: null,
      image: uploadedImage?.path,
      likecount: 0,
      location: "",
      postdatetime: Date.now().toString(),
      profile: null,
      profileid: profile?.id,
      shareto: "Public",
      suggesttemp: "",
      template: "No_template",
      text: caption,
      type: "sPost",
      utag: defaultEventData?.data?.utag,
      video: null,
      viptype: 1,
      postprofileid: "",
      postprofile: null,
      likepostid: "",
      eventtype: defaultEventData?.data?.eventtype,
      lat: "",
      log: "",
      startdate: defaultEventData?.data?.startdate,
      enddate: defaultEventData?.data?.enddate,
      postonpost: defaultEventData?.data?.id,
      duration: "0",
      tital: defaultEventData?.data?.tital,
    };
    const sucessMessage = await dispatch(addEventPost(participantsData));
    if (!sucessMessage?.status) {
      return toasterFunction(sucessMessage?.message);
    }
    dispatch(sponseredTabSelected("Post"));
    setCaption("");
    setFile(null);
    setTermsAccepted(false);
    setFormError("");
    toasterFunction(sucessMessage?.message);
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-[100%] mb-2">
      <div>
        <div className="mb-4">
          <textarea
            className="border border-gray-400 rounded px-3 py-2 h-[20vh] w-full focus:outline-none"
            id="caption"
            name="caption"
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Write Something..."
            required
          />
        </div>
        <hr className="w-full h-[0.1rem] bg-gray-500 mb-4" />
        {!file && (
          <div className="mb-4 flex justify-center items-center">
            <label
              className="font-medium mb-1 w-full h-[50vh] flex flex-col items-center justify-center border border-gray-400 rounded-lg"
              htmlFor="image"
            >
              <ImageIcon
                style={{ height: "100px", width: "100px" }}
                className="text-[#7991BD]"
              />
              <h1 className="font-semibold">Add Image</h1>
            </label>
            <input
              className="border border-gray-400 rounded hidden absolute"
              type="file"
              id="image"
              name="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
        )}

        {file && (
          <div className="w-full h-[50vh] relative flex flex-col items-center justify-center border border-gray-400 rounded-lg">
            <img
              src={URL.createObjectURL(file)}
              alt="image"
              className="h-full w-full object-contain"
            />
          </div>
        )}

        <div className="mb-4">
          <input
            className="mr-2"
            type="checkbox"
            id="terms"
            name="terms"
            checked={termsAccepted}
            onChange={handleTermsChange}
            required
          />
          <label
            className="inline-block text-sm sm:font-medium"
            htmlFor="terms"
          >
            I accept the <a href="#">terms and conditions</a>
          </label>
          <img
            src={imageUrl && imageUrl[2]}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
        <div className="mb-4 text-red-500">{formError}</div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          type="submit"
          onClick={onHandleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Participate;

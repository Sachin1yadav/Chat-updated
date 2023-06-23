import { MdOutlineMusicNote } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import { AiFillHeart } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, input } from "@material-tailwind/react";
import TypeMessage from "../../chat/TypeMessage";
import {
  addCommentOnKicks,
  addCommentReplyOnKicks,
  commentLiked,
  commentPostLiked,
  getCommentsByPostid,
  getCommentsReplyByPostid,
} from "../../../redux/actionCreators/kicksActionCreator";
import moment from "moment";
import { toast } from "react-toastify";
import {
  addCommentOnPost,
  addPostReply,
  addCommentReplyOnRoots,
  getCommentByPostid,
  imageUploadApi,
} from "../../../redux/actionCreators/rootsActionCreator";
import { useNavigate } from "react-router-dom";
import user from "../../../Assets/Images/user.png";
import liked from '../../../Assets/Images/kicksLike.png'

export default function VideoCommentsModal({ onClose, ispenComment, roots }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducerData = useSelector((state) => {
    return {
      commentsList: state?.kicksReducer.comments,
      activePost: state?.rootsReducer?.activePost, //active post --- that post which is currently click by user
      profile: state?.profileReducer?.profile,
      replyList: state?.kicksReducer?.reply,
    };
  });

  const { commentsList = [], activePost, profile } = reducerData;
  const [state, setState] = useState({
    msgText: "",
  });
  const { commentImage, imgFile, alert, msgText } = state;
  const [openInput, setOpenInput] = useState(false);
  const [id, setid] = useState("");
  const openReplyModal = (id) => {
    setOpenInput(true);
    setid(id);
  };

  // comment Reply api intregration....
  const handleSendReply = async () => {
    if (!msgText) {
      setState({ ...state, alert: true });
    }
    let imgPath;
    if (commentImage) {
      imgPath = dispatch(imageUploadApi(imgFile));
    }
    if (msgText?.trim() || imgPath) {
      const payload = {
        // profileid: activePost?.profileid,
        // commentid: activePost?.id,
        profileid: profile?.id,
        commentid: id,
        text: msgText,
        image: imgPath?.path,
        emogi: "emogi",
        datetime: new Date().getTime(),
      };
      if (roots) {
        const params = {
          pageNumber: 0,
          pageSize: 10,
        };
        const res = await dispatch(addPostReply(payload));
        dispatch(getCommentByPostid(activePost?.id, params));
        setState({ ...state, msgText: "" });
      } else {
        if (ispenComment == true) {
          dispatch(addCommentReplyOnRoots(payload)).then((res) => {
            console.log(res);
          });
        } else {
          dispatch(addCommentReplyOnKicks(payload)).then((res) => {
            console.log(res);
            if (res?.status) {
              dispatch(getCommentsReplyByPostid(id));
            } else {
              toast.error(res?.message);
            }
          });
          dispatch(getCommentsByPostid(activePost?.id));
        }
      }
    }
  };

  const handleSendComment = async () => {
    setState({ ...state, msgText: "", imgFile: "" });
    if (!msgText) {
      setState({ ...state, alert: true });
    }
    let imgPath;
    if (commentImage) {
      imgPath = await dispatch(imageUploadApi(imgFile));
    }
    if (msgText?.trim() || imgPath) {
      const commentData = {
        datetime: new Date().getTime(),
        postid: activePost?.id,
        profileid: profile?.id,
        text: msgText,
        image: imgPath?.path
      };
      if (roots) {
        const params = {
          pageNumber: 0,
          pageSize: 10,
        };
        if (!msgText) {
          return;
        }
        // setAlert(false);
        // dispatch({
        //   type: "INCREASE_COMMENT_COUNT",
        //   payload: activePost.id,
        // });
        const res = await dispatch(addCommentOnPost(commentData));
        if (res?.status) {
          dispatch(getCommentByPostid(activePost?.id, params))
          dispatch({
            type: "INCREASE_COMMENT_COUNT",
            payload: activePost.id,
          });
        };
      } else {
        dispatch(addCommentOnKicks(commentData))
          .then((res) => {
            if (res?.status) {
              dispatch(getCommentsByPostid(activePost?.id));
            } else {
              toast.error(res?.message);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      }
    }
  };

  const handleLike = (itemId, dislike) => {
    const payload = {
      datetime: new Date().getTime(),
      postid: itemId,
      profileid: profile.id,
      type: "c"
    }
    let params ={
      pageNumber: 0,
      pageSize: 10
    }
    if(roots){
       dispatch(commentPostLiked(payload)).then(res => {
        dispatch(getCommentByPostid(activePost?.id, params))
       })
      return;
    }
    if(dislike) {

    }else
    dispatch(commentLiked(payload)).then(res => {
      if(res?.status){
        dispatch(getCommentsByPostid(activePost?.id));
      }
    })
  };
  const handleEmojiClick = (emoji) => {
    console.log(emoji);
    setState({ ...state, msgText: msgText + emoji.emoji });
  };

  const handleFile = (e) => {
    if (e === "remove") {
      return setState({ ...state, commentImage: "", imgFile: "" });
    }
    const file = URL.createObjectURL(e.target.files[0]);
    setState({ ...state, commentImage: file, imgFile: e.target.files[0] });
  };

  const isLiked = (likes) => {
    const data = likes?.find(item => item?.profileid === profile?.id);
    if(data) return true;
    else return false;
  }

  return (
    <section
      className=" items-stretch justify-center h-full w-full flex  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <section className="pb-20 w-[95%] sm:w-[50%] lg:w-[40%] relative  bg-white my-16 flex flex-col justify-between overflow-scroll hideScroll text-black rounded-xl">
        <div className="flex justify-between p-3 border-b">
          <span className="text-[19px] font-medium">Comments</span>
          <AiOutlineCloseCircle
            onClick={onClose}
            className="w-7 h-7 text-gray-700 cursor-pointer"
          />
        </div>
        <div className="h-full overflow-auto">
          {(commentsList?.content ? commentsList?.content : commentsList)?.map(
            (data, i) => {
              const {
                profile,
                text,
                id,
                likecount,
                replycount,
                datetime,
                image,
                postid,
                profileid,
              } = data;
              const name = profile?.fname + profile?.lname;
              return (
                <>
                  <div key={id} className="my-2 flex items-center z-50 ">
                    <div className="w-1/6 flex justify-center cursor-pointer"
                      onClick={() => navigate(`/profile/${profile?.id}`)}>
                      <img
                        src={profile?.pimage}
                        className="w-12 h-12 border border-gray-500 rounded-full object-cover"
                      />
                    </div>

                    <div className="bg-[#f3f6f8] w-4/6 p-2 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <span className="font-semibold text-[15px]">
                            {name
                              ? `${profile?.fname} ${profile?.lname}`
                              : "User"}
                          </span>
                          <span className="text-[10px] px-2">
                            {moment(datetime, "x").format("DD MMM, YYYY")}
                          </span>
                        </div>
                        <div>
                          <BsThreeDots />
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-[14px]">{text}
                          {image ? <img className="w-24" src={image} /> : ""}
                        </span>
                        <div className="text-[11px]">
                          <span className="px-1">
                            {likecount?.length || 0} likes
                          </span>
                          <span>{replycount?.length || 0} replies</span>
                        </div>
                      </div>
                    </div>
                    {/* <input type="text" /> */}

                    <div className="w-1/6 pl-2 text-[#666666]">
                    {
                      isLiked(likecount) ? 
                      <img className="w-6 cursor-pointer" src={liked} onClick={() => handleLike(id, "dislike")} /> :
                      <AiFillHeart
                        className="text-2xl cursor-pointer"
                        onClick={() => handleLike(id)}
                      />
                    }
                      <TiArrowBack
                        className="text-2xl cursor-pointer"
                        onClick={() => openReplyModal(id)}
                      />
                    </div>
                  </div>
                  {replycount?.map((item, i) => {
                    const {
                      text,
                      emoji,
                      commentid,
                      profile,
                      likecount,
                      datetime,
                    } = item;
                    const name = profile?.fname + profile?.lname;
                    return (
                      <div
                        key={i}
                        className="my-2 ml-[14%] w-[83%] flex items-center"
                      >
                        <div className="w-1/6 text-sm flex justify-center">
                          <img
                            onClick={() => navigate(`profile/${profile.id}`)}
                            src={profile?.pimage || user}
                            alt="User"
                            className="w-10 h-10 border-gray-600 border flex items-center justify-center rounded-full object-cover"
                          />
                        </div>

                        <div className="bg-[#f3f6f8] w-4/6 p-2 rounded-md">
                          <div className="flex justify-between">
                            <div>
                              <span className="font-semibold text-[15px]">
                                {name
                                  ? `${profile?.fname} ${profile?.lname}`
                                  : "User"}
                              </span>
                              <span className="text-[10px] px-2">
                                {moment(datetime, "x").format("DD MMM, YYYY")}
                              </span>
                            </div>
                            <div>
                              <BsThreeDots />
                            </div>
                          </div>

                          <div className="flex justify-between items-end">
                            <span className="text-[14px]">{text}</span>
                            <div className="text-[11px]">
                              <span className="px-1">
                                {likecount?.length || 0} likes
                              </span>
                              {/* <span>2 replies</span> */}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleLike(id)}
                          className="w-1/6 pl-2 text-[#666666]"
                        >
                          <AiFillHeart className="text-2xl" />
                        </button>
                      </div>
                    );
                  })}
                </>
              );
            }
          )}
        </div>

        <div className="absolute w-full bottom-[0%]  bg-blue-200  rounded-md ">
          {/* <div className="mt-auto fixed left-50 bottom-[10%] bg-blue-200  rounded-md w-[90%] lg:w-[35%]"> */}
          {openInput === false ? (
            <TypeMessage
              alert={alert}
              msgFile={commentImage}
              handleFile={handleFile}
              placeholder="Add comment"
              sendMessage={handleSendComment}
              handleInputChange={(e) =>
                setState({ ...state, msgText: e.target.value })
              }
              inputValue={msgText}
              handleEmojiClick={handleEmojiClick}
            />
          ) : (
            <div className="relative flex w-full items-center">
              <TypeMessage
                alert={alert}
                msgFile={commentImage}
                handleFile={handleFile}
                placeholder="Reply comment....."
                handleInputChange={(e) =>
                  setState({ ...state, msgText: e.target.value })
                }
                sendMessage={handleSendReply}
                inputValue={msgText}
              />
              <div className="ml-auto">
                <AiOutlineCloseCircle
                  onClick={() => setOpenInput(false)}
                  className="w-7 h-7 text-gray-700 cursor-pointer mr-4"
                // className="w-7 h-7 text-gray-700 cursor-pointer mr-4 absolute right-[-3%] bottom-3"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}

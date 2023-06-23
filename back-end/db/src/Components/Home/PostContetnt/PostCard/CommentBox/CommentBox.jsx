import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import dataList from "./data";
import CommentMenuModal from "../../../Modal/CommentMenuModal/CommentMenuModal";
import kicksBeforeLikes from "../../../../../Assets/Images/KicksBeforeLike.png";

const CommentBox = ({ comment }) => {
  const [editComment, setEditComment] = useState(false);

  const setingOptions = () => {
    setEditComment(!editComment);
  };
  return (
    <div className="flex justify-around pt-1 items-center w-full">
      <img
        src="./images/events.jpg"
        alt=""
        className="w-[40px] h-[40px] rounded-full"
      />
      <div className="flex flex-col bg-[#D6DEEB] w-[80%] rounded-xl px-3 pt-1 gap-1 relative">
        {editComment && <CommentMenuModal data={dataList} />}
        {/* Name and date */}
        <div className="flex">
          <div className="flex flex-1 gap-2 items-center">
            <h1 className="text-md font-bold">{comment.user}</h1>
            <p className="text-xs font-semibold">{comment.timestamp}</p>
          </div>
          <CiMenuKebab
            size={25}
            color="gray"
            className="cursor-pointer"
            onClick={setingOptions}
          />
        </div>
        {/* Commented Message */}
        <div className="flex gap-3 items-center">
          <p className="text-xs font-semibold flex-1 pb-[5px]">
            Well said <span className="font-bold"> @Jessica</span>
          </p>
          <span className="text-xs font-semibold">{comment.likes} Like</span>
          <span className="text-xs font-semibold">
            {comment.Replies.length} Repliess
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <img
          src={kicksBeforeLikes}
          alt=""
          className="w-[30px] cursor-pointer"
        />
        <img
          src="./images/replyIcon.png"
          alt=""
          className="w-[30px] h-[30px] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CommentBox;

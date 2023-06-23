import { MdOutlineMusicNote } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import { AiFillHeart } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import profile from "../../../Assets/Images/Person.jpg";
import profile2 from "../../../Assets/Images/bg2.jpg";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";

export default function KicksComment({ addComment }) {
  const [state, setState] = useState({});
  const { commentText } = state;

  const handleChange = (event) => {
    setState({ ...state, commentText: event.target.value });
  };
  const handleSendBtn = () => {
    addComment(commentText);
    setState({ ...state, commentText: "" });
    console.log("comment", commentText);
  };
  return (
    <>
      <section className=" my-2 flex items-center text-black">
        <div className="flex justify-center items-center rounded-md bg-white">
          <input
            value={commentText}
            name="commentText"
            placeholder="Add comment..."
            className="w-full h-9 rounded-md outline-none pl-3 whitespace-break-spaces"
            onChange={handleChange}
          />
          <span onClick={handleSendBtn}>
            <IoSend className="text-blue-500 text-2xl mx-2 cursor-pointer" />
          </span>
        </div>
      </section>
    </>
  );
}

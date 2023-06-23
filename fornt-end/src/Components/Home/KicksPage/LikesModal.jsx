import React from "react";
import LikeIcon from "../../../Assets/Images/icksLike.png";
import LikedProfile from "../Modal/LikeModal/LikedProfile";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./kicks.css";

const LikeModal = ({ onClose }) => {
  return (
    <section
      className="flex bg-yellow-400 justify-center items-center  h-[74%] w-full "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className="w-[95%] lg:w-[40%] h-[74%] bg-white rounded-lg px-4 flex flex-col gap-2 pt-2">
        <div className="flex w-full gap-1 items-center">
          <div className="flex w-11/12 justify-center">
            <img src={LikeIcon} alt="" className="w-[30px] h-[30px]" />
            <h1>7 Likes</h1>
          </div>
          <div className="w-1/12">
            <AiOutlineCloseCircle
              onClick={onClose}
              className="w-7 h-7 text-gray-700 cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-500"></div>
        <div className="w-full h-full overflow-y-scroll hideScroll">
          <LikedProfile title={" Add Friends"} />
          <LikedProfile title={"Cancel Requested"} />
          <LikedProfile title={" Add Friends"} />
          <LikedProfile title={" Add Friends"} />
          <LikedProfile title={" Add Friends"} />
          <LikedProfile title={"Cancel Requested"} />

          <LikedProfile title={" Add Friends"} />
          <LikedProfile title={" Add Friends"} />
          <LikedProfile title={"Cancel Requested"} />
          <LikedProfile title={" Add Friends"} />
          <LikedProfile title={" Add Friends"} />
          <LikedProfile title={" Add Friends"} />
          <LikedProfile title={" Add Friends"} />
        </div>
      </div>
    </section>
  );
};

export default LikeModal;

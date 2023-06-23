import React, { useState } from "react";
import { BsImage } from "react-icons/bs";
import Portals from "../../Portals/Portals";
import CreatePostModal from "../Modal/CreatePostModal/CreatePostModal";
import { Avatar } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import userIcon from "../../../Assets/Images/user.png";
import gallaryIcon from "../../../Assets/Images/gallaryIcon.png";
import { useNavigate } from "react-router-dom";

const PostForm = ({ width, bgColor, rightIcon }) => {
  // const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [state, setState] = useState({});
  const navigate = useNavigate();
  const { showModal } = state;
  const createPostModal = () => {
    setState({ ...state, showModal: !showModal });
  };
  const { profile } = useSelector((state) => state.profileReducer);
  return (
    <div className="w-full cursor-pointer flex">
      <Avatar
        src={profile?.pimage || userIcon}
        alt="Avatar"
        variant="circular"
        className="rounded-full w-[30px] h-[30px]"
        onClick={() => navigate("/profile")}
      />
      <div
        className="flex justify-between items-center w-full bg-white rounded-lg mx-1"
        onClick={createPostModal}
      >
        <input
          type="text"
          placeholder="Write Your Thoughts....."
          className="outline-none rounded-md w-full h-full pl-2 text-xs"
        />
        {rightIcon && (
          <span className="w-[30px] mr-1">
            <img src={gallaryIcon} alt="" />
          </span>
        )}
      </div>
      {showModal && (
        <Portals
          closeModal={() => {
            setState((prev) => ({ ...prev, naehal: true, showModal: false }));
          }}
        >
          <CreatePostModal
            title={"Create"}
            handleCloseModal={() => {
              setState((prev) => ({ ...prev, naehal: true, showModal: false }));
            }}
          />
        </Portals>
      )}
    </div>
  );
};

export default PostForm;

import React from "react";
import { useEffect } from "react";
import User from "../../../../Assets/Images/user.png";
import { Link } from "react-router-dom";
import Logo from '../../../../Assets/Images/Logo.png'
const FollowersModal = ({
  title,
  modalName,
  data,
  emptyMessage = "",
  handleClick,
  closeModal
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" w-[30%] bg-white rounded-xl ml-5 flex items-center flex-col  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50"
    >
      <div className="my-2">{modalName}</div>
      <h1 className="text-center font-bold">{title}</h1>
      <div className="bg-gray-500 w-full h-[1px] mb-1"></div>
      <section className=" w-[95%] flex rounded-md flex-col items-center mt-2 h-[350px] overflow-scroll">
        {data?.length ? (
          data?.map((friend) => {
            const { fname, lname, pimage, id, celibrity } = friend?.profile || friend || {};
            const name = fname + lname;
            return (
              <>
                <div className="flex w-full pb-1 flex-col">
                  <div className="flex items-center py-1">
                    <Link
                    onClick={closeModal}
                      to={`/profile/${id}`}
                      className="flex items-center gap-2 flex-1"
                    >
                      <img
                        src={pimage || User}
                        alt=""
                        className="w-[40px] h-[40px] rounded-full"
                      />
                      <span className="font-bold text-sm">{`${
                        name ? `${fname} ${lname}` : "User"
                      }`}</span> 
                    </Link>
                    <div className="flex gap-3">
                    <span>{celibrity ? 
                      <img className="w-5" src={Logo}/>: ""
                      }</span>
                      <button
                        onClick={() => handleClick(friend)}
                        className="font-bold text-[#05b7fd] text-[10px] border-[1px] border-[#05b7fd] px-3 py-0.5 rounded-sm"
                      >
                        {modalName === "Following" ? "Unfollow" : "Remove"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <div className="m-auto">{emptyMessage}</div>
        )}
      </section>
    </div>
  );
};

export default FollowersModal;

import React from "react";
import LikeIcon from "../../Assets/Images/kicksLike.png";
const EventResultCard = () => {
  return (
    <div className="flex w-full flex-col bg-white rounded-[20px] px-4 py-2 gap-2 mt-2">
      <section className="w-full flex items-center justify-between">
        <div className="flex cursor-pointer">
          <div className="flex w-[46px] h-[46px]">
            <img
              src="./images/events.jpg"
              alt=""
              className="w-full h-full rounded-full mt-1 object-cover"
            />
          </div>

          <div className="flex flex-col justify-center ml-2">
            <div className="flex items-center">
              <span className=" font-bold text-sm">Peter Mac</span>
            </div>

            <div className="flex gap-1 font-[400] flex-col flex-1">
              <span className="text-[8px] sm:text-[10px]">Game Developer</span>

              <span className="text-[8px] sm:text-[10px] ">20d ago</span>
            </div>
          </div>
        </div>
        <img
          src="./images/groups.png"
          alt=""
          className="w-[28px] h-[28px] sm:w-[35px] sm:h-[35px]"
        />
      </section>
      <div className="h-[200px]bg-white rounded-[20px] w-full pb-2 flex flex-col gap-2">
        <img
          src="./images/events.jpg"
          alt=""
          className="w-full h-[80%] sm:h-[90%] object-cover rounded-[20px] mx-auto "
        />
        <div className="flex w-full justify-center gap-1 items-center">
          <img src={LikeIcon} alt="" className="w-[30px] h-[30px]" />
          <h1>7 Likes</h1>
        </div>
      </div>
    </div>
  );
};

export default EventResultCard;

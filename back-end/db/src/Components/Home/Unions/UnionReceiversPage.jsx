import React from "react";
import UnionRequestNotification from "./UnionRequestNotification";

const UnionReceiversPage = ({ title }) => {
  return (
    <div className="w-[95%] sm:w-[50%] lg:w-[40%] bg-[#E4E7EC] mx-auto flex flex-col items-center gap-2 h-[88%] mt-1 pt-4 px-4">
      {/* {[1, 2, 3, 4, 5]?.map(() => (
        <UnionRequestNotification />
      ))} */}

      <div className="flex h-[40px] w-full">
        <div className="">
          <img
            src="./images/events.jpg"
            alt=""
            className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] rounded-full"
          />
        </div>
        <div className=" flex flex-1 flex-col justify-center ml-2">
          <h1 className="text-[11px] sm:text-[12px]">
            Invitations:
            <span className="font-bold text-blue-400 text-xs sm:text-sm">
              Abhi
            </span>
            invited you to join the union
          </h1>
          <span className="font-bold text-blue-400 text-xs sm:text-sm">
            Jansena Party
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-5 w-full">
        {/* {friendsTab?.map((elem) => ( */}
        <button
          // key={elem}
          className="w-[35%] bg-[#7991BD] text-white font-bold py-1 text-[10px] sm:text-xs rounded-lg"
          // style={{
          //   backgroundColor: unionFriendsTab === elem ? "#7991BD" : "#666567",
          // }}
          // onClick={() => onUnionFriendsTabSelected(elem)}
        >
          {/* {elem} */}
          Join
        </button>
        <button className="text-[#666567] w-[35%] py-1 border-2 text-[10px] sm:text-xs border-[#666567] rounded-lg">
          Cancel
        </button>
        {/* ))} */}
      </div>
      <div className="w-full h-[1px] bg-[#666567] mb-2 mt-1"></div>
      <UnionRequestNotification title={" started following you."} />
      <UnionRequestNotification title={"sent you a friend request"} />
    </div>
  );
};

export default UnionReceiversPage;

import React from "react";

const CoverImageSection = () => {
  return (
    <div className="w-[80%] h-[380px] bg-white rounded-xl flex flex-col items-center my-3">
      {/*Cover Image Section */}
      <section className="w-[95%] h-[200px] rounded-xl flex justify-center mt-3">
        <img
          src="./images/events.jpg"
          alt=""
          className="w-full h-full rounded-xl"
        />
      </section>

      {/* Profile Image Section  */}
      <section className="flex justify-evenly w-full flex-col h-[25%] items-center">
        <div className="w-[110px] h-[110px]">
          <img
            src="./images/pizza.jpg "
            alt=""
            className="w-full h-full rounded-full ml-1"
          />
        </div>

        {/* Follower Following and Friends Section */}
        <section className=" flex items-center w-full justify-center">
          <div className="flex items-center flex-col justify-center">
            <div className="flex gap-3 items-center">
              <span className="font-bold text-2xl">Joe D</span>
              <img src="./images/groups.png" alt="" className="w-[40px]"/>
            </div>
            <span className="text-xs font-bold">@Software Engineer</span>
          </div>
        </section>

        <div className=" flex w-full justify-center gap-3 mt-2 mb-4">
          <section className=" flex flex-col items-center">
            <img src="./images/groups.png" alt="" className="w-[30px]" />

            <span className="font-bold text-[11px] py-[1px] w-full bg-blue-400 px-3 rounded-md">
              2 Followers
            </span>
          </section>

          <section className=" flex flex-col items-center">
            <img src="./images/groups.png" alt="" className="w-[30px]" />
            <span className="font-bold text-[11px] py-[1px] w-full px-4 bg-blue-400 rounded-md">
              3 Following
            </span>
          </section>
        </div>
      </section>
    </div>
  );
};

export default CoverImageSection;

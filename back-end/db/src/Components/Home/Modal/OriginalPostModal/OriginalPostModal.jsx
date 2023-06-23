import React from "react";
import { GrLocation } from "react-icons/gr";
import { useSelector } from "react-redux";
import user from '../../../../Assets/Images/user.png'

const OriginalPostModal = ({ handleCloseModal }) => {
  const reducerData = useSelector((state) => {
    return {
      postHistory: state.postReducer.postHistory,
      activePost: state.rootsReducer.activePost
    }
  })
  const { postHistory = [], activePost = {}} = reducerData;
  const {  profile, text, location, image} = activePost 

  return (
    // Original Post Section

    <div
      className="flex w-[95%] sm:w-[90%] lg:w-[80%] h-[85%] sm:h-[80%] bg-white justify-around pt-2 fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] rounded-xl flex-col sm:flex-row z-50"
    >
      <div className="sm:w-[45%] h-[90%] border-3 border-gray-500 px-2">
        <h1 className="text-md font-bold bg-white ">Original Post</h1>
        <div className="bg-[#E4E7EC] mt-1 pt-2 sm:mt-3 sm:pt-3 pb-3 rounded-xl">
          <section className="w-full flex items-center pl-3">
            <div className="flex w-[50px] h-[50px]">
              <img
                src={profile?.pimage || user}
                alt=""
                className="w-[45px] h-[45px] rounded-full"
              />
            </div>

            <div className="flex flex-col flex-1 justify-center ml-2">
              <div className="flex items-start">
                <span className="text-sm ml-1 font-bold">
                  {" "}
                  {`${profile?.fname} ${profile?.lname}`}
                </span>
                {/* <span className="text-xs ml-2 font-semibold mt-0.5">
                  @Software Developer
                </span> */}
              </div>

              <div className="flex items-center gap-1">
              
                {/* <img src="./images/groups.png" alt="" className="w-[12px]" />

                <span className="text-xs font-semibold">1 year ago</span>
                <GrLocation size={10} /> */}
                
                {/* <span className="text-xs font-semibold"> {location}</span> */}
              </div>
            </div>
          </section>

          <section className="w-full flex flex-col items-center px-2">
            <div className=" w-full h-full pl-3">
              <p className="text-[13px] font-[400] break-words text-gray-500">{text}</p>
            </div>
            {image && (
              <div className="m-3 mb-0 w-full h-[60%] rounded-xl">
                <img
                  src={image}
                  alt=""
                  className="w-full h-[100px] sm:h-[175px] lg:h-[180px] xl:h-[270px] rounded-xl"
                />
              </div>
            )}
          </section>
        </div>
      </div>
      <div className="w-[.5%] bg-gray-500 border-2"></div>

      {/* Edit And Close Section */}

      <div className="w-1/2 overflow-y-scroll">
        <div className="flex justify-between w-[95%]">
          <span className="text-md font-bold">Edit History</span>
          <button
            className="text-md font-bold text-blue-400"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>

        {Array.isArray(postHistory) &&
          postHistory?.map((elem, index) => {
            const { image, profile, text, location } = elem?.post;
            return (
              <div
                className="bg-[#E4E7EC] flex flex-col rounded-xl gap-2 mt-[10px] pt-[6px]"
                key={index}
              >
                <section className="w-full flex items-center ml-3 justify-around">
                  <div className="flex w-[50px] h-[50px]">
                    <img
                      src={profile?.pimage || user}
                      alt=""
                      className="w-[45px] h-[45px] rounded-full"
                    />
                  </div>

                  <div className="flex flex-col flex-1 justify-center ml-2">
                    <div className="flex items-start">
                      <span className="text-sm ml-1 font-bold">{`${profile?.fname} ${profile.lname}`}</span>
                      <span className="text-xs ml-2 font-semibold mt-0.5">
                        {/* @Software Developer */}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* <img
                        src="./images/groups.png"
                        alt=""
                        className="w-[12px]"
                      /> */}

                      {/* <span className="text-xs font-semibold">1 year ago</span>
                      <GrLocation size={10} /> */}
                      {/* <img src="" alt="" /> */}
                      <span className="text-xs font-semibold"> {location}</span>
                    </div>
                  </div>
                </section>

                <div className=" w-full h-full flex justify-center">
                  <p className="text-[12px] break-words text-gray-500 w-[95%] mb-[6px] text-semibold">
                    {text}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OriginalPostModal;

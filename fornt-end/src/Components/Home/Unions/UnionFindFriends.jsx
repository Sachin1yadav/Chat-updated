import React, { useState } from "react";
import Portals from "../../Portals/Portals";
import ChangeRelationshipModal from "../Modal/ChangeRelationshipModal/ChangeRelationshipModal";

const UnionFindFriends = ({ item = {}, handleSendRequest, relationOption, handleRelation}) => {
  const {fname, lname, id} = item;
  const [openModal, setOpenModal] = useState(false);

  const onHandleCloseModal = () => {
    setOpenModal(false);
  };

  const onHandleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <div key={id} className="flex h-[60px] items-center w-full justify-center flex-col">
        <div className="w-full flex items-center">
          <div className="">
            <img
              src="./images/events.jpg"
              alt=""
              className="w-[45px] h-[45px] rounded-full"
            />
          </div>
          <div className=" flex flex-1 flex-col justify-center ml-4">
            <span className="font-bold text-sm">{fname} {lname}</span>
          </div>
          <img
            src="./images/SendFriendRequest.png"
            alt=""
            className="w-[25px] cursor-pointer"
            onClick={onHandleOpenModal}
          />
        </div>
      </div>

      {openModal && (
        <Portals>
          <ChangeRelationshipModal
            handleRelation={handleRelation}
            relationOption={relationOption}
            button="Send Request"
            title="Wanna Send Friend Request"
            closeModalOption={onHandleCloseModal}
            handleSendRequest={handleSendRequest}
          />
        </Portals>
      )}
    </>
  );
};

export default UnionFindFriends;

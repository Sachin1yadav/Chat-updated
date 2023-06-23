import React, { useState } from "react";
import Input from "../../Login/Content/InputBox/Input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUnion } from "../../../redux/actionCreators/unionActionCreator";
import { red } from "@mui/material/colors";

const CreateUnion = () => {
  const dispatch = useDispatch()
  const [createUnion, setCreateUnion] = useState("");
  const navigate = useNavigate();

  const reducerData = useSelector((state) => {
    return {
      profile: state.profileReducer.profile
    }
  });
  const { profile } = reducerData
  const onCreateUnion = () => {
    if(createUnion?.length < 3){
      toast.error("Please enter minimum three character")
    }else{
      const payload = {
        groupName: createUnion,
        profileId: profile?.id,
      };
      dispatch(addUnion(payload)).then((res) => {
        if(res?.status){
          navigate("/unions-searchlist");
          toast.success("Group Added")
        }else{
          toast.error(res.message)
        }
      })
    }
  };

  const onHandleChange = (event) => {
    setCreateUnion(event.target.value);
  };
  return (
    <div className="w-[95%] sm:w-[50%] lg:w-[40%] bg-[#E4E7EC] mx-auto flex flex-col items-center gap-2 px-1 lg:px-4 h-[89%] mt-1 pt-3">
      <div className="w-full flex flex-col items-center gap-5 px-4">
        <h1 className="font-bold">Create Union</h1>
        <Input
          title="Enter Your Union Name.."
          inputValue={createUnion}
          onHandleChange={onHandleChange}
        />
        <button
          className="w-[35%] bg-gray-800 text-white font-bold py-1 text-xs rounded-lg"
          onClick={onCreateUnion}
          style={{
            backgroundColor: createUnion?.length ? "#7991BD" : "#707070",
          }}
          disabled={!createUnion?.length}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateUnion;

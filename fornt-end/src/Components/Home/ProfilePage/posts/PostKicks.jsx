import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserKickList } from '../../../../redux/actionCreators/kicksActionCreator';

const PostKicks = () => {
  const dispatch = useDispatch();
  const {profile} = useSelector((state) => state.profileReducer);
  const { userKickList } = useSelector((state) => state.kicksReducer)
  useEffect(() => {
    dispatch(getUserKickList(profile?.id))
  }, [])
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 text-center rounded-xl p-2 min-h-[400px] bg-white">
      {userKickList?.map(( item) => {
     return (
          <img
            src={item?.image}
            alt=""
            className="w-[250px] cursor-pointer h-[300px] rounded-lg object-cover"
          />
        )
      })
        }
    </div>
  );
}

export default PostKicks
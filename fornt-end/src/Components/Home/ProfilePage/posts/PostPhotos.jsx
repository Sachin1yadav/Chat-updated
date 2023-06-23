import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getImageList } from '../../../../redux/actionCreators/rootsActionCreator'
import { isEmpty } from '../../../Utility/utility'
import EmptyComponent from '../../../empty component/EmptyComponent'

const PostPhotos = ({ data }) => {
  const dispatch = useDispatch()
  const reducerData = useSelector((state) => {
    return {
      profile: state.profileReducer.profile || {}
    }
  })
  const { profile } = reducerData;

  useEffect(() => {
    dispatch(getImageList(profile.id))
  }, [])
  return (
    <>
      {
        isEmpty(data) ?
        <div className='text-center'>
        <EmptyComponent message={'No photo'}/>
        </div>
        :
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-center rounded-xl p-2 min-h-[400px] bg-white">
        { 
          data?.map((item) => (
            <img
              src={item?.image}
              alt=""
              className="w-[100px] sm:w-[150px] sm:h-[100px] rounded-lg object-cover"
            />
          ))
        }
      </div>
      }

    </>

  );
}

export default PostPhotos
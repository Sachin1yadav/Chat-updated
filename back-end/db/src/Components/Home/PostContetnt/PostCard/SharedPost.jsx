import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPostById } from '../../../../redux/actionCreators/postActionCreator'
import SharePostCard from '../../../common/SharePostCard';
import { getFriendProfile, getProfileById } from '../../../../redux/actionCreators/profileAction';

const SharedPost = ({ postid, profileid}) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({})
    const { postData, profileData } = state
    useEffect(() => {
        dispatch(getFriendProfile(profileid)).then((res) => {
            if(res?.status){
                setState((prev) => ({...prev, profileData: res.data}))
            }
        })
        dispatch(getPostById(postid)).then((res) => {
            if(res?.status){
                setState((prev) => ({...prev, postData: res.data}))
            }else{

            }
        })
    }, [postid])
  return (
    <div className='shadow-lg border border-gray-300 rounded-lg mx-4 px-4 mt-2'>
        <SharePostCard data = {postData || {}} profileData={profileData || {}}/>
    </div>
  )
}

export default SharedPost
import { Avatar } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import userLogo from '../../../Assets/Images/user.png'

const UserKicks = () => {
    const params = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userKickList } = useSelector((state) => state.kicksReducer);
    const user = userKickList?.[0]?.profile;
    useEffect(() => {
    }, [])
    return (
        <div className='w-full md:w-1/2 bg-white mx-auto'>
            <div className='p-3'>
                <Avatar
                    className='rounded-full w-20 h-20 mx-4 cursor-pointer'
                    src={user?.pimage || userLogo}
                    onClick={() => navigate(`/profile/${user.id}`)}
                />
                <span onClick={() => navigate(`/profile/${user?.id}`)}
                className='font-bold cursor-pointer'>{user?.fname || ""} {user?.lname || ""}</span>
                <div className='flex flex-wrap mt-3'>
                    {
                        userKickList?.map((item) => {
                            return (
                                <div className='w-1/2 p-3 md:w-1/3 h-60' key={item?.id}>
                                    <div className='h-full bg-black cursor-pointer'>
                                        { item?.image ? 
                                        <img src={item.image} className='h-full m-auto'/>
                                        :
                                        <video className='h-full m-auto' src={item.video}></video>
                                        }
                                    </div>
                                </div>
                        )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default UserKicks
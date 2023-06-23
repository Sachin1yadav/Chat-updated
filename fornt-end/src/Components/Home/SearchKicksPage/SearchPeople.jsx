import { useSelector } from 'react-redux';
import video from '../../../Assets/Videos/v2.mp4';
import user from '../../../Assets/Images/user.png'
import { useNavigate } from 'react-router-dom';

export default function SearchPeople() {
    const navigate = useNavigate()
    const { profileList } = useSelector((state) => state.kicksReducer)
    return (
        <>
            {profileList?.map((elem, i) => {
                const { fname, lname, pimage, id } = elem
                return (
                    <div key={i} className="cursor-pointer flex items-center
                     py-4 hover:bg-blue-50 border-b" onClick={() => navigate(`/profile/${id}`)}>
                        <img src={pimage || user} alt="" className="rounded-full object-cover h-12 w-12" />
                        <span className='mx-3 font-semibold'>{ fname || ""} {lname || ""}</span>
                    </div>
                )

            }
            )}
        </>
    )
}          
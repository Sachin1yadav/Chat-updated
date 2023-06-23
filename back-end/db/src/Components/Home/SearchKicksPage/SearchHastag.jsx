import { useSelector } from 'react-redux';
import video from '../../../Assets/Videos/v2.mp4';

const dataList = [
  'All', 'Action', 'Adventures', 'Arts & Craft', 'Beauty Tips', 'Comedy', 'Drama', 'Fiction', 'Novel', 'Romance'
]

export default function SearchHastag() {
  const { kicksTagList } = useSelector((state) => state.kicksReducer)
  return (
    <>
      {kicksTagList.map((elem, i) => {
        const { tag } = elem
        return (
          <div key={i} className="cursor-pointer flex items-center justify-cente py-4 hover:bg-blue-50 border-b">
            <span className='mx-3 font-semibold'>{tag}</span>
          </div>
        )
      }
      )}
    </>
  )
}          
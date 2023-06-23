import Congratulations from '../../../../Assets/Images/Umeet/Umeet-Main/Congratulations.png'
import { useSelector } from 'react-redux'

export default function SuccessCreate({ handleBothDetails }){
 const { umeetReducer } = useSelector(state=>state)
console.log(umeetReducer.createData.id)
 return (
  <div className='w-full lg:w-[64%] xl:w-[60%] h-max lg:h-[70%] bg-white rounded-xl p-5'>
   <p className='font-bold text-xl flex justify-center py-2'>Success</p>
   <p className='font-medium text-xl flex justify-center'>Congratulations!</p>
   <div className='my-4 flex justify-center items-center'>
    <img src={Congratulations} className='w-40 h-40' />
   </div>
   <p className='my-4 flex justify-center px-16 text-center'>You're all set! You can manage your invite by visiting 'My Events'</p>
   <div className='flex mt-2 justify-center mx-20 items-center'>
    <button onClick={()=>handleBothDetails(umeetReducer?.createData?.id)} className='bg-[#649b8e] w-full py-2 rounded-lg text-white font-bold cursor-pointer'>view invitation</button>
   </div>
  </div>
 )
}
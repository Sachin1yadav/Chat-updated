import { useState } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import wishes from '../../../../../Assets/Images/Umeet/wishesTemplate.webp'
import selectedimg from '../../../../../Assets/Images/Umeet/Umeet-Main/Umeet-Attending.png'
import person from '../../../../../Assets/Images/Person.jpg'
import '../../Umeet.css'
import AddByContactModal from './AddByContactModal'
import group from '../../../../../Assets/Images/Umeet/Umeet-Main/Group 1054.png'

const friendDataList = [
  {id: 1,name: "Smith",img: person,checked: false},{name: "jd",img: person,checked: false},{name: "Ak",img: person,checked: false},
]

const classmatesDataList = [
  {name: "Smith1",img: person,checked: false},{name: "jd1",img: person,checked: false},{name: "Ak1",img: person,checked: false},
]


const relativesDataList = [
  {name: "Smith2",img: person,checked: false},{name: "jd2",img: person,checked: false},{name: "Ak1",img: person,checked: false},
]

const officematesDataList = [
  {name: "Smith3",img: person,checked: false},{name: "jd3",img: person,checked: false},{name: "Ak1",img: person,checked: false},
]

const unionsDataList = [
  {name: "Smith4",img: person,checked: false},{name: "jd4",img: person,checked: false},{name: "Ak1",img: person,checked: false},
]

const PersonalOtherGuest = ({ onClose, handleAddByContactModal }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [showAddByContactModal, setShowAddByContactModal] = useState(false)
  const [selectedBy, setSelectedBy] = useState('Friends')
  const [dataList, setDataList] = useState([])

  const handleSelected = (select)=>{
    setSelectedBy(select)
  }

  // const handleAddByContactModal = ()=>{
  //  setShowAddByContactModal(true)
  // }

  // Function to handle checkbox change
  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = [...dataList];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setDataList(updatedCheckboxes);

    const allChecked = updatedCheckboxes.every((checkbox) => checkbox.checked);
    setSelectAll(allChecked);
  };

  // Function to handle "Select All" checkbox change
  const handleSelectAllChange = () => {
    const updatedCheckboxes = dataList.map((checkbox) => ({
      ...checkbox,
      checked: !selectAll,
    }));
    setDataList(updatedCheckboxes);
    setSelectAll(!selectAll);
  };

  return (
    <div className='fixed top-0 w-full z-20 h-full flex justify-center items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>

     <div className={`w-[96%] md:w-[70%] lg:w-[50%] 2xl:w-[50%] md:h-[87%] flex flex-col justify-between bg-white rounded-xl p-3 lg:p-5 ${showAddByContactModal ? '-z-10' : ''}`}>
      <div className=''>
       <div className='flex font-medium border-b justify-start items-center flex-wrap text-[14px] lg:text-[16px] pb-1 mb-1 text-gray-600'>
         <button 
         onClick={()=>{ handleSelected('Friends'); setDataList(friendDataList) }} 
         className={`${selectedBy == 'Friends' ? 'bg-[#649B8E] text-white' : ''} px-1 py-1 text-[#649B8E] rounded-md border`}>
         Friends</button>
         <button 
         onClick={()=>{ handleSelected('Classmates'); setDataList(classmatesDataList) }}  
         className={`${selectedBy == 'Classmates' ? 'bg-[#649B8E] text-white' : ''} px-1 py-1 rounded-md ml-1 border text-[#649B8E]`}>
         Classmates</button>
         <button 
         onClick={()=>{ handleSelected('Relatives'); setDataList(relativesDataList) }}  
         className={`${selectedBy == 'Relatives' ? 'bg-[#649B8E] text-white' : ''} px-1 py-1 rounded-md ml-1 border boredr-[#649B8E] text-[#649B8E]`}>
         Relatives</button>
         <button 
         onClick={()=>{ handleSelected('Officemates'); setDataList(officematesDataList) }}  
         className={`${selectedBy == 'Officemates' ? 'bg-[#649B8E] text-white' : ''} px-1 py-1 rounded-md ml-1 border boredr-[#649B8E] text-[#649B8E]`}>
         Officemates</button>
         <button 
         onClick={()=>{ handleSelected('Unions'); setDataList(unionsDataList) }}  
         className={`${selectedBy == 'Unions' ? 'bg-[#649B8E] text-white' : ''} px-1 py-1 rounded-md ml-1 border boredr-[#649B8E] text-[#649B8E]`}>
         Unions</button>
         <button 
         onClick={()=>{
          handleSelected('Add by Email/Phone')
          handleAddByContactModal() }}  
         className={`${selectedBy == 'Add by Email/Phone' ? 'bg-[#649B8E] text-white' : ''} px-1 py-1 rounded-md ml-1 my-0.5 border boredr-[#649B8E] text-[#649B8E]`}>
         Add by Email/Phone</button>
       </div>
       <div className=''>
        <input type='search' className='h-7 p-2 h-8 outline-none border border-gray-300 w-full bg-gray-100 rounded-md' placeholder='Search....' />
        <div className='my-3 flex items-center'>
      	 <label className='text-[17px] text-gray-700 flex items-center'>
         <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAllChange}
          className='w-5 h-5 mr-2'
          />Select All</label>
    	</div>
    	<div className='h-[190px] md:h-[205px] lg:h-[288px] 2xl:h-[320px] hideScrol overflow-y-scroll pr-2'>
    	{
    	 dataList?.map((data, i)=>(
    	  <div key={i} className='flex items-center mb-2 lg:mb-3'>    	   
    	   <div className='w-1/6'>
    	    <img src={data?.img} className='w-10 h-10 rounded-full object-cover' />
    	   </div>
    	   <span className='w-4/6 font-medium text-[15px]'>{data.name}</span>
    	   <div className='w-1/6 flex justify-end'>
    	     <input 
            type="checkbox"
            checked={data.checked}
            onChange={() => handleCheckboxChange(i)}
            className='w-4 h-4' />
    	   </div>
    	  </div>
    	 ))
    	}
    	</div>

       </div>            
      </div>

      <section className='flex w-full'>       
        <img src={group} className='h-9 w-9 mr-3 mt-2.5' />
        <div className='w-5/6'>
         <button className='w-full py-1 rounded-xl text-white mt-2.5 border border-[#649B8E] bg-[#649B8E]'>Save</button>       
         <button onClick={onClose} className='w-full py-1 my-1 rounded-xl border border-[#649B8E] text-[#649B8E]'>Cancel</button> 
        </div>
      </section>
     </div>  
     {showAddByContactModal && <AddByContactModal onClose={()=>setShowAddByContactModal(false)} />}
    </div>
  )
}

export default PersonalOtherGuest
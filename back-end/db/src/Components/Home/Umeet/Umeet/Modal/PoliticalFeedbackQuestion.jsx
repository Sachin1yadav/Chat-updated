import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useState } from 'react'
import { handleCreateQuestionUI } from "../../../../../redux/actionCreators/umeetActionCreator";
import { useDispatch } from 'react-redux'

const PoliticalFeedbackQuestion = ({ onClose }) => {
  const [inputValue, setInputValue] = useState('')
  const [inputValue1, setInputValue1] = useState('')
  const [inputValue2, setInputValue2] = useState('')
  const [inputValue3, setInputValue3] = useState('')
  const [inputValue4, setInputValue4] = useState('')
  const [characterCount, setCharacterCount] = useState(0)
  const [characterCount1, setCharacterCount1] = useState(0)
  const [characterCount2, setCharacterCount2] = useState(0)
  const [characterCount3, setCharacterCount3] = useState(0)
  const [characterCount4, setCharacterCount4] = useState(0)

  const dispatch = useDispatch()

  const ques = {
    question: inputValue,
    option1: inputValue1,
    option2: inputValue2,
    option3: inputValue3,
    option4: inputValue4,    
  }

  const handleInputChange = (event) => {
    const input = event.target.value;
    if (input.length <= 200) {
      setInputValue(input);
      setCharacterCount(input.length);
    } else {
      setInputValue(input.slice(0, 200));
      setCharacterCount(200);
    }
  };

  const handleInputChange1 = (event) => {
    const input = event.target.value;
    if (input.length <= 85) {
      setInputValue1(input);
      setCharacterCount1(input.length);
    } else {
      setInputValue1(input.slice(0, 85));
      setCharacterCount1(85);
    }
  };

  const handleInputChange2 = (event) => {
    const input = event.target.value;
    if (input.length <= 85) {
      setInputValue2(input);
      setCharacterCount2(input.length);
    } else {
      setInputValue2(input.slice(0, 85));
      setCharacterCount2(85);
    }
  };

  const handleInputChange3 = (event) => {
    const input = event.target.value;
    if (input.length <= 85) {
      setInputValue3(input);
      setCharacterCount3(input.length);
    } else {
      setInputValue3(input.slice(0, 85));
      setCharacterCount3(85);
    }
  };      

  const handleInputChange4 = (event) => {
    const input = event.target.value;
    if (input.length <= 85) {
      setInputValue4(input);
      setCharacterCount4(input.length);
    } else {
      setInputValue4(input.slice(0, 85));
      setCharacterCount4(85);
    }
  };

  const handleQuestion = ()=>{
    dispatch(handleCreateQuestionUI(ques))
    onClose()
  }

  return (
    <div className='absolut fixed top-0 left-0 h-full w-full flex justify-center items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
     <div className='w-[98%] md:w-[60%] lg:w-[40%] xl:w-[29%] bg-white rounded-xl p-3'>
      <div className='flex py-1 text-gray-600'>
        <span className='text-[18px] w-11/12 flex justify-center text-gray-700 font-bold'>Add Question</span>
        <AiOutlineCloseCircle onClick={onClose} className='w-8 cursor-pointer hover:text-red-500 h-7'/>
      </div>          

      <section>
       <div className='relative'>
       	<label className='absolute z-10 text-[10px] left-4 bg-white px-2 font-semibold text-gray-400'>Enter Your Question</label>
       	<textarea
         value={inputValue} 
         onChange={handleInputChange}
         placeholder='What is good in event?' rows='2' className='w-full outline-none my-1 rounded-lg border border-gray-300 p-2'/>
        <label className={`${characterCount > 200 ? 'error' : ''} text-xs flex text-gray-600 justify-end`}>
          {characterCount}/200
        </label>
       </div>
       <div className='relative'>
       	<label className='absolute z-10 text-[10px] left-4 bg-white px-2 font-semibold text-gray-400'>Option 1*</label>
       	<input
         value={inputValue1} 
         onChange={handleInputChange1}
         className='w-full outline-none my-1 rounded-lg border border-gray-300 p-2'/>
        <label className={`${characterCount > 200 ? 'error' : ''} text-xs flex text-gray-600 justify-end`}>
          {characterCount1}/85
        </label>
       </div>
       <div className='relative'>
       	<label className='absolute z-10 text-[10px] left-4 bg-white px-2 font-semibold text-gray-400'>Option 2*</label>
       	<input
         value={inputValue2} 
         onChange={handleInputChange2}
         className='w-full outline-none my-1 rounded-lg border border-gray-300 p-2'/>
        <label className={`${characterCount > 200 ? 'error' : ''} text-xs flex text-gray-600 justify-end`}>
          {characterCount2}/85
        </label>
       </div>
       <div className='relative'>
       	<label className='absolute z-10 text-[10px] left-4 bg-white px-2 font-semibold text-gray-400'>Option 3 (optional)</label>
       	<input 
         value={inputValue3} 
         onChange={handleInputChange3} 
         className='w-full outline-none my-1 rounded-lg border border-gray-300 p-2'/>
        <label className={`${characterCount > 200 ? 'error' : ''} text-xs flex text-gray-600 justify-end`}>
          {characterCount3}/85
        </label>
       </div>
       <div className='relative'>
       	<label className='absolute z-10 text-[10px] left-4 bg-white px-2 font-semibold text-gray-400'>Option 4 (optional)</label>
       	<input 
         value={inputValue4} 
         onChange={handleInputChange4}
         className='w-full outline-none my-1 rounded-lg border border-gray-300 p-2'/>
        <label className={`${characterCount > 200 ? 'error' : ''} text-xs flex text-gray-600 justify-end`}>
          {characterCount4}/85
        </label>
       </div>                    
      </section>  

      <section className='w-full mx-'>
         <button onClick={handleQuestion} className='py-2.5 my-2 text-[17px] w-full rounded-lg text-white font-semibold bg-[#649B8E] '>Done</button>
      </section> 
     </div>
    </div>
  )
}

export default PoliticalFeedbackQuestion
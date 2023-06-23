import { useState, useEffect } from 'react';

function ToggleButton({ handleFoodCreate, feedbackVal }) {
  const [isOn, setIsOn] = useState(true);

  const handleClick = () => {
    setIsOn(prevState => !prevState)
    if(!feedbackVal) handleFoodCreate(!isOn)
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${
        isOn ? 'bg-[#649B8E]' : 'bg-gray-300'
      } relative inline-flex items-center rounded-full ${feedbackVal ? 'w-[120px] h-8' : 'w-12'} h-7 focus:outline-none`}
    >
    <div className='flex'>
      <span
        className={`${
          isOn ? `${feedbackVal ? 'translate-x-[92px]' : 'translate-x-6'}` : 'translate-x-1'
        } inline-block pl-2 w-6 h-6 transform bg-white rounded-full`}
      />
      <span className={`${isOn ? 'pl-0 text-white': 'pl-4'}`}>{feedbackVal ? `${isOn ? 'Only Me' : 'Public'}` : ''}</span>
    </div>      
    </button>
  );
}

export default ToggleButton;

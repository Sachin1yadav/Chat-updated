import React from 'react'
import { BsEmojiSmile } from 'react-icons/bs';
import { RiImageFill } from 'react-icons/ri'
import SearchComponent from '../Home/SearchComponent/SearchComponent';
import { MdSend } from 'react-icons/md';
import { CgSmileMouthOpen } from 'react-icons/cg';
import { useState } from 'react';
import AlertSmall from '../common/AlertSmall';
import { IoSend } from 'react-icons/io5';
import { IoIosCloseCircleOutline } from 'react-icons/io'
import SearchComponentKicks from '../Home/SearchComponent/SearchComponentKicks';

const TypeMessage = ({ placeholder, alert, inputValue, handleEmojiClick, sendMessage, handleInputChange, handleFile, msgFile }) => {
  const [state, setState] = useState({})
  const { text } = state
  return (
    <div className="flex flex-1 items-center">
      <div className='w'>
        {msgFile ?
        <div className='flex items-start'>
        <img className="w-[100px]  right-0 top-0 object-cover
        " src={msgFile || ""} />
        <IoIosCloseCircleOutline className='-ms-2 -mt-2 cursor-pointer bg-white rounded-full' onClick={() => handleFile('remove')}  />
        </div>
        : 
      <label htmlFor="sendFile" className='w-[100px] ml-6 inline-block text-center'>
        <RiImageFill size={32} className="cursor-pointer" />
      </label>
      }

      </div>
      {/* <BsEmojiSmile size={32} className="me-2 cursor-pointer" /> */}
    
        <input
        id="sendFile"
        type="file"
        className="hidden"
        accept='image/*'
        onChange={handleFile}
      />
      <div className="mx-2 w-[70%] relative">
        {/* <div className="w-[65%]"> */}
        <SearchComponentKicks
          handleInputChange={handleInputChange}
          bgColor={"#e4e7ec"}
          placeholder={placeholder}
          inputValue={inputValue}
          handleEmojiClick={handleEmojiClick}
        />
      </div>
      {

        // <MdSend className="cursor-pointer text-blue-400 w-[35%]"
        <MdSend className="cursor-pointer text-blue-400"
          onClick={() => sendMessage(text)} size={30} />

        // <AlertSmall
        //   showAlert={alert}
        //   button={
        //     <IoSend className="cursor-pointer mr-5"
        //       size={32}
        //       onClick={() => sendMessage(text)} />
        //   }
        //   message={"Please add your comment to send"}
        // />
        
      }
    </div>
  );
}

export default TypeMessage;




// import React from 'react'
// import { BsEmojiSmile } from 'react-icons/bs';
// import { RiImageFill } from 'react-icons/ri'
// import SearchComponent from '../Home/SearchComponent/SearchComponent';
// import { MdSend } from 'react-icons/md';
// import { CgSmileMouthOpen } from 'react-icons/cg';
// import { useState } from 'react';
// import AlertSmall from '../common/AlertSmall';
// import { IoSend } from 'react-icons/io5';
// import SearchComponentKicks from '../Home/SearchComponent/SearchComponentKicks';

// const TypeMessage = ({ placeholder, alert, sendMessage, handleFile, msgFile }) => {
//   const [state, setState] = useState({})
//   const { text } = state
//   return (
//     <div className="flex items-center">
//       {msgFile && (
//         <img className="w-[100px] absolute top-[180%]" src={msgFile || ""} />
//       )}
//       {/* <BsEmojiSmile size={32} className="me-2 cursor-pointer" /> */}
//       <input
//         id="sendFile"
//         type="file"
//         className="hidden"
//         onChange={handleFile}
//       />
//       <label htmlFor="sendFile">
//         <RiImageFill size={32} className="cursor-pointer" />
//       </label>
//       <div className="w-[65%]">
//         <SearchComponentKicks
//           handleInputChange={(e) => setState({ ...state, text: e })}
//           bgColor={"#e4e7ec"}
//           placeholder={placeholder}

//         />
//       </div>
//       {

//         <MdSend className="cursor-pointer text-blue-400 ml-3"
//           onClick={() => sendMessage(text)} size={30} />

//         // <AlertSmall
//         //   showAlert={alert}
//         //   button={
//         //     <IoSend className="cursor-pointer mr-5"
//         //       size={32}
//         //       onClick={() => sendMessage(text)} />
//         //   }
//         //   message={"Please add your comment to send"}
//         // />
//       }
//     </div>
//   );
// }

// export default TypeMessage;
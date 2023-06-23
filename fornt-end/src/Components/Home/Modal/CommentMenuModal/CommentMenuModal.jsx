import React from 'react'

const CommentMenuModal = ({data,topPosition,leftPosition}) => {
    const onHandleClick = (option)=>{
        if (option === "Report") {
          showModal(true)
        }
        closeModel(false)
      } 


        return (
          <div className={`w-[30%] absolute border-2 border-gray-600 bg-white z-10 px-2`} style={{top:`${topPosition}px`,right:`${leftPosition}px`}}>
            {data?.map((elem,index) => (
              <div  key={index} className="flex gap-2 border-b-2 border-gray-600 items-center py-2 cursor-pointer" onClick={()=>onHandleClick(elem.name                                 )}>
                {/* <img src={elem.icon} alt="" className="w-[25px] "/> */}
                <span className="text-[12px] text-gray-600 font-semibold">{elem.name}</span>
              </div>
            ))}
          </div>
        );
}

export default CommentMenuModal


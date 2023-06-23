import React, { useState } from 'react'
import PostContent from '../Home/PostContetnt/PostContent'
// import dataList from './dataList'
import Home from '../Home/Home'


const User = () => {
  const [showReportModal,setShowReportModal] = useState(false)
const onShowReportModal = ()=>{
  setShowReportModal(!showReportModal)
}


  return (
    <Home onShowReportModal={onShowReportModal} showReportModal={showReportModal}/>
  )
}

export default User

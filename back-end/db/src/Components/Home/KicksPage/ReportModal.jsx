import { useState } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ReportReasonModal from './ReportReasonModal'
import { useDispatch, useSelector } from "react-redux";
import { setPostReport } from "../../../redux/actionCreators/rootsActionCreator";
import { toast } from "react-toastify";
import ReportThanksReasonModal from "./ReportThanksReasonModal";

const ReasonsData = [
  'Nudity or Sexual activity', 'Sucide related', 'Self-Injury', 'Eating Disorders',
  'False Infirmation', 'Scam or Fraud', 'Hat speech or symbol', 'Harassment',
  'Terrorism', 'Animal abuse', 'Violence', 'Other'
]

const ReportModal = ({ onClose }) => {
  const dispatch = useDispatch()

  const reducerData = useSelector((state) => {
    return {
      activePost: state.rootsReducer?.activePost
    }
  })
  const { activePost } = reducerData;

  const [showReasonModal, setShowReasonModal] = useState(false);
  const [reason, setReason] = useState('');
  const [otherModal, setOtherModal] = useState(false);
  const [thanksReportModal, setThanksReportModal] = useState(false);

  const handleReportClick = (reasonName) => {
    setShowReasonModal(true);
    setReason(reasonName)
    if (reasonName == "Other") {
      setOtherModal(true);
    } else {
      setOtherModal(false);
    }
  }
  const reportPost = () => {
    const payload = {
      reportedid: activePost?.id,
      profileid: activePost?.profile?.id,
      message: reason,
      type: 'post',
      Createdatetime: new Date()
    }
    dispatch(setPostReport(payload)).then((res) => {
      if (res.status) {
        toast.success(res.message)
        setShowReasonModal(false);
        setThanksReportModal(true);

      } else {
        toast.error(res.message)

      }

      // console.log(res, "+++++++++++++ REEEEEEEEEEEEEEEEEPPPPPPPP");
    }).catch(err => {
      toast.error(err.message)

    })

  }

  return (
    <section className='fixed justify-center items-center top-0 left-0 h-full w-full flex z-20' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className='w-full md:w-[25%] flex flex-col bg-white mt-[4%] rounded-xl'>
        <div className='flex justify-between py-3 border-b bg-[#3b82f680]'>
          <span className='text-[19px] font-medium m-auto text-white'>Report</span>
          <AiOutlineCloseCircle onClick={onClose} className='w-7 h-7 text-gray-700 cursor-pointer' />

        </div>
        <p className='mt-1 font-medium text-start px-2'>Why are you Reporting this Post ?</p>

        <div className="px-8">
          {ReasonsData.map((reason, i) => (
            <div onClick={() => handleReportClick(reason)} className='py-1.5 text-start cursor-pointer hover:bg-blue-50'>{reason}</div>
          ))}
        </div>
      </div>
      {showReasonModal && <ReportReasonModal otherModal={otherModal} reportPost={reportPost} onClose={() => setShowReasonModal(false)} />}
      {thanksReportModal && <ReportThanksReasonModal reportPost={reportPost} onClose={() => setThanksReportModal(false)} />}
    </section>
  )
}

export default ReportModal
import UmeetNotAttending from '../../../../Assets/Images/Umeet/Umeet-Main/Umeet-NotAttending.png'
import UmeetAttending from '../../../../Assets/Images/Umeet/Umeet-Main/Umeet-Attending.png'
import Umeetmaybe from '../../../../Assets/Images/Umeet/Umeet-Main/Umeet-maybe.png'
import { BsThreeDots } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import editImg from '../../../../Assets/Images/Edit profile.png'
import deleteImg from '../../../../Assets/Images/delete.png'
import shareImg from '../../../../Assets/Images/External share.png'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents, getEventList, getEventByProfileid, 
getEventDetails, getAllInvitedEvents } from '../../../../redux/actionCreators/umeetActionCreator'
import EventLoadingAnimation from './EventLoadingAnimation'
 
function EventStatus({ data, handleBothDetails }) {
if(data?.eventstatus){
  if (data?.eventstatus?.toLowerCase() == 'attending') {
    return <img src={UmeetAttending} className='h-10 w-10 cursor-pointer' />
  } else if (data?.eventstatus?.toLowerCase() == 'not attending') {
    return <img src={UmeetNotAttending} className='h-10 w-10 cursor-pointer' />
  } else if (data?.eventstatus?.toLowerCase() == 'pending') {
    return <img src={Umeetmaybe} className='h-10 w-10 cursor-pointer' />
  } else if(data?.eventstatus == 'Cancel'){
    return <button className='px-0.5 lg:px-2 py-0.5 text-[10px] lg:text-[12px] rounded border-gray-500 text-gray-700 border mr-1'>cancelled</button>
  }else if(data?.eventstatus == 'Completed'){
    return <button className='px-0.5 lg:px-2 py-0.5 text-[10px] lg:text-[12px] rounded border-gray-500 text-gray-700 border mr-1'>completed</button>
  }
}
}

const SingleEvent = ({ dataList, myEventDataList, handleEventDetails,
  myEvent, handleDeleteEvent, handleEditEvent, handleShareEvent,
  isInvitedAll, handleBothDetails, handleImageSelect }) => {

  const reducerData = useSelector((state) => {
    return {
      profile: state?.profileReducer?.profile,
      allEvents: state?.umeetReducer?.allEvents?.slice(0, 70),
      allMyEvents: state?.umeetReducer?.allMyEvents?.slice(0, 70),
      allInvitedEvents: state?.umeetReducer?.allInvitedEvents?.slice(0, 70),
    }
  });

  const { profile, allEvents, allMyEvents, allInvitedEvents } = reducerData

  const [showDetail, setShowDetail] = useState(false)
  const [invitedEvents, setInvitedEvents] = useState(allInvitedEvents)
  const [completedEvents, setCompletedEvents] = useState(null)
  const [upcomingEvents, setUpcomingEvents] = useState(null)
  const [cancelledEvents, setCancelledEvents] = useState(null)

  const [completedMyEvents, setCompletedMyEvents] = useState(null)
  const [upcomingMyEvents, setUpcomingMyEvents] = useState(null)
  const [cancelledMyEvents, setCancelledMyEvents] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => { 
    if(isInvitedAll == 'Completed Events'){
      const completed = allInvitedEvents?.filter(item =>{ 
      const hasCompleted = item?.eventdetail?.eventstatus == 'Completed'

      return hasCompleted
     })

     setCompletedEvents(completed);
    }else if(isInvitedAll == 'Upcoming Events'){
      const upcoming = allInvitedEvents?.filter(item =>{ 
      const targetDateTimestamp = item?.eventdetail?.startdate;
      const currentDateTimestamp = Date.now();
      const targetDate = new Date(targetDateTimestamp);
      const currentDate = new Date(currentDateTimestamp);

      const hasComing = targetDate > currentDate;

      return hasComing
     })

     setUpcomingEvents(upcoming)
    }else if(isInvitedAll == 'Cancelled Events'){
      const cancells = allMyEvents?.filter(item =>{         
      const hasCancelled = item?.eventstatus == 'Cancel'

      return hasCancelled
     })

     setCancelledEvents(cancells)
    }


    if(isInvitedAll == 'Completed Events'){
      const completes = allMyEvents?.filter(item =>{     
      const hasCompleted = item?.eventstatus == 'Completed'

      return hasCompleted
     })

     setCompletedMyEvents(completes)
    }else if(isInvitedAll == 'Upcoming Events'){
      const upcoming = allMyEvents?.filter(item =>{ 
      const targetDateTimestamp = item?.startdate;
      const currentDateTimestamp = Date.now();
      const targetDate = new Date(targetDateTimestamp);
      const currentDate = new Date(currentDateTimestamp);

      const hasComing = targetDate > currentDate;

      return hasComing
     })

     setUpcomingMyEvents(upcoming)
    }else if(isInvitedAll == 'Cancelled Events'){
      const cancells = allMyEvents?.filter(item =>{     
      const hasCancelled = item?.eventstatus == 'Cancel'

      return hasCancelled
     })

     setCancelledMyEvents(cancells)
    }
  }, [])

  const DateFormat = ({dateData}) => {
    const date = new Date(dateData);

    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedDate = `${month} ${day}, ${year} AT ${hours}:${minutes} ${ampm}`;

    return <div>{formattedDate}</div>;
  };

  return (
    <>
      {myEvent ? (
        <>
          {(allMyEvents && allMyEvents?.length !== 0) ? 
          <>
          { 
            (isInvitedAll == 'All Events') && allMyEvents.map((data, i) => (
              <div 
               key={i} 
               onClick={()=>{handleBothDetails(data.id); handleImageSelect}} 
               className='relative cursor-pointer flex p-2.5 justify-between m-1 my-1.5 border rounded-xl border-gray-300'>
                {/* Img section */}
                <div className='w-4/12 fle h-[75px] items-center justify-center'>
                  <img src={data?.eventTemplate} className='w-11/12 h-full object-cover rounded-md' />
                </div>
                {/* center section */}
                <div className='8/12 flex flex-col'>
                  <p className='text-[#649b8e] font-medium text-[14px]'>{data?.eventName}</p>
                  <span 
                   className='text-gray-600 text-[12px]'>
                   <DateFormat dateData={data?.startdate} />
                  </span>

                </div>
                {/* End status section */}
                {data?.eventstatus ? 
                (
                  <div className='w-1/4 flex items-center justify-center'>
                    <EventStatus data={data} />
                  </div>
                 ) : (
                  <div className='w-1/4 flex justify-end'>
                    {/*
                    }
                    <BsThreeDots onClick={() => setShowDetail(!showDetail)} className='w-8 h-8 cursor-pointer mr-2 text-gray-700' />
                    {/*

                      showDetail ? (
                        <section className='absolute z-30 right-[4%] top-[45%] border bg-white border-gray-300'>
                          <div onClick={handleEditEvent} className='flex hover:bg-gray-300 p-2 z-40 cursor-pointer border-b border-gray-300'>
                           <img src={editImg} className='w-6 h-6' />
                           <span className='pr-4 px-2'>Edit Event</span>
                          </div>
                          <div onClick={handleDeleteEvent} className='flex hover:bg-gray-300 cursor-pointer p-2 border-b border-gray-300'>
                           <img src={deleteImg} className='w-6 h-6' />
                           <span className='pr-4 px-2'>Delete Event</span>
                          </div>
                          <div onClick={handleShareEvent} className='flex hover:bg-gray-300 cursor-pointer p-2'>
                           <img src={shareImg} className='w-6 h-6' />
                           <span className='pr-4 px-2'>Share Event</span>
                          </div> 
                        </section>
                      ) : null
                    */}
                  </div>
                )}
              </div>
            )) 
           }

           {
            (isInvitedAll == 'Upcoming Events') && upcomingMyEvents?.map((data, i) => (
              <div 
               key={i} 
               onClick={()=>{handleBothDetails(data.id); handleImageSelect}} 
               className='relative cursor-pointer flex p-2.5 justify-between m-1 my-1.5 border rounded-xl border-gray-300'>
                {/* Img section */}
                <div className='w-4/12 fle h-[75px] items-center justify-center'>
                  <img src={data?.eventTemplate} className='w-11/12 h-full object-cover rounded-md' />
                </div>
                {/* center section */}
                <div className='8/12 flex flex-col'>
                  <p className='text-[#649b8e] font-medium text-[14px]'>{data?.eventName}</p>
                  <span className='text-gray-600 text-[12px]'>{data?.eventdateAndTime}</span>

                </div>
                {/* End status section */}
                {data?.eventstatus ? 
                (
                  <div className='w-1/4 flex items-center justify-center'>
                    <EventStatus data={data} handleEventDetails={handleEventDetails} />
                  </div>
                 ) : (
                  <div className='w-1/4 flex justify-end'>
                    ...
                  </div>
                )}
              </div>
            )) 
           }

           {
            (isInvitedAll == 'Cancelled Events') && cancelledMyEvents?.map((data, i) => (
              <div 
               key={i} 
               onClick={()=>{handleBothDetails(data.id); handleImageSelect}} 
               className='relative cursor-pointer flex p-2.5 justify-between m-1 my-1.5 border rounded-xl border-gray-300'>
                {/* Img section */}
                <div className='w-4/12 fle h-[75px] items-center justify-center'>
                  <img src={data?.eventTemplate} className='w-11/12 h-full object-cover rounded-md' />
                </div>
                {/* center section */}
                <div className='8/12 flex flex-col'>
                  <p className='text-[#649b8e] font-medium text-[14px]'>{data?.eventName}</p>
                  <span className='text-gray-600 text-[12px]'>{data?.eventdateAndTime}</span>

                </div>
                {/* End status section */}
                {data?.eventstatus ? 
                (
                  <div className='w-1/4 flex items-center justify-center'>
                    <EventStatus data={data} handleEventDetails={handleEventDetails} />
                  </div>
                 ) : (
                  <div className='w-1/4 flex justify-end'>
                    ...
                  </div>
                )}
              </div>
            )) 
           }

           {
            (isInvitedAll == 'Completed Events') && completedMyEvents?.map((data, i) => (
              <div 
               key={i} 
               onClick={()=>{handleBothDetails(data.id); handleImageSelect}} 
               className='relative cursor-pointer flex p-2.5 justify-between m-1 my-1.5 border rounded-xl border-gray-300'>
                {/* Img section */}
                <div className='w-4/12 fle h-[75px] items-center justify-center'>
                  <img src={data?.eventTemplate} className='w-11/12 h-full object-cover rounded-md' />
                </div>
                {/* center section */}
                <div className='8/12 flex flex-col'>
                  <p className='text-[#649b8e] font-medium text-[14px]'>{data?.eventName}</p>
                  <span className='text-gray-600 text-[12px]'>{data?.eventdateAndTime}</span>

                </div>
                {/* End status section */}
                {((new Date(data?.enddate)) < (new Date(Date.now())) ) ? 
                (
                  <div className='w-1/4 flex items-center justify-center'>
                    <EventStatus data={data} handleEventDetails={handleEventDetails} />
                  </div>
                 ) : (
                  <div className='w-1/4 flex justify-end'>
                    ok
                  </div>
                )}
              </div>
            )) 
           }
          </> : <EventLoadingAnimation />
          } 
        </>
        ) : (
          <> 
            {(invitedEvents && allInvitedEvents.length !== 0) ?
              (isInvitedAll == 'Completed Events') ? completedEvents?.map((data, i) => (
                <div key={i} onClick={()=>handleBothDetails(data?.eventdetail.id)} className='flex cursor-pointer p-2 m-1 my-1.5 border rounded-xl border-gray-300'>
                  {/* Img section */}
                  <div className='w-4/12 fle h-[75px] items-center justify-center'>
                    <img src={data?.eventdetail?.eventTemplate} className='w-11/12 h-full object-cover rounded-md' />
                  </div>
                  {/* center section */}
                  <section className='w-6/12 pl-2'>
                    <div className='flex w-full flex-col'>
                      <p className='text-[#649b8e] font-medium text-[14px]'>{data?.eventdetail?.eventName}</p>
                      <span className='text-gray-600 text-[12px]'>{data?.eventdetail?.eventdateAndTime}</span>
                      <span className='text-[12px] text-gray-600'>
                       Hosted by:
                       <strong className='text-gray-800'>
                       {data?.eventprofile?.fname} {data?.eventprofile?.lname}
                       </strong>
                      </span>

                      {
                        data.eventstatus && data.eventstatus !== 'Completed' ? (
                          <span className='text-[12px] text-gray-600'>Status:<strong className='text-gray-800'> {data?.eventdetail?.eventstatus}</strong></span>
                        ) : null
                      }
                    </div>
                  </section>
                  {/* End status section */}
                  <div className='w-2/12 flex items-center justify-center'>
                    <EventStatus data={data?.eventdetail} handleEventDetails={handleEventDetails} />
                  </div>
                </div>
              )): 
              (isInvitedAll == 'Upcoming Events') ? upcomingEvents?.map((data, i) => (
                <div key={i} onClick={()=>handleBothDetails(data?.eventdetail.id)} className='flex cursor-pointer p-2 m-1 my-1.5 border rounded-xl border-gray-300'>
                  {/* Img section */}
                  <div className='w-4/12 fle h-[75px] items-center justify-center'>
                    <img src={data?.eventdetail?.eventTemplate} className='w-11/12 h-full object-cover rounded-md' />
                  </div>
                  {/* center section */}
                  <section className='w-6/12 pl-2'>
                    <div className='flex w-full flex-col'>
                      <p className='text-[#649b8e] font-medium text-[14px]'>{data?.eventdetail?.eventName}</p>
                      <span className='text-gray-600 text-[12px]'>{data?.eventdetail?.eventdateAndTime}</span>
                      <span className='text-[12px] text-gray-600'>Hosted by:<strong className='text-gray-800'> {data?.eventdetail?.host}</strong></span>
                      {
                        data.eventstatus && data.eventstatus !== 'completed' ? (
                          <span className='text-[12px] text-gray-600'>Status:<strong className='text-gray-800'> {data?.eventdetail?.eventstatus}</strong></span>
                        ) : null
                      }
                    </div>
                  </section>
                  {/* End status section */}
                  <div className='w-2/12 flex items-center justify-center'>
                    <EventStatus data={data?.eventdetail} handleEventDetails={handleEventDetails} />
                  </div>
                </div>
              )) : 
              (isInvitedAll == 'All Events') ? invitedEvents?.map((data, i) => (
                <div key={i} onClick={()=>handleBothDetails(data?.eventdetail.id)} className='flex cursor-pointer p-2 m-1 my-1.5 border rounded-xl border-gray-300'>
                  {/* Img section */}
                  <div className='w-4/12 fle h-[75px] items-center justify-center'>
                    <img src={data?.eventdetail?.eventTemplate} className='w-11/12 h-full object-cover rounded-md' />
                  </div>
                  {/* center section */}
                  <section className='w-6/12 pl-2'>
                    <div className='flex w-full flex-col'>
                      <p className='text-[#649b8e] font-medium text-[14px]'>{data?.eventdetail?.eventName}</p>
                      <span className='text-gray-600 text-[12px]'>{data?.eventdetail?.eventdateAndTime}</span>
                      <span className='text-[12px] text-gray-600'>
                       Hosted by:
                       <strong className='text-gray-800'>
                       {data?.eventprofile?.fname} {data?.eventprofile?.lname}
                       </strong>
                      </span>
                      {
                        data?.eventdetail?.eventstatus && data?.eventdetail?.eventstatus !== 'Completed' ? (
                          <span className='text-[12px] text-gray-600'>Status:<strong className='text-gray-800'> {data?.eventdetail?.eventstatus}</strong></span>
                        ) : null
                      }
                    </div>
                  </section>
                  {/* End status section */}
                  <div className='w-2/12 flex items-center justify-center'>
                    <EventStatus data={data?.eventdetail} handleEventDetails={handleEventDetails} />
                  </div>
                </div>
              )) :
              (isInvitedAll == 'Cancelled Events') ? cancelledEvents?.map((data, i) => (
                <div key={i} onClick={()=>handleBothDetails(data?.eventdetail.id)} className='flex cursor-pointer p-2 m-1 my-1.5 border rounded-xl border-gray-300'>
                  {/* Img section */}
                  <div className='w-4/12 fle h-[75px] items-center justify-center'>
                    <img src={data?.eventTemplate} className='w-11/12 h-full object-cover rounded-md' />
                  </div>
                  {/* center section */}
                  <section className='w-6/12 pl-2'>
                    <div className='flex w-full flex-col'>
                      <p className='text-[#649b8e] font-medium text-[14px]'>{data?.eventName}</p>
                      <span className='text-gray-600 text-[12px]'>{data?.eventdateAndTime}</span>
                      <span className='text-[12px] text-gray-600'>
                       Hosted by:
                       <strong className='text-gray-800'>
                       {data?.profile?.fname} {data?.profile?.lname}
                       </strong>
                      </span>
                      {
                        data?.eventstatus && data?.eventstatus !== 'Completed' ? (
                          <span className='text-[12px] text-gray-600'>Status:<strong className='text-gray-800'> {data?.eventstatus}</strong></span>
                        ) : null
                      }
                    </div>
                  </section>
                  {/* End status section */}
                  <div className='w-2/12 flex items-center justify-center'>
                    <EventStatus data={data} handleEventDetails={handleEventDetails} />
                  </div>
                </div>
              )) :
              <p className='text-green-600 flex justify-center items-center'>loading...</p>
            : <EventLoadingAnimation />}
          </>)
      }

    </>
  )
}

export default SingleEvent
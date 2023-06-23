import upload from '../../../../../Assets/Images/upload.jpeg'
import guest from '../../../../../Assets/Images/Umeet/Umeet-Main/Group 1054.png'
import { useState, useEffect } from 'react'
import ToggleButton from './ToggleButton';
import { createEvent, updateEvent, handleCreateDataUI,
getReunionTemplates, createEventTemplate } from "../../../../../redux/actionCreators/umeetActionCreator";
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import AutocompletePlace from '../../../../googlemap/AutocompletePlace';
import ToastWarning from '../../../../common/ToastWarning';
import { toast } from 'react-toastify';
import { AiOutlineEye } from 'react-icons/ai'
import PreviewEvent from './PreviewEvent'
import axios from 'axios'
import AddPeopleModal from './AddPeopleModal'
import AddByContactModal from './AddByContactModal'
import ChooseTemplate from './ChooseTemplate'
import AddGuestModal from './AddGuestModal'
import PoliticalGuestAddModal from './PoliticalGuestAddModal'
import PersonalOtherGuest from './PersonalOtherGuest'

const CreateEventModal = ({ selectedSpecificEvent, editMyEvent,
  handleCreatedEvent, whichType, politicalPartyFeedback,
  politicalPartyMeeting, handlePoliticalFeedbackQuestion,
  publicShopOpening,
   }) => {

  const { profileReducer, umeetReducer } = useSelector(state => state)

  const detail = umeetReducer.eventDetail

  const [formState, setFormState] = useState({
    eventName: '',
    eventdateAndTime: '',
    eventAddress: '',
    eventHostPhnNumber: '',
    hostmailid: '',
    eventEndDate: '',
    aboutevent: '',
  })
  const [inputType, setInputType] = useState('text');
  const [enabled, setEnabled] = useState(false)
  const [previewEvent, setPreviewEvent] = useState(false)
  const [eventMode, setEventMode] = useState('location')
  const [isValid, setIsValid] = useState(true);
  const [isVeg, setIsveg] = useState(true)
  const [foodType, setFoodType] = useState('')
  const [inputValue, setInputValue] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [feedbackVal, setFeedbackVal] = useState(false)
  const [noGuest, setNoGuest] = useState(null)
  const [startDate, setStartDate] = useState(null)

  const [showTemplate, setShowTemplate] = useState(false)  
  const [templateSelected, setTemplateSelected] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImgFile, setSelectedImgFile] = useState(null)
  const [showAddPeopleModal, setShowAddPeopleModal] = useState(false)
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [showAddByContactModal, setShowAddByContactModal] = useState(false)
  const [reunionModal, setReunionModal] = useState(true)
  const [showAddGroupPersonalOthers, setShowAddGroupPersonalOthers] = useState(false)
  const [showPoliticalAddGroup, setShowPoliticalAddGroup] = useState(false)
console.log(showPoliticalAddGroup)
  // re-union related
  const [education, setEducation] = useState('')

  const dispatch = useDispatch()
  const phoneNumberRules = /[0-9]{10}$/;

  const handleToggle = () => {
    setInputType('datetime-local');
  }

  const handleEventMode = (e) => {
    setEventMode(e.target.value);
  }

  // const handleShowTemplate = ()=>{
  //   setShowTemplate(true)
  // }

  const handleShowAddGroup = ()=>{
    setShowAddGroup(true)
  }

  const handleShowAddPeopleModal = ()=>{
    setShowAddPeopleModal(true)
  }

  const handleAddByContactModal = ()=>{
   setShowAddByContactModal(true)
  }  

  const handlePersonalOtherModal = ()=>{
    setShowAddGroupPersonalOthers(true)
  }

  const handleShowAddPoliticalGroup = ()=>{
    setShowPoliticalAddGroup(true)
  }

  const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true}

  const handleImageChange = () => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      setSelectedImgFile(image)
      setSelectedImage(URL.createObjectURL(image));
    }
  };

  const handlePreview =()=>{
    setPreviewEvent(true)
  }

  const handleShowGroup = () => {
    if(whichType == 'personal'){      
      if(selectedSpecificEvent == 'Re-Union'){
        handleShowAddPeopleModal()
      }else{
        handlePersonalOtherModal()
      }
    }
    else if(whichType == 'political') handleShowAddPoliticalGroup()
    else if(whichType == 'public') handleShowAddPoliticalGroup()
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleLocation = (location) => {
    console.log(location)
    setFormState({...formState, eventAddress:location})
  }

  const handleBlur = () => {
    const phoneRegex = /^\d{10}$/; 
    const isValidNumber = phoneRegex.test(formState.eventHostPhnNumber);
    setIsValid(isValidNumber)
  }

  const showChat = selectedSpecificEvent?.toLowerCase().includes('feedback') || 
  selectedSpecificEvent?.toLowerCase().includes('party meeting') || 
  selectedSpecificEvent?.toLowerCase().includes('party meeting') || 
  selectedSpecificEvent?.toLowerCase().includes('feedback') || 
  (whichType == 'political') 

  const isFeedbackEvent = selectedSpecificEvent?.toLowerCase().includes('feedback')

  const startingDate = new Date(formState.eventdateAndTime)
  const endingDate = new Date(formState.eventEndDate)

  const postData = {
    "eventName": formState.eventName,
    "createdatetime": new Date().toISOString().replace("Z", "+0000"),
    "date_created": Date.now().toString(),
    "event_category": whichType,
    "profileid": profileReducer?.profile?.id,
    "eventdateAndTime": new Date(formState?.eventdateAndTime).toLocaleString('en-US', options),
    "eventAddress": formState?.eventAddress,
    "eventHostPhnNumber": formState?.eventHostPhnNumber,
    "eventfrndEducationType": "need",
    "eventPrivacyType": "need",
    "eventFrndId": "need",
    "eventType": selectedSpecificEvent,
    "hostmailid": formState?.hostmailid,
    "id": uuidv4(),
    "aboutevent": inputValue,
    "eventmode": eventMode,
    "eventTemplate": selectedImage,
    "startdate": startingDate?.getTime(),
    "enddate": endingDate?.getTime(),
    "eventQuestion": umeetReducer?.question?.question ? umeetReducer?.question?.question : null,
    "eventquestionopt1": umeetReducer?.question?.option1 ? umeetReducer?.question?.option1 : null,
    "eventquestionopt2": umeetReducer?.question?.option2 ? umeetReducer?.question?.option2 : null,
    "eventquestionopt3": umeetReducer?.question?.option3 ? umeetReducer?.question?.option3 : null,
    "eventquestionopt4": umeetReducer?.question?.option4 ? umeetReducer?.question?.option4 : null,
    "food": isVeg,
    "chat": showChat ? false : true,
  }

  const handleCreateEvent = () => {
    // if(noGuest == null){
    //   return ToastWarning('Please select invities')
    // }

    if(!umeetReducer?.question?.question && isFeedbackEvent){
      return ToastWarning('Please craete a question')
    }
    
    if(!postData?.eventName) {
      return ToastWarning('Event name is required')
    }

    if(!formState?.eventdateAndTime){
      return ToastWarning("Start date and time is required");
    }else if(!formState?.eventEndDate){
      return ToastWarning("End date and time is required")
    }else if(!formState.eventAddress){
      if(!isFeedbackEvent){
        return ToastWarning("please enter the location/url")
      }
    }
    // else if (!phoneNumberRules.test(formState?.eventHostPhnNumber)) {
    //   return toast.error("Add valid mobile number")
    // }else if(!formState.hostmailid.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
    //   return toast.error("Add valid host mail id")
    // }
    
    dispatch(createEvent(postData)).then((res) => {
       if(res?.status){
        toast.success(res?.message)
        handleCreatedEvent()
      }else{
        toast.error(res?.message)
      }
    })
  }

  const handleEditAdd = async()=>{
    await dispatch(handleCreateDataUI({...postData, eventMode}))
    handleShowAddPeopleModal()
  }

  const handleGroupAndCreate = async()=>{    
    //await dispatch(handleCreateDataUI({...postData, eventMode, startDate}))
    handleShowGroup()
  }

  const handleEventCreate = async()=>{
    await dispatch(handleCreateDataUI({...postData, eventMode, foodType}))
    handleCreateEvent()
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

  const handleTemplateType = (e)=>{
    if(whichType == 'personal'){
      setShowTemplate(true)
    }else{
      handleImageChange(e)    
    }
  }

  useEffect(()=>{
    // if(selectedImgFile){
    //   (async()=>{
    //     const { data } = await 
    //     axios.post(`https://web.uynite.com/fileservice/s3/upload`, 
    //       selectedImgFile)
    //     console.log(data)
    //   })()
    // }
    if(editMyEvent){
      setSelectedImage(umeetReducer?.eventDetail?.eventTemplate)
    }

    if(umeetReducer?.inviteEmailsUI){
      setNoGuest(umeetReducer?.inviteEmailsUI)
    }

    if(selectedSpecificEvent == 'Re-Union' && reunionModal) {
      handleShowAddGroup()      
    }

    if(selectedSpecificEvent?.toLowerCase().includes('feedbac')){
      setFeedbackVal(true)
    }

    if(umeetReducer?.createData){
      const d = (umeetReducer?.createData?.eventdateAndTime == undefined) ? null : umeetReducer?.createData?.eventdateAndTime.toString()
      const dateObj = new Date(d);
      const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}T${dateObj.getHours().toString().padStart(2, "0")}:${dateObj.getMinutes().toString().padStart(2, "0")}`;
      if(umeetReducer?.createData?.eventdateAndTime != undefined){
       setStartDate(formattedDate)
      }
      setInputType('datetime-local')
      setInputValue(umeetReducer?.createData?.aboutevent)
      setEventMode(umeetReducer?.createData?.eventMode)
      setFoodType(umeetReducer?.createData?.foodType)
      setFormState((prev) => ({
       ...prev,
       eventName: umeetReducer?.createData?.eventName,
       eventAddress: umeetReducer?.createData?.eventAddress,
       eventHostPhnNumber: umeetReducer?.createData?.eventHostPhnNumber,
       hostmailid: umeetReducer?.createData?.hostmailid,       
       eventdateAndTime: formattedDate
      }))       
    }

    if(editMyEvent){
      if(detail?.eventAddress) setEventMode('location')      
      setFoodType(detail?.food)
      setInputValue(detail?.aboutevent)
      setFormState((prev) => ({
       ...prev,
       eventName: detail?.eventName,
       eventAddress: detail?.eventAddress,
       eventHostPhnNumber: detail?.eventHostPhnNumber,
       hostmailid: detail?.hostmailid,
      }))       
    }    

  }, [])

//umeetReducer?.createData, showAddGroup, dispatch
  return (
    <div className='lg:fullPage pb-16 lg:pb-3 bg-white border-gray-300'>
      <div className={`${editMyEvent ? 'lg:w-[65%]' : 'w-full md:w-[96%]'} border bg-white md:px-2 lg:px-3`}>
       <section className='flex justify-between items-center'>
        {
          editMyEvent ? <div className='px-3 my-2.5 text-[17px] font-semibold'>Edit Event</div>
            : <div className='px-3 my-2.5 text-[17px] font-semibold'>Create Event</div>
        }
        {selectedImage && (<AiOutlineEye onClick={handlePreview} className='mr-3 w-6 h-6 text-gray-700 cursor-pointer' />)}
       </section>
        <div className='border-2 mx-3'></div>
        <div className='px-7'>
          {editMyEvent ? (
            <select className='h-10 my-1 outline-none w-full border-b bg-white text-gray-600'>
              <option>Guest List - Display to all</option>
              <option>Guest List - Display only to Host</option>
            </select>
          ) : (
            <>
              <p className='pt-4 pb-2 text-[#649B8E]'>{selectedSpecificEvent}</p>
              <hr />
            </>
          )
          }

          <div className='mt-3'>
            <label>
              {selectedImage ? (
                <img 
                 src={selectedImage} 
                 alt="Selected" 
                 className='w-full h-[350px] object-cover rounded-md' />
                ) : <img src={upload} className='w-full h-[350px] object-cover' />
              }
            </label>
            <input 
             type="file" 
             id="myfile" 
             accept="image/*" 
             onChange={handleImageChange} 
             className='hidden' />          
            <label 
             htmlFor={(whichType == 'personal') ? null : "myfile" }
             onClick={handleTemplateType} 
             className='flex cursor-pointer justify-center py-2 mt-3 font-medium text-[#649B8E]'>
             {(whichType == 'personal') ?  `${selectedImage ? 'Change Template' : 'Select Template'}` : `${selectedImage ? 'Change Template' : 'Upload Template'}` }
            </label>
          </div>

          <input 
           name='eventName' 
           onChange={handleChange}
           value={formState.eventName} 
           className='border-b border-gray-300 h-10 my-2 w-full focus:outline-none'
           placeholder='Event Title*' />
          <input            
           name='eventdateAndTime' 
           type={inputType} 
           onClick={handleToggle} 
           onChange={handleChange}
           //value={startDate ? startDate : null}
           className='border-b focus:outline-none h-10 my-2 w-full text-gray-500' 
           placeholder='Start Date & Time*' />
          <input 
           name='eventEndDate' 
           type={inputType} 
           onClick={handleToggle} 
           onChange={handleChange} 
           className='border-b focus:outline-none h-10 my-2 w-full text-gray-500' 
           placeholder='End Date & Time*' />
          <div className={`${politicalPartyFeedback ? 'hidden' : ''} my-2 flex items-center`}>
            <span className='font-bold text-xl text-gray-600'>Event Mode</span>
            <div className='px-6 flex items-center'>
              <input 
               type="radio"
               value="location"
               checked={eventMode === 'location'}
               onChange={handleEventMode}
               className='accent-[#649B8E] w-5 h-5' 
               id='location' /><label htmlFor='location' className='pl-2'>Location</label>
            </div>
            <div className='px-6 flex items-center'>
              <input 
                type="radio"
                value="online"
                checked={eventMode === 'online'}
                onChange={handleEventMode} 
                className='accent-[#649B8E] w-5 h-5' 
                id='online' /><label htmlFor='online' className='pl-2'>Online</label>
            </div>
          </div>

          {/* <input name='eventAddress' onChange={handleChange} className={`${(politicalPartyFeedback || politicalPartyMeeting) ? 'hidden' : ''} border-b border-gray-300 h-10 my-2 w-full`} placeholder='Location*' /> */}
          {(eventMode == 'location') && (          
          <div className={`${(politicalPartyFeedback || politicalPartyMeeting) ? 'hidden' : ''} w-full my-3`}>
             <AutocompletePlace 
              livePlace={handleLocation} 
              placeholder={'Location*'} 
             />
          </div>
          )}
          {(eventMode == 'online') && (          
          <div className={`${(politicalPartyFeedback || politicalPartyMeeting) ? 'hidden' : ''}`}>
            <input 
             name='eventAddress'
             value={formState.eventAddress} 
             onChange={handleChange} 
             className={`${(politicalPartyFeedback || politicalPartyMeeting) ? 'hidden' : ''} border-b border-gray-300 h-10 my-2 w-full focus:outline-none`} 
             placeholder='Enter url*' 
            />
          </div>
          )}          
          <div className={`${(politicalPartyFeedback || publicShopOpening || politicalPartyMeeting) ? 'hidden' : ''} flex items-center`}>
            <div>
              <select className='h-10 outline-none border-b bg-white pr-6 text-gray-500'>
                <option>+91</option>
                <option>USA</option>
              </select>
            </div>
            <input name='eventHostPhnNumber' 
             className='border-b ml-3 border-gray-300 outline-none pl-2 h-10 my-2 w-full' 
             placeholder='Host Phone Number'
             value={formState.eventHostPhnNumber}
             onChange={handleChange}
             onBlur={handleBlur}
             />            
          </div>
          {!isValid && <div className='text-xs flex justify-center text-red-600'>Please enter a valid 10-digit phone number.</div>}

          <input 
           type='email' 
           name='hostmailid'
           value={formState.hostmailid} 
           onChange={handleChange} 
           className={`${(politicalPartyFeedback || publicShopOpening || politicalPartyMeeting) ? 'hidden' : ''} border-b border-gray-300 h-10 my-2 w-full focus:outline-none`} 
           placeholder='Host Mail Id' 
          />

          <div className='flex justify-between items-center my-2'>
           <div className='flex items-center'>
            <img src={guest} />
            <label onClick={handleGroupAndCreate} className={`${umeetReducer.inviteEmailsUI ? 'hidden' : ''} pl-5 cursor-pointer text-[#649B8E]`}>Add Guests</label>
            <label onClick={handleEditAdd} className={`${umeetReducer.inviteEmailsUI ? '' : 'hidden'} pl-5 cursor-pointer text-[#649B8E]`}>{umeetReducer?.inviteEmailsUI?.length} Guests Added</label>
           </div>
           <span onClick={handleEditAdd} className={`${umeetReducer.inviteEmailsUI ? '' : 'hidden'} cursor-pointer text-[#649B8E] border border-[#649B8E] px-2 py-0.5 rounded-md`}>Edit List</span>
          </div>

          <div className={`${(politicalPartyFeedback || politicalPartyMeeting) ? 'hidden' : ''} border-b my-3 mb-6`}>
            <select className='h-10 outline-none w-full border-b bg-white text-gray-600'>
              {publicShopOpening && (<>
                <option>Chat Type - Hide</option>
                <option>Chat Type - Display</option>
              </>)
              }
              <option className={`${publicShopOpening ? 'hidden' : ''}`}>Guest List - Display to all</option>
              <option className={`${publicShopOpening ? 'hidden' : ''}`}>Guest List - Display only to host</option>
            </select>
          </div>
 
          <div className={`${((eventMode == 'online') || politicalPartyFeedback) ? 'hidden' : ''} flex my-4 justify-between`}>
            <span className='text-gray-700'>Food Availability</span>
            <div className="">
              <ToggleButton 
               handleFoodCreate={(value)=>setIsveg(value)} />
            </div>
          </div>
          {isVeg && (
            <div className={`${((eventMode == 'online') || politicalPartyFeedback) ? 'hidden' : ''} mb-3 w-full`}>
              <select 
               value={foodType} 
               onChange={(e)=>setFoodType(e.target.value)} 
               className='w-full h-10 bg-white outline-none text-gray-500 rounded-md border'>
                <option >Select Food Preference</option>
                <option value='veg'>Veg</option>
                <option value='non-veg'>Non-Veg</option>
                <option value='veg & non-veg'>Veg & Non-Veg</option>
              </select>
            </div>
          )}

          {editMyEvent &&
            <div className={`${politicalPartyFeedback ? 'hidden' : ''} flex my-7 justify-between`}>
              <span className='text-gray-700'>Live Streaming</span>
              <div className="py-">
                <ToggleButton />
              </div>
            </div>
          }
          <label className='py-1'>About Event</label>
          <textarea  
           value={inputValue} 
           onChange={handleInputChange} 
           rows='3' 
           placeholder='say something...' 
           className={`${(characterCount > 200) ? 'outline-red-100' : ''} w-full text-gray-700 outline-none my-2 rounded-xl relative border p-2`} />
          <label className={`${characterCount > 200 ? 'error' : ''} text-xs flex text-gray-600 justify-end`}>
            {characterCount}/200
          </label>

          <div className={`${politicalPartyFeedback ? '' : 'hidden'} `}>
            <p onClick={handlePoliticalFeedbackQuestion} className='py-2 font-bold text-[18px] cursor-pointer text-[#519d8b]'>Create Your Question</p>
            <label className=''>Your Question</label>
            <textarea 
             placeholder='What about it?' 
             rows='3' 
             value={umeetReducer?.question ? umeetReducer?.question?.question : ''}
             onChange={()=>{}}
             className='w-full outline-none my-2 rounded-xl relative border p-2' />
          </div>

          <div className={`${politicalPartyFeedback ? '' : 'hidden'} flex my-7 justify-between`}>
            <span className='text-gray-700'>Feedback visible to</span>
            <div className="">
              <ToggleButton 
               feedbackVal={feedbackVal}
              />
            </div>
          </div>

          <div className='flex flex-col my-1'>
            {editMyEvent ?
              <button onClick={() => dispatch(updateEvent(postData))} className='py-2.5 my-2 text-[17px] rounded-lg text-white font-semibold bg-[#649B8E] '>Update</button>
              : <button onClick={handleEventCreate} className='py-2.5 my-2 text-[17px] rounded-lg text-white font-semibold bg-[#649B8E] '>send</button>
            }
            <button className='py-2 text-[17px] rounded-lg font-semibold border border-[#649B8E]'>Cancel</button>
          </div>

        </div>
      </div>
      {previewEvent && <PreviewEvent
       onClose={()=>setPreviewEvent(false)}
       selectedSpecificEvent={selectedSpecificEvent}
       selectedImage={selectedImage}
       formState={formState}
       inputValue={inputValue}
       profileReducer={profileReducer}
       eventMode={eventMode}
       />}
     {showTemplate && 
      <ChooseTemplate 
       onClose={()=>setShowTemplate(false)} 
       //saveTemplate={handleTemplateImage} 
       //handleImageChange={handleImageChange}
       selectedSpecificEvent={selectedSpecificEvent}
       setTemplateSelected={(urlid)=>setSelectedImage(urlid)} 
       handleSelectedImgFile={(file)=>setSelectedImgFile(file)}
      />}       
     {showAddGroup && 
      <AddGuestModal 
       education={education} 
       handleEducation={(eduData)=>setEducation(eduData)} 
       onClose={()=>{setShowAddGroup(false); setReunionModal(false)} }
       handleShowAddPeopleModal={handleShowAddPeopleModal}
       showAddPeopleModal={showAddPeopleModal}
       handlePeopleModalClose={()=>setShowAddPeopleModal(false)} />}
     {showAddPeopleModal && 
      <AddPeopleModal 
       education={education} 
       handleAddByContactModal={handleAddByContactModal}
       showAddByContactModal={showAddByContactModal}
       handlePeopleModalClose={()=>setShowAddPeopleModal(false)} />}       
     {showAddByContactModal && 
      <AddByContactModal 
        onClose={()=>setShowAddByContactModal(false)} />}       
     {showAddGroupPersonalOthers && 
      <PersonalOtherGuest 
       handleAddByContactModal={handleAddByContactModal}
       onClose={()=>setShowAddGroupPersonalOthers(false)} />}
     {showPoliticalAddGroup && 
      <PoliticalGuestAddModal 
       onClose={()=>setShowPoliticalAddGroup(false)}
       whichType={whichType} />}        
    </div>
  )
}

export default CreateEventModal
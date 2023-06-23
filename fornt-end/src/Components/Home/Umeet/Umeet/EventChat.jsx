import React,{ useState, useEffect } from 'react'
import Send from '../../../../Assets/Images/Umeet/Umeet-Main/U-Send.png'
import { BsCamera, BsImage } from 'react-icons/bs'
import '../Umeet.css'
import person from '../../../../Assets/Images/Person.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { addEventMessage, getAllEventChatMessage } from '../../../../redux/actionCreators/umeetActionCreator'
import axios from 'axios'

const EventChat = ()=>{
  const [postMessage, setPostmessage] = useState("")
  const [messages, setMessages] = useState([])

  const dispatch = useDispatch()
  const { umeetReducer, profileReducer } = useSelector(state=>state)

  function formatChatTime(timestamp) {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  const sendMessage = (message) => {
    const newMessage = {
      message: message,
      sender: "me",
      timestamp: new Date().toLocaleTimeString(),
    };
    if(messages){
      setMessages([...messages, newMessage]);
    }else{
      setMessages([newMessage])
    }
  };  

  const clickHandler = () => {
    dispatch(addEventMessage({ 
        message: postMessage,
        createlocaltime: Date.now(),
        eventid: umeetReducer?.eventDetail?.id,
        profileid: profileReducer?.profile?.id
      }))
    sendMessage(postMessage);
    setPostmessage('')
  }
console.log(profileReducer?.profile?.id)
  useEffect(()=>{
    //dispatch(getAllEventChatMessage(umeetReducer?.eventDetail?.id))
    (async function getMessages(){
    const { data } = await axios.get(
      `https://web.uynite.com/event/api/eventmessage/getallmessage/${umeetReducer?.eventDetail?.id}`
    );
    const AllMessages = data?.data?.map(data=>{
      let msgData = {
        message: '',
        name: '',
        timestamp: formatChatTime(data.createlocaltime),
        sender: (profileReducer?.profile?.profileid == data?.profile?.id) ? 'me' : 'them'
      };
      msgData.message = data?.eventMessage?.message
      msgData.name = data?.profile?.fname + " " + data?.profile?.lname
      msgData.id = profileReducer?.profile?.id

      return msgData
    })
    console.log(AllMessages, data)
    setMessages(AllMessages)
    })()
  }, [])

  return (
    <div className="flex flex-col h-[580px] border rounded-lg pt-2 overflow-hidden border-gray-400 w-full">
      <div className="flex-1 hideScrol overflow-y-scroll">
      {(messages == null) ? <p className='flex justify-center pt-10 h-full font-semibold'>Be the 1st commenter</p> : null}

        {messages?.map((msg, i) => (
          <ChatBubble
            key={i}
            message={msg.message}
            sender={msg.sender}
            name={msg.name}
            timestamp={msg.timestamp}
            value={postMessage.messages}
          />
        ))}
      </div>      
      <div className="flex items-center bg-white">
        <BsCamera className='h-8 w-8 text-[#649B8E] mx-2' />
        <BsImage className='h-8 w-8 text-[#649B8E]' />
        <input
          type="text"
          placeholder="Add message here"
          className="w-full h-12 pl-2 outline-none bg-white"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(e.target.value);
              e.target.value = "";
              clickHandler()
            }
          }}

          onChange={(e)=>setPostmessage(e.target.value)}
        />
        <img 
         src={Send} 
         className='mr-2 h-10 w-10 cursor-pointer' 
         onClick={clickHandler} />
      </div>
    </div>
  );
}

function ChatBubble({ message, sender, timestamp, name }) {
  return (
    <div
      className={`flex flex-col items-${sender}-end mb-4 mx-4`}
    >
      <div
        className={`flex items-center ${sender === "me" ? "justify-end" : "justify-start"
          } mb-1`}
      >
        <section className='flex flex-col'>
          {sender !== "me" && (
            <div className='flex items-center mb-1'>
              <img
                src={person}
                alt="sender profile pic"
                className="w-10 h-10 rounded-full mr-1 object-cover"
              />
              <p className='text-[#649B8E] italic text-[14px] font-semibold'>{name}</p>
            </div>
          )}
          <div
            className={`px-2 py-2 flex justify-between items-end rounded-lg ${sender === "me"
              ? "bg-white rounded-br-none"
              : "bg-white rounded-bl-none"
              }`}
          >
            <p>{message}</p>
            <span className='text-[9px] ml-2'>{timestamp}</span>
          </div>        
        </section>
      </div>
    </div>
  );
 }

 export default React.memo(EventChat)
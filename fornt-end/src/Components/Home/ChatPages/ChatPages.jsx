import React, { useEffect, useRef, useState } from "react";
import PostForm from "../PostForm/PostForm";
import FriendList from "../FriendList/FriendList";
import CustomGroupModal from "../Modal/CustomGroupModal/CustomGroupModal";
import Portals from "../../Portals/Portals";
import SearchComponent from "../SearchComponent/SearchComponent";
import { ImPhone } from 'react-icons/im'
import { TbVideoPlus } from "react-icons/tb";
import ChatMessage from "../../chat/ChatMessage";
import io from "socket.io-client";
import axios from 'axios';
import { BsEmojiSmile } from 'react-icons/bs';
import { RiImageFill } from 'react-icons/ri'
import { MdSend } from 'react-icons/md';
import EmojiModal from "../../chat/EmojiModal";


const ENDPOINT = "http://localhost:4000";
var socket, selectedChatCompare;

const ChatPages = () => {
  const [createGroupModal, setCreateGroupModal] = useState(false)

  const [isModalOpen, setModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState();
  const [file, setFile] = useState();
  const [image, setImage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTypinig, setIsTypinig] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [replyData, setReplyData] = useState({});
  const [showReplyContainer, setShowReplyContainer] = useState(false);
  const [messageId, setMessageId] = useState('');


  const messagesContainerRef = useRef(null);
  const divRef = useRef(null);

  const selectedChatId = '6446555a7765e7b3114b4164';

  const toggleModal = () => {
    setModalOpen(prevState => !prevState);
  };

  const handleEmojiClick = (emoji) => {
    setnewMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  const reactMessage = (messageId) => {
    setMessageId(messageId);
  }

  const handleReactClick = async (emoji) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }

      const { data } = await axios.post("/api/v1/message/react", {
        id: messageId,
        emoji: String(emoji.emoji),
      }, config);

      console.log(data);

      setMessageId('');
    } catch (error) {
      console.log('an error occured while reacting to a message');
    }
  }

  const convertDate = (createdAt) => {
    const istDate = new Date(createdAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    return istDate.toLocaleString('en-US', options);
  }

  useEffect(() => {
    if (newMessage === undefined) {
      setnewMessage('');
    }
  }, [newMessage]);

  const fetchMessages = async () => {
    if (!selectedChatId) return;
    try {
      const { data } = await axios.get(`/api/v1/${selectedChatId}`);
      setMessages(data);

      //console.log(messages);

      socket.emit("join chat", selectedChatId);
    } catch (error) {
      console.log('error occured', error);
    }
  }


  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", { _id: '64464c66a7918bce5dce5a22' });
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTypinig(true));
    socket.on('stop typing', () => setIsTypinig(false));
  }, []);

  // Receiving message from socket.

  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      if (!selectedChatCompare || selectedChatId !== newMessageRecieved.chat._id) {
        // give notification
        alert('notification done')
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    })
  })

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setMessageId('');
      }
    };

    if (messageId !== '') {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [messageId]);


  const sendMessage = async (event) => {
    event.preventDefault();
    socket.emit('stop typing', selectedChatId);
    if (!file) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          }
        }
        const { data } = await axios.post("/api/v1/message", {
          content: newMessage,
          replyContent: showReplyContainer ? replyData.content : '',
          type: 'text',
          isReply: showReplyContainer,
          isDeleted: false,
          chatId: selectedChatId
        }, config);

        // console.log(data);
        socket.emit("new message", data);
        setShowReplyContainer(false);
        setnewMessage('');
        setMessages([...messages, data]);
        setModalOpen(false);
      } catch (error) {
        console.log('error occured', error);
      }
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          }
        }

        console.log('image is', image);

        const { data } = await axios.post("/api/v1/message", {
          content: image,
          replyContent: showReplyContainer ? replyData.content : '',
          type: 'file',
          isReply: showReplyContainer,
          isDeleted: false,
          chatId: selectedChatId
        }, config);

        socket.emit("new message", data);
        setShowReplyContainer(false);
        setImage('');
        setFile('');
        setnewMessage('');
        setMessages([...messages, data]);
      } catch (error) {
        console.log('error occured', error);
      }
    }
  };

  const deleteMessage = async (messageId) => {
    const response = window.confirm("Are you sure you want to delete this message?")
    if (response) {
      setDeleted(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          }
        }

        const { data } = await axios.post("/api/v1/message/delete", { id: messageId }, config);
        setDeleted(false);
      } catch (error) {
        console.log('an error occured while deleting the message');
      }
    }
  }

  const replyMessage = async (messageId) => {
    setShowReplyContainer(true);
    try {
      const { data } = await axios.get(`/api/v1/message/${messageId}`);
      setReplyData(data.Result);
    } catch (error) {
      console.log('an error occured while replying to a message');
    }
  }

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChatId;
  }, [selectedChatId, deleted, messageId])

  const typingHandler = (e) => {
    setnewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChatId);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChatId);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };

          const response = await axios.post("/api/v1/file/upload", data, config);
          console.log('response.data is ', response.data);
          setImage(response.data);

        } catch (error) {
          console.log('error occured', error);
        }
      }
    }
    getImage();
  }, [file])

  useEffect(() => {
    // Scroll to the bottom of the container when a new message is added
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setnewMessage(e.target.files[0].name);
  }


  const showCreateGroupModal = () => {
    setCreateGroupModal(true)
  }
  return (
    <>
      <div className="flex-1 w-full grid grid-cols-12 gap-2 mt-1" style={{ maxHeight: "calc(100vh - 200px)" }}>

        {/* Recent Chats */}
        <section className=" col-span-3 bg-white">
          <div className="py-2 flex justify-between items-center px-3">
            <h1 className="font-bold text-lg ">Recent Chat</h1>
            <span className="text-[#6780AF] text-[13px] font-bold cursor-pointer" onClick={showCreateGroupModal}>
              Form a group
            </span>
          </div>
          <div className="bg-white col-span-6">
            <SearchComponent classes={'mx-4'} bgColor={'#e4e7ec'} placeholder={'Search...'} />
          </div>
          <div className="h-[600px] overflow-y-scroll pt-3 flex flex-col gap-4">
            {[1, 2, 3, 4, 55, 56, 67, 7, 4, 43, 43, 33, 2, 2, 2, 2].map((elem, index) => (<FriendList key={index} icon={true} desc={true} menuButton />))}
          </div>
        </section>

        {/* Chats Section */}
        <section className="px-3 col-span-6 flex flex-col justify-between">
          {/* Top Section */}
          <div className="flex h-[55px] px-2 items-center bg-[#F6F6F6]">
            <div className="">
              <img src="./images/events.jpg" alt="" className="w-[45px] h-[45px] rounded-full" />
            </div>
            <div className=" flex flex-1 flex-col justify-center ml-2">
              <h1 className="font-bold">Elisa K</h1>
              <p className="text-[10px] font-bold">Active 3 hours ago</p>
            </div>
            <div>
              {isTypinig ? <div>typing...</div> : <></>}
            </div>
            <div className="flex gap-2 items-center">
              <ImPhone size={25} color="#6780af" className="cursor-pointer" />
              <TbVideoPlus size={30} className="ml-2 cursor-pointer" color="#6780af" />
            </div>
          </div>

          {/* Chat Section */}
          <div className="h-[73vh] overflow-y-scroll mb-1" ref={messagesContainerRef}>
            {/* messages here */}

            {messages.map((message, index) => {
              const formattedISTDate = convertDate(message.createdAt);

              const [dateCurrent, timeCurrent, period] = formattedISTDate.split(' ');

              if (index >= 1) {
                const prevFormattedISTDate = convertDate(messages[index - 1].createdAt);
                const [datePrev, timePrev] = prevFormattedISTDate.split(' ');

                return <ChatMessage key={index} content={message.content} reactMessage={reactMessage} reaction={message.reaction ? message.reaction : ''} isDeleted={message.isDeleted ? message.isDeleted : false} replyContent={message.replyContent ? message.replyContent : ''} date={dateCurrent === datePrev ? '' : dateCurrent} time={timeCurrent + ' ' + period} deleteMessage={deleteMessage} replyMessage={replyMessage} messageId={message._id} toggleModal={toggleModal} sender={message.sender._id} type={message.type ? message.type : 'text'} />
              } else {
                return <ChatMessage key={index} content={message.content} reactMessage={reactMessage} reaction={message.reaction ? message.reaction : ''} isDeleted={message.isDeleted ? message.isDeleted : false} replyContent={message.replyContent ? message.replyContent : ''} date={dateCurrent} time={timeCurrent + ' ' + period} deleteMessage={deleteMessage} replyMessage={replyMessage} messageId={message._id} toggleModal={toggleModal} sender={message.sender._id} type={message.type ? message.type : 'text'} />
              }
            })}
          </div>

          {showReplyContainer && <div className="w-[97%] mt-3 mb-1 rounded-md h-24 bg-[#F0F2F5] flex justify-center items-center gap-2">
            <div className="w-[93%] h-20 bg-[#E5E7EA] rounded-md flex pl-3 justify-center-center flex-col border-l-4 border-[#6780AF]">
              <p className="text-[#6780AF] font-semibold">You</p>
              <p>{replyData.content}</p>

            </div>
            <div>
              <button className="text-black text-2xl" onClick={() => { setShowReplyContainer(false) }}>X</button>
            </div>
          </div>}

          <div className='flex items-center mb-8'>
            <BsEmojiSmile size={32} className="me-2 cursor-pointer" onClick={toggleModal} />
            {isModalOpen && <EmojiModal handleEmojiClick={handleEmojiClick} />}
            {messageId !== '' && <div ref={divRef}><EmojiModal handleEmojiClick={handleReactClick} /></div>}
            <input id='sendFile' type='file' className='hidden' onChange={(e) => onFileChange(e)} />
            <label htmlFor='sendFile'><RiImageFill size={32} className='cursor-pointer' /></label>
            <div className='mx-6 w-full relative'>
              <form onSubmit={sendMessage}>
                <input
                  type="text"
                  placeholder="write messages here..."
                  className={` w-[90%] rounded-md pl-3 py-2 outline-none bg-[#e4e7ec]`}
                  onChange={typingHandler}
                  value={newMessage}
                />
              </form>
              <MdSend className='cursor-pointer absolute right-0 bottom-[1px]' size={34} onClick={sendMessage} />
            </div>
          </div>

          {/* Media Share Section */}

        </section>

        {/* Friend List Section */}
        <div className=" col-span-3 bg-white">
          <div className="py-2 flex px-2">
            <span className="flex-1 font-bold text-lg ">Friends List</span>
          </div>

          <div className="col-span-6">
            {/* <PostForm width={96} /> */}
            <SearchComponent classes={'mx-4'} bgColor={'#e4e7ec'} placeholder={'Search...'} />
          </div>

          <div className="h-[600px] overflow-y-scroll pt-2 flex flex-col gap-4">
            {[1, 2, 3, 4, 55, 56, 67, 7, 4, 43, 43, 33, 2, 2, 2, 2].map(() =>
              (<FriendList icon={null} desc={null} />))
            }
          </div>
        </div>
      </div>
      {createGroupModal && <Portals><CustomGroupModal setGroupModal={setCreateGroupModal} /></Portals>}
    </>
  );
};

export default ChatPages;

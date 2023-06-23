import React, { useState } from 'react'
import GetAppIcon from '@mui/icons-material/GetApp';
import { Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotInterestedIcon from '@mui/icons-material/NotInterested';


const ChatMessage = ({ content, time, sender, type, messageId, deleteMessage, replyMessage, replyContent, isDeleted, reaction, reactMessage, date }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [hovered, setHovered] = useState(false);

  const handleOpenDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const handleDeleteMessage = () => {
    deleteMessage(messageId);
    setAnchorEl(null);
  };

  const handleReplyClick = () => {
    replyMessage(messageId);
    setAnchorEl(null);
  }

  const handleReactClick = () => {
    reactMessage(messageId);
    setAnchorEl(null);
  }

  const convertDate = (dateString) => {
    const dateParts = dateString.split("/");

    const month = parseInt(dateParts[0], 10) - 1; // Subtract 1 as months are zero-based
    const day = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    const date = new Date(year, month, day);
    const formattedDate = date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return formattedDate;
  }

  const downloadMedia = (e, originalImage) => {
    e.preventDefault();
    try {
      fetch(originalImage)
        .then(resp => resp.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = "none";
          a.href = url;

          const nameSplit = originalImage.split('-').pop();

          a.download = "" + nameSplit + "";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {date !== '' && <p className='text-center text-red-500 mt-5 mb-5'>{convertDate(date.replace(/,/g, ""))}</p>}
      {sender === '64464c66a7918bce5dce5a22' ?
        isDeleted ?
          <div className='bg-[#6780af] w-[30%] break-words py-1 px-3 text-white rounded-md mt-5 relative left-[65%]'
            onMouseEnter={() => { setHovered(true) }}
            onMouseLeave={() => { setHovered(false) }}
          >
            {hovered && <div className="flex items-center justify-end absolute top-0 right-0">
              <ArrowDropDownIcon className="cursor-pointer" onClick={handleOpenDropdown} />
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseDropdown}>
                <MenuItem onClick={handleDeleteMessage}>Delete Message</MenuItem>
              </Menu>
            </div>}
            <div className='flex flex-col items-end'>
              <div className='flex gap-1 items-center text-[#bac3bb] italic'>
                <NotInterestedIcon style={{ fontSize: "18px" }} />
                <p className='text-[13.5px]'>you deleted this message</p>
              </div>
              <div className=''>
                <span className='text-xs'>{time}</span>
              </div>
            </div>
          </div> : <div className={`bg-[#6780af] w-[30%] break-words py-1 px-3 text-white rounded-md mt-5 relative left-[65%]`}
            onMouseEnter={() => { setHovered(true) }}
            onMouseLeave={() => { setHovered(false) }}
          >
            {hovered && <div className="flex items-center justify-end absolute top-0 right-0">
              <ArrowDropDownIcon className="cursor-pointer" onClick={handleOpenDropdown} />
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseDropdown}>
                <MenuItem onClick={handleReplyClick}>Reply</MenuItem>
                <MenuItem onClick={handleReactClick}>React to Message</MenuItem>
                <MenuItem onClick={handleDeleteMessage}>Delete Message</MenuItem>
              </Menu>
            </div>}
            {type === 'text' && <>
              {replyContent !== '' &&
                <div className='bg-[#9dadc9] p-2 text-black border-l-4 border-[#06CF9C] rounded-md'>
                  <p className='text-[#43524e] text-sm font-bold'>You</p>
                  {replyContent}
                </div>}
              <span>{content}</span>
              <div className='text-end text-xs'>{time}</div></>}
            {type === 'file' && <>
              {content.includes('.pdf') ?
                <div>
                  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png' alt="img" className='h-[45px]' />
                  <p>{content.split('-').pop()}</p>
                </div> : <><img src={content} alt="img" />
                  {replyContent !== '' && <p>{replyContent}</p>}
                  <p>{content.split('-').pop()}</p></>}

              <div className='text-end text-xs flex justify-end gap-2 mt-1'>
                <p>{time}</p>
                <GetAppIcon className='cursor-pointer' onClick={(e) => downloadMedia(e, content)} />
              </div>
            </>}
            {reaction !== '' && <p className='absolute left-1 bottom-[-10px] bg-gray-400 rounded-[100%] cursor-pointer'>{reaction}</p>
            }
          </div> :
        <div className='bg-[#626264] w-[30%] break-words py-1 px-3 text-white rounded-md mt-5'>
          <span>{content}</span>
          <div className='text-end text-xs'>{time}</div>
        </div>}
    </>
  )
}

export default ChatMessage
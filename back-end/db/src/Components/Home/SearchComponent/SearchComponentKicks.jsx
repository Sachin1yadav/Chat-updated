
import React, { useState } from "react";
import { useEffect } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiModal from "../../chat/EmojiModal";
import EmojiModalKicks from "../Modal/EmojiModal/EmojiModalKicks";
import EmojiPicker from "emoji-picker-react";
import Portals from "../../Portals/Portals";

const SearchComponentKicks = ({ bgColor, width, placeholder, classes, icon, handleInputChange, inputValue, handleEmojiClick }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [newMessage, setnewMessage] = useState("");

    // const handleEmojiClick = (emoji) => {
    //     setnewMessage((prevMessage) => prevMessage + emoji.emoji);
    //     // handleInputChange(newMessage)
    // };
    useEffect(() => {
        if (newMessage === undefined) {
            setnewMessage('');
        }
    }, [newMessage]);
    const toggleModal = () => {
        setModalOpen(prevState => !prevState);
    };

    const typingHandler = (e) => {
        setnewMessage(e.target.value);
        // handleInputChange(e.target.value)
    };

    return (
        <div
            className={`w-full h-[58px] flex items-center justify-center rounded-xl`}
        >
            <div
                className={`${classes} w-full flex rounded-md justify-between items-center `}
                style={{ backgroundColor: bgColor, width: `${width}%` }}
            >
                <BsEmojiSmile size={32} className="me-2 cursor-pointer" onClick={toggleModal} />

                {
                    isModalOpen && 
                    <Portals closeModal={()=>toggleModal()}>
                        <div className="fixed mt-16 lg:ml-10 top-0 z-[999999999999999]">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    </Portals>
                }
                {/* {isModalOpen && <EmojiPicker onEmojiClick={handleEmojiClick} emojiStyle='facebook' />} */}
                <input
                    type="text"
                    placeholder={placeholder}
                    className={` w-[90%] rounded-md pl-3 py-2 outline-none bg-[#e4e7ec]`}
                    onChange={handleInputChange}
                    value={inputValue}
                />

            </div>
        </div>
    )
}
export default SearchComponentKicks;
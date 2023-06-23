import React from 'react';
import Modal from 'react-modal';
import EmojiPicker from 'emoji-picker-react';

const EmojiModal = ({ handleEmojiClick }) => {
    const handleEmojiSelection = (emoji) => {
        handleEmojiClick(emoji);
    };
    return (
        <div className='fixed bottom-[37rem]'>
            <div className='absolute'>
                <EmojiPicker onEmojiClick={handleEmojiSelection} emojiStyle='facebook' />
            </div>
        </div>
    );
};

export default EmojiModal;

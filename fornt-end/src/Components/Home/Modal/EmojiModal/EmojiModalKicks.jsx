import React from 'react';
import Modal from 'react-modal';
import EmojiPicker from 'emoji-picker-react';

const EmojiModalKicks = ({ handleEmojiClick }) => {
    const handleEmojiSelection = (emoji) => {
        handleEmojiClick(emoji);
    };
    return (
        <div className='fixed bottom-[99%] right-[96%] md:right-[73%] lg:right-[67%]'>
            <div className='absolute'>
                <EmojiPicker onEmojiClick={handleEmojiSelection} emojiStyle='facebook' />
            </div>
        </div>
    );
};

export default EmojiModalKicks;

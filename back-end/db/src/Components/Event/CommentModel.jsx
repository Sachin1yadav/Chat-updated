import Modal from "react-modal";
import CommentBox from "../Home/PostContetnt/PostCard/CommentBox/CommentBox";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const CommentModal = ({ isOpen, onClose, comments }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="w-[30%] h-[35rem] relative top-[10vh] p-4 rounded-lg left-[35vw] focus:outline-none border-2 border-gray-400 bg-white">
            <CloseIcon onClick={onClose} className="absolute right-4 cursor-pointer text-red-600" />

            {/* <div className="mt-[35px]">
                {comments?.map((comment,index) => (
                    <CommentBox comment={comment} key={index}/>
                ))}
            </div> */}

            <div className="absolute bottom-10 w-full flex justify-center">
                <input type="text" placeholder="Add your comment ..." className="w-[90%] py-2 px-3 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-400" />
                <SendIcon className='relative right-[2.2rem] top-[0.3rem] bg-[#7991BD] p-1 rounded-[100%] text-white cursor-pointer' style={{ height: "30px", width: "30px" }} />
            </div>

        </Modal>
    );
};

export default CommentModal

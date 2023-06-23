import { Button, Card, CardFooter, CardHeader, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react'
import React from 'react'
import { useState } from 'react'
import { BsCamera } from 'react-icons/bs';
import user from '../../Assets/Images/user.png'

const ImageModal = ({ showModal, handleModal, closeModal, confirmClick, handleImage, 
    file, isOther, leftBtn, rightBtn, profileImgModal, handleSave,
 }) => {

    const [state, setState] = useState({});
    const { image } = state;
console.log(file);
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className=" w-[30%] bg-white rounded-xl ml-5 flex items-center flex-col  fixed top-[50%] left-[50%]
  transform translate-x-[-50%] translate-y-[-50%] z-50">
            <Card>
                <CardHeader shadow={false} floated={false} className="h-[300px] w-[350px] flex items-center">

                    <input
                        id= {profileImgModal ? "profile-pic" : "cover-pic"}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            handleImage(profileImgModal ? "profileImg" : "coverImg", e.target.files)
                            setState({...state, image: e.target.files[0]})
                        }}
                    />
                    {
                        profileImgModal ?
                        <label
                        // onClick={() => setState({ ...state, imageModal: true })}
                        htmlFor={`${isOther ? "" : "profile-pic"}`}
                        className="w-[250px] h-[250px] cursor-pointer rounded-full m-auto flex items-center justify-center border border-gray-400"
                    >
                        { file?.type ?
                            <img
                                src={URL.createObjectURL(file) || user }
                                alt=""
                                className="w-full h-full rounded-full border border-gray-400 object-cover"
                            />
                            :
                            <img
                                src={ file || user }
                                alt=""
                                className="w-full h-full rounded-full border border-gray-400 object-cover"
                            />                           
                        }
                    </label>
                    :
                    <label
                        // onClick={() => setState({ ...state, imageModal: true })}
                        htmlFor={`${isOther ? "" : "cover-pic"}`}
                        className="w-full h-full cursor-pointer rounded-xl flex items-center justify-center border border-gray-400"
                    >
                        {file?.type ? (
                            <img
                                src={URL.createObjectURL(file) || file }
                                alt=""
                                className="w-full h-full rounded-xl border border-gray-400 object-cover"
                            />
                        ) :
                         file ?
                         <img
                                src={ file || user }
                                alt=""
                                className="w-full h-full border border-gray-400 object-cover"
                            /> 
                            : 
                            <BsCamera size={28} className="text-gray-600" />
                        }
                    </label>
                    }
                    
                </CardHeader>

                {/* <CardBody>
                </CardBody> */}

                <CardFooter className="py-3 flex gap-3 justify-center">
                    <Button
                        onClick={() => handleImage(profileImgModal, 'delete')}
                        ripple={false}
                        fullWidth={true}
                        className="w-24 bg-gray-300 text-blue-gray-900 shadow-none 
                        hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105
                         active:scale-100"
                    >
                        {leftBtn}
                    </Button>
                    {
                        rightBtn &&
                    <Button
                        onClick={() => handleSave(profileImgModal)}
                        ripple={false}
                        fullWidth={true}
                        className="w-24 bg-gray-300 text-blue-gray-900 shadow-none 
                        hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105
                         active:scale-100"
                    >
                        {rightBtn}
                    </Button>
                    }
                </CardFooter>
            </Card>
        </div>
    )
}

export default ImageModal
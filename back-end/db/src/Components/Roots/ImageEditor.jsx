import React, { useState, useCallback, useMemo, useRef } from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import getCroppedImg from './cropImage'
import { useDispatch } from 'react-redux'
import { imageUploadApi } from '../../redux/actionCreators/rootsActionCreator'
// import Slider from '@material-ui/core/Slider'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import { withStyles } from '@material-ui/core/styles'
const ImageEditor = ({ file, cancleEdit, saveEdit }) => {
  const dispatch = useDispatch();
  const vidRef = useRef(null)
  const [image, setImage] = useState()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState('')
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedArea(croppedAreaPixels)
  }, []);

  const fileURL = useMemo(() => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      setImage(reader.result)
    })
  }, [file]);
  
  const videoTrim= () => {
    const file = vidRef.current;
  }

  const handleEdit = async () => {
    const theBlob = await getCroppedImg(image, croppedArea);
    theBlob.lastModifiedDate = new Date().getTime();
    theBlob.name = file.name;
    console.log(theBlob);
    saveEdit(theBlob)
    // dispatch(imageUploadApi(img))
  }

  return (
    <div className="App bg-white h-1/2">
      <div className="crop-container relative" style={{ height: '400px' }}>
        <Cropper
          image={image}
          video={image}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          classes={'h-[400px] object-contain'}
          style={{ height: '400px' }}
        />
      </div>
      <div className="absolute flex flex-wrap p-3 w-full gap-4 justify-center m-auto bg-white">
        <div className='flex gap-4 w-1/2'>
          <div>Zoom</div>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => {
              setZoom(e.target.value)
            }}
            className="zoom-range w-full"
          />
        </div>
        {/* <div className='w-1/2'>
          <div className='ml-auto'>Zoom</div>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => {
              setZoom(e.target.value)
            }}
            className="zoom-range w-full"
          />
        </div> */}

        <div className='w-1/2 text-center'>
          <button onClick={handleEdit} 
          className='px-10 py-1 bg-[#6869c1] rounded-2xl text-white mr-3'>Save</button>
          <button onClick={cancleEdit}
          className='px-10 py-1 border border-gray-500 rounded-2xl ml-3'>Cancel</button>
        </div>

      </div>
    </div>
  )
}

export default ImageEditor
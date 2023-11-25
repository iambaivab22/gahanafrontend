import React, {useState} from 'react'
import {AiFillPlayCircle, AiOutlineClose} from 'react-icons/ai'
import {FaWindowClose} from 'react-icons/fa'

const CustomVideoPlayer = ({videoUrl, thumbnailUrl}) => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  const closeFullScreen = () => {
    setIsFullScreen(false)
  }

  return (
    <div className="custom-video-player">
      {!isFullScreen ? (
        <div className="thumbnail" onClick={toggleFullScreen}>
          <img src={thumbnailUrl} alt="Video Thumbnail" />
          <div className="play-button" onClick={toggleFullScreen}>
            <AiFillPlayCircle size={20} color="purple" stroke="white" />
          </div>
        </div>
      ) : (
        <div className="video-container">
          <button className="close-button" onClick={closeFullScreen}>
            <FaWindowClose size={20} color="red"></FaWindowClose>
          </button>
          <video src={videoUrl} controls autoPlay />
        </div>
      )}
    </div>
  )
}

export default CustomVideoPlayer

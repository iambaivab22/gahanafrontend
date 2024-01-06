import React, {useState} from 'react'
import {AiFillPlayCircle, AiOutlineClose} from 'react-icons/ai'
import {FaWindowClose} from 'react-icons/fa'
import {IoClose, IoCloseCircle} from 'react-icons/io5'

const CustomVideoPlayer = ({videoUrl, thumbnailUrl}) => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  const closeFullScreen = () => {
    setIsFullScreen(false)
  }

  return (
    <div className="custom-video-player">
      {!isFullScreen ? (
        <>
          {isClosed && (
            <div className="thumbnail">
              <button className="close">
                <IoCloseCircle
                  size={20}
                  color="white"
                  onClick={() => {
                    setIsClosed(true)
                  }}
                ></IoCloseCircle>
              </button>
              <img
                src={thumbnailUrl}
                alt="Video Thumbnail"
                onClick={toggleFullScreen}
              />
              <div className="play-button" onClick={toggleFullScreen}>
                <AiFillPlayCircle size={20} color="white" stroke="white" />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="video-container">
          <button className="close-button" onClick={closeFullScreen}>
            <IoClose size={20} color="red" stroke="white"></IoClose>
          </button>
          <video src={videoUrl} controls autoPlay />
        </div>
      )}
    </div>
  )
}

export default CustomVideoPlayer

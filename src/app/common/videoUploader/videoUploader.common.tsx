import React, {useEffect, useState} from 'react'
import {AiFillCamera, AiFillCloseCircle} from 'react-icons/ai'
import {TbCameraPlus} from 'react-icons/tb'
import CustomVideoPlayer from '../customVideoPlayer/customVideoPlayer.component'

const VideoUploader = ({
  onVideoChange,
  value,
  defaultVideo,
  actionHandler
}: {
  onVideoChange: (e: any) => void
  value?: any
  defaultVideo: any
  actionHandler?: any
}) => {
  // Add more URLs as needed
  const [selectedVideos, setSelectedVideos] = useState<any>()
  const [files, setFiles] = useState([])

  useEffect(() => {
    if (!!defaultVideo) {
      setSelectedVideos(defaultVideo)
    }
  }, [defaultVideo])

  const handleVideoUpload = (e: any) => {
    e.stopPropagation()

    // onVideoChange && onVideoChange(e)

    // const files = Array.from(e.target.files)

    // const newVideos = files.map((file: any, index: number) => ({
    //   file: URL.createObjectURL(file),

    //   id: Math.random()
    // }))

    onVideoChange(e)
    e.stopPropagation()
    actionHandler && actionHandler(e.target.files[0])

    const videoObjectURL = URL.createObjectURL(e.target.files[0])

    setSelectedVideos(videoObjectURL)
  }

  // useEffect(() => {
  //   console.log(selectedImages, 'selected iamges from iamge uploader')
  //   onImageChange && onImageChange(selectedImages)
  // }, [selectedImages])

  const handleRemoveVideo = (id: any, isNew: boolean) => {
    console.log(id, ' product id ')

    console.log('handle remove image')

    // !isNew ? actionHandler && actionHandler(id) : null

    const updatedImages = selectedVideos?.filter(
      (image: any) => image.id !== id
    )
    setSelectedVideos(updatedImages)
  }

  useEffect(() => {
    console.clear()
    console.log(defaultVideo, 'default Video')
    console.log(selectedVideos, 'seelcted videosss')
  }, [selectedVideos, files])

  return (
    <div className="image-uploader">
      <input
        type="file"
        placeholder="Upload Your Product Video From Here"
        accept="video/*"
        onChange={handleVideoUpload}
        className="image-uploader-input"
        id="videoUploader"
      />
      <label htmlFor="videoUploader">
        {!selectedVideos ? (
          <div className="imageUploader-placeholder">
            <TbCameraPlus size={40}></TbCameraPlus>
            <p>Click here to upload the Video</p>
          </div>
        ) : (
          <div className="afterUpload">
            <TbCameraPlus size={40}></TbCameraPlus>
          </div>
        )}
      </label>

      <div className="video-list">
        {selectedVideos && (
          <CustomVideoPlayer
            videoUrl={selectedVideos}
            thumbnailUrl="https://cdn.kimkim.com/files/a/content_articles/featured_photos/050a89ea730f913b48cf7dea23719688bc3652fe/big-891ee83ca306656a3c388f949db9e72d.jpg"
          ></CustomVideoPlayer>
        )}

        {/* <span className="image-list-item">
            <video
              src={selectedVideos}
              controls
              width="30"
              height="30"
              className="video-list-item-preview"
            >
              <source src={selectedVideos} type="video/mp4" />
            </video>
          </span> */}
      </div>
    </div>
  )
}

export default VideoUploader

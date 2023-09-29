import React, {useState} from 'react'
import {AiFillCamera, AiFillCloseCircle} from 'react-icons/ai'

const VideoUploader = ({
  onVideoChange,
  value
}: {
  onVideoChange: (e: any) => void
  value: any
}) => {
  const [selectedVideos, setSelectedVideos] = useState<any>()

  const handleVideoUpload = (e: any) => {
    onVideoChange(e)
    e.stopPropagation()

    const videoObjectURL = URL.createObjectURL(e.target.files[0])

    setSelectedVideos(videoObjectURL)
  }

  // const handleRemoveImage = (id: number) => {
  //   const updatedImages = selectedVideos.filter((image) => image.id !== id)
  //   setSelectedVideos(updatedImages)
  // }

  console.log(selectedVideos, 'selected videos')

  return (
    <div className="image-uploader">
      <input
        type="file"
        placeholder="Upload Your Product Video From Here"
        accept="video/*"
        multiple
        onChange={handleVideoUpload}
        className="image-uploader-input"
        id="videoUploader"
      />
      <label htmlFor="videoUploader">india </label>
      <div className="imageUploader-placeholder">
        <AiFillCamera size={28}></AiFillCamera>
        <p>Click here to upload Video</p>
      </div>

      <div className="image-list">
        {selectedVideos && (
          <span key={selectedVideos} className="image-list-item">
            <video
              src={selectedVideos}
              controls
              width="320"
              height="360"
              className="video-list-item-preview"
            >
              <source src={selectedVideos} type="video/mp4" />
            </video>

            {/* <img
                src={URL.createObjectURL(image.file)}
                alt="Selected"
                onChange={(e: any) => e.stopPropagation()}
              /> */}
            <button
              onClick={(e: any) => {
                e.preventDefault()
                // handleRemoveImage(image.id)
              }}
              className="image-list-item-button"
            >
              <AiFillCloseCircle color="red" size={20}></AiFillCloseCircle>
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

export default VideoUploader

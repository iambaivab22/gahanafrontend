import React, {useEffect, useState} from 'react'
import {AiFillCamera, AiFillCloseCircle} from 'react-icons/ai'
import {TbCameraPlus} from 'react-icons/tb'

const ImageUploader = ({
  onImageChange,
  value,
  defaultImage,
  actionHandler
}: {
  onImageChange: (e: any) => void
  value: any
  defaultImage: any
  actionHandler: any
}) => {
  // Add more URLs as needed
  const [selectedImages, setSelectedImages] = useState([])
  const [files, setFiles] = useState([])

  useEffect(() => {
    if (!!defaultImage) {
      const remappedFiles = defaultImage?.map((item: any, index: number) => ({
        file: item.url,
        id: item._id
      }))

      setSelectedImages(remappedFiles)
    }
  }, [defaultImage])

  const handleImageUpload = (e: any) => {
    e.stopPropagation()

    onImageChange && onImageChange(e)

    const files = Array.from(e.target.files)

    const newImages = files.map((file: any, index: number) => ({
      file: URL.createObjectURL(file),
      isNew: true,
      id: Math.random()
    }))

    console.log(newImages, 'newImages')

    setSelectedImages((prev: any) => [...prev, ...newImages])
  }

  // useEffect(() => {
  //   console.log(selectedImages, 'selected iamges from iamge uploader')
  //   onImageChange && onImageChange(selectedImages)
  // }, [selectedImages])

  const handleRemoveImage = (id: any, isNew: boolean) => {
    console.log(id, ' product id ')

    console.log('handle remove image')

    !isNew ? actionHandler && actionHandler(id) : null

    const updatedImages = selectedImages?.filter(
      (image: any) => image.id !== id
    )
    setSelectedImages(updatedImages)
  }

  useEffect(() => {
    console.log(selectedImages, 'seelcted images')
  }, [selectedImages, files])

  return (
    <div className="image-uploader">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="image-uploader-input"
        id="imageUploader"
        // value={value && value}
      />
      <label htmlFor="imageUploader">
        {selectedImages.length <= 0 ? (
          <div className="imageUploader-placeholder">
            <TbCameraPlus size={40}></TbCameraPlus>
            <p>Click here to upload the image</p>
          </div>
        ) : (
          <div className="afterUpload">
            <TbCameraPlus size={40}></TbCameraPlus>
          </div>
        )}
      </label>

      <div className="image-list">
        {selectedImages?.map((image, index) => (
          <span key={index} className="image-list-item">
            <img
              src={image.file}
              alt="Selected"
              className="image-list-item-preview"
              onChange={(e: any) => e.stopPropagation()}
            />
            <button
              onClick={(e: any) => {
                e.preventDefault()
                handleRemoveImage(image.id, image.isNew)
              }}
              className="image-list-item-button"
            >
              <AiFillCloseCircle color="red" size={20}></AiFillCloseCircle>
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

export default ImageUploader

import {FormEvent, useEffect} from 'react'
import {useDragFile} from 'src/hooks'

import {
  DragAreaLabelStyled,
  DragAreaContainer,
  ImagePreviewStyled,
  ImageStyled
} from './dragArea.style'

interface DragAreaProps {
  getImage?: (imgSrc: any) => void
  style?: React.CSSProperties
  containerStyle?: React.CSSProperties
  defaultImage?: string
  imagePreviewStyle?: React.CSSProperties
  hidePreviewImage?: boolean
  imageStyle?: React.CSSProperties
}

export const DragArea = ({
  defaultImage,

  getImage,

  style,
  imageStyle,
  containerStyle,
  imagePreviewStyle,
  hidePreviewImage = false
}: DragAreaProps) => {
  const {
    imagePreview,
    imageFile,
    imageHandler,
    handleDrag,
    handleDrop,
    cleanUp,
    setImagePreview
  } = useDragFile()

  useEffect(() => {
    getImage?.(imageFile)
  }, [imageFile])

  useEffect(() => {
    defaultImage && setImagePreview(defaultImage)
  }, [defaultImage])

  useEffect(() => {
    return () => cleanUp()
  }, [])

  return (
    <DragAreaContainer
      onDragEnter={handleDrag}
      onSubmit={(e: FormEvent) => e.preventDefault()}
      style={containerStyle}
    >
      <input
        className="cursor-pointer hidden"
        type="file"
        id="image"
        name="image"
        accept="image/*"
        multiple={false}
        onChange={imageHandler}
        style={{display: 'none'}}
      />
      <DragAreaLabelStyled
        style={style}
        htmlFor="image"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label htmlFor="image" style={{margin: 4, cursor: 'pointer'}}>
          Drag &amp; drop your image here or Click to choose image!
        </label>
      </DragAreaLabelStyled>
      {!hidePreviewImage && imagePreview && (
        <ImagePreviewStyled style={imagePreviewStyle}>
          <ImageStyled
            src={imagePreview?.toString()}
            alt="Cover Image"
            style={imageStyle}
          />
        </ImagePreviewStyled>
      )}
    </DragAreaContainer>
  )
}

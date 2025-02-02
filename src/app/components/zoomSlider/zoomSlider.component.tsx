// import './App.css'
import {useStepContext} from '@mui/material'
import {useState, useRef, useEffect} from 'react'
import ReactImageMagnify from 'react-image-magnify'
import {FILE_URL} from 'src/config'

export const ZoomSlider = ({data}: {data: any}) => {
  console.log(data, 'data required')
  const [images, setImages] = useState([])
  // const images = [
  //   'src/assets/images/products/jewellery-1.jpg',
  //   'src/assets/images/products/jewellery-2.jpg',
  //   'src/assets/images/products/jewellery-3.jpg',
  //   'src/assets/images/products/perfume.jpg'
  // ]

  useEffect(() => {
    const images = data?.map((item: any, index: number) => {
      return `${FILE_URL}/products/${item}`
    })

    console.log(images, 'images values')

    setImages(images)

    setImg(images?.[0])
  }, [data])

  const [img, setImg] = useState(images?.[0])

  const hoverHandler = (image, i) => {
    setImg(image)
    refs.current[i].classList.add('active')
    for (var j = 0; j < images?.length; j++) {
      if (i !== j) {
        refs.current[j].classList.remove('active')
      }
    }
  }
  const refs = useRef([])
  refs.current = []
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el)
    }
  }

  return (
    <div className="container">
      <div className="left">
        <div className="left_1">
          {images?.map((image, i) => (
            <div
              className={i == 0 ? 'img_wrap active' : 'img_wrap'}
              key={i}
              onMouseOver={() => hoverHandler(image, i)}
              ref={addRefs}
            >
              <img
                src={image}
                alt=""
                onError={(event) =>
                  (event.currentTarget.src =
                    'https://www.verizon.com/learning/_next/static/images/87c8be7b206ab401b295fd1d21620b79.jpg')
                }
              />
            </div>
          ))}
        </div>
        <div className="left_2" style={{height: '100%', width: '513px'}}>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: img,
                height: 300,
                width: 300
              },
              largeImage: {
                src: img,
                width: 1000,
                height: 1200
              }
              //   enlargedImageContainerDimensions: {
              //     width: '150%',
              //     height: '150%'
              //   }

              //   enlargedImagePosition: 'over'
            }}
          />
        </div>
      </div>
      <div className="right"></div>
    </div>
  )
}

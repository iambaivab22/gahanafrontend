import React, {useState} from 'react'
import CustomVideoPlayer from 'src/app/common/customVideoPlayer/customVideoPlayer.component'

export const WatchAndShopSection = ({data}: any) => {
  return (
    <HStack
      justify="flex-start"
      gap="$3"
      style={{width: '100%', cursor: 'pointer'}}
    >
      {/* {data?.map((item: any, index: number) => {
        return <WatchAndShopCard data={data?.[index]} />
      })} */}

      <ProductCarousel data={data}></ProductCarousel>
    </HStack>
  )
}

export const WatchAndShopCard = ({
  data,
  isFullScreen,
  setIsFullScreen,
  activeVideoIndex,
  setActiveIndex,
  index
}: any) => {
  console.log(data, 'was')
  return (
    <div className="watchAndShopCardContainer">
      <CustomVideoPlayerWatch
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        activeVideoIndex={activeVideoIndex}
        setActiveVideoIndex={setActiveIndex}
        data={data}
        index={index}
        videoUrl={`${import.meta.env.REACT_APP_DEV_ASSET_URL}/video/${
          data?.video
        }`}
        thumbnailUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfcz8nhghqfpLH6iYrPyz6_U9fqSdujGVmrezxtryOpI0cxnLFzwSHklg5csZgs8K1QMU&usqp=CAU"
      ></CustomVideoPlayerWatch>
    </div>
  )
}

// import React, {useState} from 'react'
import {AiFillPlayCircle, AiOutlineClose} from 'react-icons/ai'
import {FaPlay, FaWindowClose} from 'react-icons/fa'
import {IoClose, IoCloseCircle} from 'react-icons/io5'
import {HStack, VStack} from 'src/app/common'
import {ProductCarousel} from '../productCarousel'
import {getNprPrice} from 'src/helpers/nprPrice.helper'

const CustomVideoPlayerWatch = ({
  videoUrl,
  data,
  thumbnailUrl,
  isFullScreen,
  setIsFullScreen,
  activeVideoIndex,
  setActiveVideoIndex,
  index
}) => {
  const [isClosed, setIsClosed] = useState(false)

  const toggleFullScreen = (activeVideoIndex) => {
    setIsFullScreen(!isFullScreen)
    setActiveVideoIndex(activeVideoIndex)
    console.log(index, 'index')
  }

  const closeFullScreen = (e: any) => {
    e.preventDefault()
    setIsFullScreen(false)
  }

  console.log(
    `${import.meta.env.REACT_APP_DEV_ASSET_URL}/${
      data?.images[0]?.coloredImage[0]
    }`,
    'hello image'
  )

  return (
    <div
      className="custom-video-players"
      onClick={() => toggleFullScreen(index)}
    >
      {
        !isFullScreen && (
          <div className="thumbnail">
            {/* <button className="close">
            <IoCloseCircle
              size={20}
              color="red"
              onClick={() => {
                setIsClosed(true)
              }}
            ></IoCloseCircle>
          </button> */}
            {/* <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            onClick={toggleFullScreen}
          /> */}

            <div className="videos">
              <video src={videoUrl} muted autoPlay loop />
            </div>
            <HStack gap="$3" className="custom-video-players-productDetail">
              <div className="productImage">
                <img
                  src={`${import.meta.env.REACT_APP_DEV_ASSET_URL}/products/${
                    data?.images[0]?.coloredImage[0]
                  }`}
                />
              </div>
              <VStack className="productDescription">
                <div className="productTitle">{data?.name}</div>
                <div className="productPrice">
                  {getNprPrice(data?.originalPrice)}
                </div>
              </VStack>
            </HStack>
            {/* <div className="play-button" > */}
            {/* <FaPlay size={30} color="white" stroke="white" /> */}
            {/* </div> */}
          </div>
        )

        // (
        //   <div className="video-container-fullScreen">
        //     <button
        //       className="close-button"
        //       onClick={(e: any) => closeFullScreen(e)}
        //     >
        //       <IoClose size={20} color="red" stroke="white"></IoClose>
        //     </button>
        //     <video src={videoUrl} controls autoPlay className="activeVideo" />
        //   </div>
        // )
      }
    </div>
  )
}

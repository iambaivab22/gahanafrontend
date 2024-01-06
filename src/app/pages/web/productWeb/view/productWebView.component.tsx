import {BiTimeFive} from 'react-icons/bi'
import {Chip, HStack, StatInfo, Title, VStack} from 'src/app/common'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'src/store'
import {getProductDetailByIdAction} from 'src/app/pages/products/product.slice'
import {useParams} from 'react-router-dom'
import ReactStarsRating from 'react-awesome-stars-rating'

import {
  Button,
  InputField,
  Label,
  SelectField,
  ActivityIndicator
} from 'src/app/common'
import {CarouselSlider, ProductSlider, ZoomSlider} from 'src/app/components'
import CustomVideoPlayer from 'src/app/common/customVideoPlayer/customVideoPlayer.component'

export const ProductWebDetail = () => {
  const [position, setPosition] = useState({x: 1175, y: 450})
  const [offset, setOffset] = useState({x: 0, y: 0})

  const handleMouseDown = (e) => {
    setOffset({
      x: e.clientX - position.x - 30,
      y: e.clientY - position.y - 40
    })

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    })
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  const dispatch = useDispatch()

  let {productId} = useParams()

  // console.log(productId, 'productId')
  useEffect(() => {
    dispatch(getProductDetailByIdAction({productId: productId as string}))
  }, [])

  const {productDetailData, productDetailLoading}: any = useSelector(
    (state: any) => state.product
  )
  useEffect(() => {
    console.log(productDetailData, productDetailLoading, 'productDetail data')
  }, [productDetailData])

  const products = productDetailData?.image
  const ratingChange = (value: number) => {
    console.log(value, 'rating value')
  }

  return (
    <ActivityIndicator animating={productDetailLoading}>
      <VStack className="productDetail-container">
        <VStack className="productDetail">
          <HStack style={{width: '100%'}} gap="$3">
            <div style={{width: '50%'}}>
              {/* <CarouselSlider>
                {products?.map((data: any, index: any) => (
                  <img
                    src={data.url}
                    alt="image"
                    className="image"
                    key={index}
                  />
                ))}
              </CarouselSlider> */}

              <ZoomSlider></ZoomSlider>
            </div>

            <VStack className="productDetail-detailTop" gap="$4">
              <ReactStarsRating size={15} onChange={ratingChange} value={3} />
              <Title heading className="productDetail-detailTop-name">
                {productDetailData?.name}
              </Title>

              <HStack>
                <div className="productDetail-detailBottom-description-content">
                  {productDetailData?.details}
                </div>
              </HStack>
              <HStack justify="flex-start" gap="$5">
                <p
                  // subheading
                  style={{color: '#FB2E86'}}
                  className="originalPrice"
                >
                  NPR.{productDetailData?.discountedPrice}
                </p>
                <p className="discountedPrice">
                  NPR.{productDetailData?.originalPrice}
                </p>
              </HStack>

              <div className="productDetail-detailTop-addToCart">
                <p>ADD TO CART</p>
              </div>
              <VStack className="productDetail-detailBottom" gap="$8">
                <VStack
                  className="productDetail-detailBottom-description"
                  gap="$4"
                >
                  {/* <Chip color="success"></Chip> */}

                  <Chip
                    title={productDetailData?.category.name}
                    // color="rgb(241 233 214)"
                    color="rgb(219 247 241)"
                    // style={{width: 'max-content'}}

                    // icon={<FaCartArrowDown size={12} fill="black" />}

                    // style={{color: 'black'}}
                  ></Chip>
                  <HStack
                    style={{
                      width: '70%'
                    }}
                  >
                    {/* <ProductSlider backgroundImage={products} /> */}
                  </HStack>

                  <HStack
                    style={{
                      width: '40%'
                    }}
                  >
                    {/* <Title heading>Video</Title> */}
                    {/* <video controls width="640" height="360">
                      <source src={productDetailData?.video} type="video/mp4" />
                    </video> */}
                    <div
                      style={{
                        position: 'absolute',
                        left: position.x,
                        top: position.y
                        // cursor: 'grab'
                      }}
                      onMouseDown={handleMouseDown}
                    >
                      <CustomVideoPlayer
                        videoUrl={productDetailData?.video}
                        thumbnailUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfcz8nhghqfpLH6iYrPyz6_U9fqSdujGVmrezxtryOpI0cxnLFzwSHklg5csZgs8K1QMU&usqp=CAU"
                      ></CustomVideoPlayer>
                    </div>
                  </HStack>
                </VStack>
              </VStack>
            </VStack>
          </HStack>
        </VStack>
      </VStack>

      {/* <ZoomSlider></ZoomSlider> */}
    </ActivityIndicator>
  )
}

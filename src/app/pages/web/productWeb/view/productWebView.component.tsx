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
import {
  CarouselSlider,
  ProductSection,
  ProductSlider,
  ZoomSlider
} from 'src/app/components'
import CustomVideoPlayer from 'src/app/common/customVideoPlayer/customVideoPlayer.component'
import html2canvas from 'html2canvas'
import {
  createCartByUserIdAction,
  getCartlistAction
} from '../../cart/cart.slice'
import toast from 'react-hot-toast'
import {getCookie} from 'src/helpers'
import {useMedia} from 'src/hooks'
import {useAuth} from 'src/app/routing'

export const ProductWebDetail = () => {
  const media = useMedia()
  const [position, setPosition] = useState({x: media.md ? 1175 : '0', y: 450})
  const [offset, setOffset] = useState({x: 0, y: 0})

  const {auth} = useAuth()

  const handleMouseDown = (e) => {
    setOffset({
      //@ts-ignore
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
  }, [productId])

  const {productDetailData, productDetailLoading}: any = useSelector(
    (state: any) => state.product
  )

  const [productImageList, setProductImageList] = useState(
    productDetailData?.images[0]?.coloredImage
  )
  useEffect(() => {
    console.log(productDetailData, productDetailLoading, 'hiii')

    setProductImageList(productDetailData?.images[0]?.coloredImage)
  }, [productDetailData])

  const products = productDetailData?.image
  const ratingChange = (value: number) => {
    console.log(value, 'rating value')
  }

  const handleColorClicked = (id: string) => {
    const requiredImageList = productDetailData?.images?.find(
      (item: any, index: number) => {
        return item._id === id
      }
    )

    console.log(requiredImageList, 'heee')
    console.log(productDetailData.video, 'heee')

    setProductImageList(requiredImageList?.coloredImage)
  }

  const handleAddToCart = (data: any) => {
    const userId = getCookie('userId')

    const cartData = {
      userId,
      products: [
        {
          productId: data?.id,
          quantity: 1,
          price: data?.discountedPrice
        }
      ]
    }

    dispatch(
      createCartByUserIdAction({
        userId: userId,
        data: cartData,
        onSuccess: () => {
          toast.success('Product added to cart Successfully!')
          const userId = getCookie('userId')
          userId && dispatch(getCartlistAction({userId: userId}))
        }
      })
    )
  }

  console.log('auth.isLoggedin', auth.isLoggedin)

  return (
    <ActivityIndicator animating={productDetailLoading}>
      <div className="productDetail-container">
        <VStack className="productDetail">
          <div
            style={{width: '100%', display: 'flex'}}
            className="productsWrapper"
          >
            <div style={{width: '60%'}} className="productDetail-left">
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

              <ZoomSlider data={productImageList}></ZoomSlider>
            </div>

            <VStack
              className="productDetail-detailTop"
              gap="$4"
              id="productContainer"
            >
              {/* <ReactStarsRating size={15} onChange={ratingChange} value={3} /> */}
              <Title heading className="productDetail-detailTop-name">
                {productDetailData?.name}
              </Title>

              <div
                className="productDetail-detailTop-description"
                dangerouslySetInnerHTML={{
                  __html: productDetailData?.description
                }}
              ></div>

              {/* <HStack>
                <div className="productDetail-detailBottom-description-content">
                  {productDetailData?.details}
                </div>
              </HStack> */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: '20px'
                }}
                className="priceContainer"
              >
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
              </div>

              <VStack className="productDetail-detailTop-color">
                <p>Color</p>
                <HStack gap="$3">
                  {productDetailData?.images?.map(
                    (item: any, index: number) => {
                      return (
                        <div
                          style={{background: item.colorName}}
                          className="productDetail-detailTop-color-item"
                          onClick={() => handleColorClicked(item._id)}
                        ></div>
                      )
                    }
                  )}
                </HStack>
              </VStack>

              <div
                className="productDetail-detailTop-addToCart"
                onClick={() => {
                  !!auth.isLoggedin
                    ? handleAddToCart(productDetailData)
                    : toast.success('Product Updated SuccessFully')
                }}
              >
                <p>ADD TO CART</p>
              </div>

              <HStack
                className="productDetail-inStock"
                justify="flex-start"
                align="center"
                gap="$4"
              >
                <Title subheading> In Stock:</Title>
                <Chip
                  title={`${productDetailData?.stockQuantity ?? 0} pics`}
                  // color="rgb(241 233 214)"
                  color="rgb(219 247 241)"
                  // style={{width: 'max-content'}}

                  // icon={<FaCartArrowDown size={12} fill="black" />}

                  // style={{color: 'black'}}
                ></Chip>
              </HStack>
              <VStack className="productDetail-detailBottom" gap="$8">
                <VStack
                  className="productDetail-detailBottom-description"
                  gap="$4"
                >
                  {/* <Chip color="success"></Chip> */}

                  <Chip
                    title={productDetailData?.category?.name}
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
                        videoUrl={`${
                          import.meta.env.REACT_APP_DEV_ASSET_URL
                        }/video/${productDetailData?.video}`}
                        thumbnailUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfcz8nhghqfpLH6iYrPyz6_U9fqSdujGVmrezxtryOpI0cxnLFzwSHklg5csZgs8K1QMU&usqp=CAU"
                      ></CustomVideoPlayer>
                    </div>
                  </HStack>
                </VStack>
              </VStack>
            </VStack>
          </div>
        </VStack>
      </div>
      <div style={{marginBottom: '20px', padding: '2vw'}}>
        <ProductSection
          header="Similar Products"
          isProfilePage={true}
        ></ProductSection>
      </div>

      {/* <ZoomSlider></ZoomSlider> */}
    </ActivityIndicator>
  )
}

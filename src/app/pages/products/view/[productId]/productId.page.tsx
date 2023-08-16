import {BiTimeFive} from 'react-icons/bi'
import {Chip, HStack, StatInfo, Title, VStack} from 'src/app/common'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'src/store'
import {getProductDetailByIdAction} from '../../product.slice'
import {useParams} from 'src/hooks'
import {
  Button,
  InputField,
  Label,
  SelectField,
  ActivityIndicator
} from 'src/app/common'
import {ProductSlider} from 'src/app/components'

const ProductDetailsPage = () => {
  const dispatch = useDispatch()
  const productId = useParams('productId')
  console.log(productId)
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

  return (
    <ActivityIndicator animating={productDetailLoading}>
      <VStack className="productDetail-container">
        <VStack className="productDetail">
          <VStack className="productDetail-detailTop" gap="$4">
            <HStack
              className="productDetail-detailTop-topMost"
              justify="space-between"
            >
              <Title extrasmallheading>Name:{productDetailData?.name}</Title>
              <HStack gap="$4">
                {/* <StatInfo icon={<AiOutlineEye />} value={`${1234} views`} /> */}

                {/* <StatInfo
                  icon={<BiTimeFive />}
                  value={productDetails.time ?? ''}
                /> */}
              </HStack>
            </HStack>

            <VStack className="productDetail-detailTop-electronics" gap="$0_5">
              <HStack>
                <Title heading>Category</Title>
                <Title smallheading>{productDetailData?.category.name}</Title>
              </HStack>

              <HStack>
                <Title heading>Name</Title>
                <Title heading>{productDetailData?.name}</Title>
              </HStack>
            </VStack>

            <Title primaryHeading>Rs.{productDetailData?.price}</Title>
          </VStack>

          <VStack className="productDetail-detailBottom" gap="$8">
            <VStack className="productDetail-detailBottom-description" gap="$4">
              <HStack>
                <Title heading>Description</Title>

                <div
                  className="productDetail-detailBottom-description-content"
                  dangerouslySetInnerHTML={{
                    __html: productDetailData?.description
                  }}
                />
              </HStack>
              <HStack
                style={{
                  width: '40%'
                }}
              >
                <Title heading>Images</Title>
                <ProductSlider backgroundImage={products} />
              </HStack>

              <HStack
                style={{
                  width: '40%'
                }}
              >
                <Title heading>Video</Title>
                <video controls width="640" height="360">
                  <source src={productDetailData?.video} type="video/mp4" />
                </video>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </ActivityIndicator>
  )
}

export default ProductDetailsPage
